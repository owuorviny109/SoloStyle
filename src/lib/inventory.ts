import { prisma } from './prisma'
import { ReservationStatus } from '@prisma/client'

export interface InventoryService {
  checkAvailability(variantId: string): Promise<number>
  reserveStock(variantId: string, quantity: number, sessionId: string): Promise<boolean>
  releaseReservation(variantId: string, sessionId: string): Promise<void>
  confirmSale(variantId: string, quantity: number): Promise<void>
  cleanupExpiredReservations(): Promise<void>
}

export const inventoryService: InventoryService = {
  async checkAvailability(variantId: string): Promise<number> {
    const variant = await prisma.productVariant.findUnique({
      where: { id: variantId }
    })
    
    if (!variant) return 0
    
    // Calculate available stock: total - reserved - sold
    return Math.max(0, variant.totalStock - variant.reservedStock - variant.soldStock)
  },

  async reserveStock(variantId: string, quantity: number, sessionId: string): Promise<boolean> {
    try {
      return await prisma.$transaction(async (tx) => {
        // Check current availability
        const variant = await tx.productVariant.findUnique({
          where: { id: variantId }
        })
        
        if (!variant) return false
        
        const available = variant.totalStock - variant.reservedStock - variant.soldStock
        if (available < quantity) return false
        
        // Check if there's already a reservation for this session
        const existingReservation = await tx.stockReservation.findFirst({
          where: {
            variantId,
            sessionId,
            status: ReservationStatus.ACTIVE
          }
        })
        
        if (existingReservation) {
          // Update existing reservation
          await tx.stockReservation.update({
            where: { id: existingReservation.id },
            data: {
              quantity,
              expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
            }
          })
        } else {
          // Create new reservation
          await tx.stockReservation.create({
            data: {
              variantId,
              sessionId,
              quantity,
              status: ReservationStatus.ACTIVE,
              expiresAt: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
            }
          })
        }
        
        // Update reserved stock
        await tx.productVariant.update({
          where: { id: variantId },
          data: {
            reservedStock: {
              increment: quantity - (existingReservation?.quantity || 0)
            }
          }
        })
        
        return true
      })
    } catch (error) {
      console.error('Error reserving stock:', error)
      return false
    }
  },

  async releaseReservation(variantId: string, sessionId: string): Promise<void> {
    try {
      await prisma.$transaction(async (tx) => {
        const reservation = await tx.stockReservation.findFirst({
          where: {
            variantId,
            sessionId,
            status: ReservationStatus.ACTIVE
          }
        })
        
        if (!reservation) return
        
        // Update reservation status
        await tx.stockReservation.update({
          where: { id: reservation.id },
          data: { status: ReservationStatus.RELEASED }
        })
        
        // Decrease reserved stock
        await tx.productVariant.update({
          where: { id: variantId },
          data: {
            reservedStock: {
              decrement: reservation.quantity
            }
          }
        })
      })
    } catch (error) {
      console.error('Error releasing reservation:', error)
    }
  },

  async confirmSale(variantId: string, quantity: number): Promise<void> {
    try {
      await prisma.productVariant.update({
        where: { id: variantId },
        data: {
          reservedStock: { decrement: quantity },
          soldStock: { increment: quantity }
        }
      })
    } catch (error) {
      console.error('Error confirming sale:', error)
    }
  },

  async cleanupExpiredReservations(): Promise<void> {
    try {
      const expiredReservations = await prisma.stockReservation.findMany({
        where: {
          status: ReservationStatus.ACTIVE,
          expiresAt: { lt: new Date() }
        }
      })
      
      for (const reservation of expiredReservations) {
        await prisma.$transaction(async (tx) => {
          // Update reservation status
          await tx.stockReservation.update({
            where: { id: reservation.id },
            data: { status: ReservationStatus.EXPIRED }
          })
          
          // Release reserved stock
          await tx.productVariant.update({
            where: { id: reservation.variantId },
            data: {
              reservedStock: { decrement: reservation.quantity }
            }
          })
        })
      }
      
      console.log(`🧹 Cleaned up ${expiredReservations.length} expired reservations`)
    } catch (error) {
      console.error('Error cleaning up expired reservations:', error)
    }
  }
}

// Helper function to get product with availability
export async function getProductWithAvailability(productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: {
      variants: true
    }
  })
  
  if (!product) return null
  
  // Calculate availability for each variant
  const variantsWithAvailability = product.variants.map(variant => ({
    ...variant,
    availableStock: Math.max(0, variant.totalStock - variant.reservedStock - variant.soldStock)
  }))
  
  return {
    ...product,
    variants: variantsWithAvailability
  }
}

// Helper function to get all products with availability
export async function getProductsWithAvailability(filters?: {
  category?: string
  featured?: boolean
  search?: string
}) {
  const where: any = { active: true }
  
  if (filters?.category) {
    where.category = filters.category
  }
  
  if (filters?.featured !== undefined) {
    where.featured = filters.featured
  }
  
  if (filters?.search) {
    where.OR = [
      { name: { contains: filters.search, mode: 'insensitive' } },
      { brand: { contains: filters.search, mode: 'insensitive' } },
      { description: { contains: filters.search, mode: 'insensitive' } }
    ]
  }
  
  const products = await prisma.product.findMany({
    where,
    include: {
      variants: true
    },
    orderBy: [
      { featured: 'desc' },
      { createdAt: 'desc' }
    ]
  })
  
  // Calculate availability for each variant
  return products.map(product => ({
    ...product,
    variants: product.variants.map(variant => ({
      ...variant,
      availableStock: Math.max(0, variant.totalStock - variant.reservedStock - variant.soldStock)
    }))
  }))
}