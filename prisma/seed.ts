import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data
  await prisma.paymentEvent.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.stockReservation.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()

  console.log('🧹 Cleared existing data')

  // Sample shoe products
  const products = [
    {
      name: 'Air Max 270',
      brand: 'Nike',
      description: 'The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike\'s greatest innovation with its largest heel Air unit yet.',
      basePrice: 12000 * 100, // KES 12,000 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'
      ],
      category: 'sneakers',
      featured: true,
      variants: [
        { size: '40', color: 'Black', sku: 'NIKE-AM270-BLK-40', totalStock: 15 },
        { size: '41', color: 'Black', sku: 'NIKE-AM270-BLK-41', totalStock: 20 },
        { size: '42', color: 'Black', sku: 'NIKE-AM270-BLK-42', totalStock: 18 },
        { size: '43', color: 'Black', sku: 'NIKE-AM270-BLK-43', totalStock: 12 },
        { size: '40', color: 'White', sku: 'NIKE-AM270-WHT-40', totalStock: 10, priceAdjustment: 500 * 100 },
        { size: '41', color: 'White', sku: 'NIKE-AM270-WHT-41', totalStock: 14, priceAdjustment: 500 * 100 },
        { size: '42', color: 'White', sku: 'NIKE-AM270-WHT-42', totalStock: 16, priceAdjustment: 500 * 100 },
      ]
    },
    {
      name: 'Ultraboost 22',
      brand: 'Adidas',
      description: 'Experience incredible energy return with every step. The adidas Ultraboost 22 features responsive BOOST midsole cushioning and a flexible Primeknit upper.',
      basePrice: 15000 * 100, // KES 15,000 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
        'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500'
      ],
      category: 'sneakers',
      featured: true,
      variants: [
        { size: '40', color: 'Core Black', sku: 'ADIDAS-UB22-BLK-40', totalStock: 12 },
        { size: '41', color: 'Core Black', sku: 'ADIDAS-UB22-BLK-41', totalStock: 18 },
        { size: '42', color: 'Core Black', sku: 'ADIDAS-UB22-BLK-42', totalStock: 15 },
        { size: '43', color: 'Core Black', sku: 'ADIDAS-UB22-BLK-43', totalStock: 10 },
        { size: '41', color: 'Cloud White', sku: 'ADIDAS-UB22-WHT-41', totalStock: 8, priceAdjustment: 1000 * 100 },
        { size: '42', color: 'Cloud White', sku: 'ADIDAS-UB22-WHT-42', totalStock: 12, priceAdjustment: 1000 * 100 },
      ]
    },
    {
      name: 'RS-X Reinvention',
      brand: 'Puma',
      description: 'Bold and futuristic, the PUMA RS-X Reinvention brings maximum comfort with its thick midsole and eye-catching design elements.',
      basePrice: 9500 * 100, // KES 9,500 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
        'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500'
      ],
      category: 'sneakers',
      featured: false,
      variants: [
        { size: '40', color: 'Puma White', sku: 'PUMA-RSX-WHT-40', totalStock: 20 },
        { size: '41', color: 'Puma White', sku: 'PUMA-RSX-WHT-41', totalStock: 25 },
        { size: '42', color: 'Puma White', sku: 'PUMA-RSX-WHT-42', totalStock: 22 },
        { size: '43', color: 'Puma White', sku: 'PUMA-RSX-WHT-43', totalStock: 15 },
        { size: '41', color: 'Puma Black', sku: 'PUMA-RSX-BLK-41', totalStock: 18 },
        { size: '42', color: 'Puma Black', sku: 'PUMA-RSX-BLK-42', totalStock: 20 },
      ]
    },
    {
      name: 'Classic Leather Oxford',
      brand: 'Clarks',
      description: 'Timeless elegance meets modern comfort. These premium leather Oxford shoes are perfect for formal occasions and business meetings.',
      basePrice: 18000 * 100, // KES 18,000 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500',
        'https://images.unsplash.com/photo-1582897085656-c636d006a246?w=500'
      ],
      category: 'formal',
      featured: false,
      variants: [
        { size: '40', color: 'Black', sku: 'CLARKS-OXF-BLK-40', totalStock: 8 },
        { size: '41', color: 'Black', sku: 'CLARKS-OXF-BLK-41', totalStock: 12 },
        { size: '42', color: 'Black', sku: 'CLARKS-OXF-BLK-42', totalStock: 10 },
        { size: '43', color: 'Black', sku: 'CLARKS-OXF-BLK-43', totalStock: 6 },
        { size: '41', color: 'Brown', sku: 'CLARKS-OXF-BRN-41', totalStock: 9, priceAdjustment: 2000 * 100 },
        { size: '42', color: 'Brown', sku: 'CLARKS-OXF-BRN-42', totalStock: 11, priceAdjustment: 2000 * 100 },
      ]
    },
    {
      name: 'Timberland 6-Inch Premium',
      brand: 'Timberland',
      description: 'The original yellow boot that started it all. Waterproof, durable, and comfortable with premium nubuck leather construction.',
      basePrice: 22000 * 100, // KES 22,000 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500',
        'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=500'
      ],
      category: 'boots',
      featured: true,
      variants: [
        { size: '40', color: 'Wheat', sku: 'TIMB-6IN-WHT-40', totalStock: 5 },
        { size: '41', color: 'Wheat', sku: 'TIMB-6IN-WHT-41', totalStock: 8 },
        { size: '42', color: 'Wheat', sku: 'TIMB-6IN-WHT-42', totalStock: 7 },
        { size: '43', color: 'Wheat', sku: 'TIMB-6IN-WHT-43', totalStock: 4 },
        { size: '41', color: 'Black', sku: 'TIMB-6IN-BLK-41', totalStock: 6, priceAdjustment: 1500 * 100 },
        { size: '42', color: 'Black', sku: 'TIMB-6IN-BLK-42', totalStock: 5, priceAdjustment: 1500 * 100 },
      ]
    },
    {
      name: 'Chuck Taylor All Star',
      brand: 'Converse',
      description: 'The iconic canvas sneaker that has been a symbol of self-expression for decades. Classic design with modern comfort.',
      basePrice: 7500 * 100, // KES 7,500 in cents
      imageUrls: [
        'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500',
        'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500'
      ],
      category: 'sneakers',
      featured: false,
      variants: [
        { size: '39', color: 'Black', sku: 'CONV-CT-BLK-39', totalStock: 30 },
        { size: '40', color: 'Black', sku: 'CONV-CT-BLK-40', totalStock: 35 },
        { size: '41', color: 'Black', sku: 'CONV-CT-BLK-41', totalStock: 40 },
        { size: '42', color: 'Black', sku: 'CONV-CT-BLK-42', totalStock: 38 },
        { size: '43', color: 'Black', sku: 'CONV-CT-BLK-43', totalStock: 25 },
        { size: '40', color: 'White', sku: 'CONV-CT-WHT-40', totalStock: 28 },
        { size: '41', color: 'White', sku: 'CONV-CT-WHT-41', totalStock: 32 },
        { size: '42', color: 'White', sku: 'CONV-CT-WHT-42', totalStock: 30 },
        { size: '41', color: 'Red', sku: 'CONV-CT-RED-41', totalStock: 15, priceAdjustment: 500 * 100 },
        { size: '42', color: 'Red', sku: 'CONV-CT-RED-42', totalStock: 18, priceAdjustment: 500 * 100 },
      ]
    }
  ]

  // Create products with variants
  for (const productData of products) {
    const { variants, ...product } = productData
    
    console.log(`📦 Creating product: ${product.name}`)
    
    const createdProduct = await prisma.product.create({
      data: product
    })

    // Create variants for this product
    for (const variant of variants) {
      await prisma.productVariant.create({
        data: {
          ...variant,
          productId: createdProduct.id
        }
      })
    }
  }

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created ${products.length} products with multiple variants`)
  
  // Print summary
  const totalProducts = await prisma.product.count()
  const totalVariants = await prisma.productVariant.count()
  const totalStock = await prisma.productVariant.aggregate({
    _sum: { totalStock: true }
  })
  
  console.log(`📈 Summary:`)
  console.log(`   - Products: ${totalProducts}`)
  console.log(`   - Variants: ${totalVariants}`)
  console.log(`   - Total Stock: ${totalStock._sum.totalStock} pairs`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })