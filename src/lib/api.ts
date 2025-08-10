import { Product } from '@/types'

// Mock API service - In a real app, this would call your backend API
export class ApiService {

  static async getProducts(filters?: {
    category?: string
    featured?: boolean
    search?: string
  }): Promise<Product[]> {
    // For now, return mock data
    // In the next task, we'll connect this to real API endpoints
    return this.getMockProducts(filters)
  }

  static async getProduct(id: string): Promise<Product | null> {
    const products = await this.getProducts()
    return products.find(p => p.id === id) || null
  }

  static async getFeaturedProducts(): Promise<Product[]> {
    return this.getProducts({ featured: true })
  }

  // Mock data for development
  private static getMockProducts(filters?: {
    category?: string
    featured?: boolean
    search?: string
  }): Product[] {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: 'Air Max 270',
        brand: 'Nike',
        description: 'The Nike Air Max 270 delivers visible cushioning under every step.',
        basePrice: 1200000, // KES 12,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '1-1',
            productId: '1',
            size: '40',
            color: 'Black',
            sku: 'NIKE-AM270-BLK-40',
            priceAdjustment: 0,
            totalStock: 15,
            reservedStock: 2,
            soldStock: 3,
            availableStock: 10
          },
          {
            id: '1-2',
            productId: '1',
            size: '41',
            color: 'Black',
            sku: 'NIKE-AM270-BLK-41',
            priceAdjustment: 0,
            totalStock: 20,
            reservedStock: 1,
            soldStock: 4,
            availableStock: 15
          },
          {
            id: '1-3',
            productId: '1',
            size: '42',
            color: 'Black',
            sku: 'NIKE-AM270-BLK-42',
            priceAdjustment: 0,
            totalStock: 18,
            reservedStock: 0,
            soldStock: 2,
            availableStock: 16
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Ultraboost 22',
        brand: 'Adidas',
        description: 'Experience incredible energy return with every step.',
        basePrice: 1500000, // KES 15,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '2-1',
            productId: '2',
            size: '40',
            color: 'Core Black',
            sku: 'ADIDAS-UB22-BLK-40',
            priceAdjustment: 0,
            totalStock: 12,
            reservedStock: 1,
            soldStock: 2,
            availableStock: 9
          },
          {
            id: '2-2',
            productId: '2',
            size: '41',
            color: 'Core Black',
            sku: 'ADIDAS-UB22-BLK-41',
            priceAdjustment: 0,
            totalStock: 18,
            reservedStock: 0,
            soldStock: 3,
            availableStock: 15
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Chuck Taylor All Star',
        brand: 'Converse',
        description: 'The iconic canvas sneaker that has been a symbol of self-expression.',
        basePrice: 750000, // KES 7,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500',
          'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '3-1',
            productId: '3',
            size: '40',
            color: 'Black',
            sku: 'CONV-CT-BLK-40',
            priceAdjustment: 0,
            totalStock: 35,
            reservedStock: 2,
            soldStock: 5,
            availableStock: 28
          },
          {
            id: '3-2',
            productId: '3',
            size: '41',
            color: 'Black',
            sku: 'CONV-CT-BLK-41',
            priceAdjustment: 0,
            totalStock: 40,
            reservedStock: 3,
            soldStock: 7,
            availableStock: 30
          },
          {
            id: '3-3',
            productId: '3',
            size: '40',
            color: 'White',
            sku: 'CONV-CT-WHT-40',
            priceAdjustment: 0,
            totalStock: 28,
            reservedStock: 1,
            soldStock: 4,
            availableStock: 23
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Air Force 1 Low',
        brand: 'Nike',
        description: 'The classic basketball shoe that never goes out of style.',
        basePrice: 1100000, // KES 11,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '4-1',
            productId: '4',
            size: '40',
            color: 'White',
            sku: 'NIKE-AF1-WHT-40',
            priceAdjustment: 0,
            totalStock: 25,
            reservedStock: 1,
            soldStock: 4,
            availableStock: 20
          },
          {
            id: '4-2',
            productId: '4',
            size: '41',
            color: 'White',
            sku: 'NIKE-AF1-WHT-41',
            priceAdjustment: 0,
            totalStock: 30,
            reservedStock: 2,
            soldStock: 3,
            availableStock: 25
          },
          {
            id: '4-3',
            productId: '4',
            size: '42',
            color: 'Black',
            sku: 'NIKE-AF1-BLK-42',
            priceAdjustment: 0,
            totalStock: 22,
            reservedStock: 0,
            soldStock: 2,
            availableStock: 20
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Stan Smith',
        brand: 'Adidas',
        description: 'The world\'s most popular tennis shoe with minimalist design.',
        basePrice: 950000, // KES 9,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500',
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '5-1',
            productId: '5',
            size: '40',
            color: 'White/Green',
            sku: 'ADIDAS-SS-WHTGRN-40',
            priceAdjustment: 0,
            totalStock: 40,
            reservedStock: 3,
            soldStock: 7,
            availableStock: 30
          },
          {
            id: '5-2',
            productId: '5',
            size: '41',
            color: 'White/Green',
            sku: 'ADIDAS-SS-WHTGRN-41',
            priceAdjustment: 0,
            totalStock: 35,
            reservedStock: 2,
            soldStock: 5,
            availableStock: 28
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Old Skool',
        brand: 'Vans',
        description: 'The classic skate shoe with the iconic side stripe.',
        basePrice: 850000, // KES 8,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500',
          'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '6-1',
            productId: '6',
            size: '40',
            color: 'Black/White',
            sku: 'VANS-OS-BLKWHT-40',
            priceAdjustment: 0,
            totalStock: 30,
            reservedStock: 2,
            soldStock: 8,
            availableStock: 20
          },
          {
            id: '6-2',
            productId: '6',
            size: '41',
            color: 'Black/White',
            sku: 'VANS-OS-BLKWHT-41',
            priceAdjustment: 0,
            totalStock: 25,
            reservedStock: 1,
            soldStock: 4,
            availableStock: 20
          },
          {
            id: '6-3',
            productId: '6',
            size: '42',
            color: 'Navy/White',
            sku: 'VANS-OS-NVYWHT-42',
            priceAdjustment: 0,
            totalStock: 20,
            reservedStock: 0,
            soldStock: 3,
            availableStock: 17
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Suede Classic',
        brand: 'Puma',
        description: 'The legendary suede sneaker that started the streetwear revolution.',
        basePrice: 800000, // KES 8,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '7-1',
            productId: '7',
            size: '40',
            color: 'Red',
            sku: 'PUMA-SC-RED-40',
            priceAdjustment: 0,
            totalStock: 18,
            reservedStock: 1,
            soldStock: 2,
            availableStock: 15
          },
          {
            id: '7-2',
            productId: '7',
            size: '41',
            color: 'Blue',
            sku: 'PUMA-SC-BLU-41',
            priceAdjustment: 0,
            totalStock: 22,
            reservedStock: 0,
            soldStock: 3,
            availableStock: 19
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Jordan 1 Low',
        brand: 'Nike',
        description: 'Inspired by the original AJ1, offering classic style in a low-top silhouette.',
        basePrice: 1350000, // KES 13,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500',
          'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '8-1',
            productId: '8',
            size: '40',
            color: 'Bred',
            sku: 'NIKE-J1L-BRED-40',
            priceAdjustment: 0,
            totalStock: 15,
            reservedStock: 3,
            soldStock: 2,
            availableStock: 10
          },
          {
            id: '8-2',
            productId: '8',
            size: '41',
            color: 'White/Black',
            sku: 'NIKE-J1L-WHTBLK-41',
            priceAdjustment: 0,
            totalStock: 12,
            reservedStock: 1,
            soldStock: 1,
            availableStock: 10
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Gazelle',
        brand: 'Adidas',
        description: 'Retro-inspired sneaker with premium suede upper and classic 3-Stripes.',
        basePrice: 900000, // KES 9,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500',
          'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '9-1',
            productId: '9',
            size: '40',
            color: 'Navy',
            sku: 'ADIDAS-GAZ-NVY-40',
            priceAdjustment: 0,
            totalStock: 28,
            reservedStock: 2,
            soldStock: 6,
            availableStock: 20
          },
          {
            id: '9-2',
            productId: '9',
            size: '41',
            color: 'Grey',
            sku: 'ADIDAS-GAZ-GRY-41',
            priceAdjustment: 0,
            totalStock: 25,
            reservedStock: 1,
            soldStock: 4,
            availableStock: 20
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Authentic',
        brand: 'Vans',
        description: 'The original and now iconic Vans side stripe skate shoe.',
        basePrice: 700000, // KES 7,000 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=500',
          'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '10-1',
            productId: '10',
            size: '40',
            color: 'Black',
            sku: 'VANS-AUTH-BLK-40',
            priceAdjustment: 0,
            totalStock: 35,
            reservedStock: 2,
            soldStock: 8,
            availableStock: 25
          },
          {
            id: '10-2',
            productId: '10',
            size: '41',
            color: 'White',
            sku: 'VANS-AUTH-WHT-41',
            priceAdjustment: 0,
            totalStock: 30,
            reservedStock: 1,
            soldStock: 5,
            availableStock: 24
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '11',
        name: 'React Element 55',
        brand: 'Nike',
        description: 'Futuristic design meets comfortable React foam cushioning.',
        basePrice: 1250000, // KES 12,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
          'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '11-1',
            productId: '11',
            size: '40',
            color: 'Black/Volt',
            sku: 'NIKE-RE55-BLKVLT-40',
            priceAdjustment: 0,
            totalStock: 20,
            reservedStock: 1,
            soldStock: 3,
            availableStock: 16
          },
          {
            id: '11-2',
            productId: '11',
            size: '41',
            color: 'White/Blue',
            sku: 'NIKE-RE55-WHTBLU-41',
            priceAdjustment: 0,
            totalStock: 18,
            reservedStock: 2,
            soldStock: 2,
            availableStock: 14
          },
          {
            id: '11-3',
            productId: '11',
            size: '42',
            color: 'Grey/Orange',
            sku: 'NIKE-RE55-GRYORG-42',
            priceAdjustment: 0,
            totalStock: 15,
            reservedStock: 0,
            soldStock: 1,
            availableStock: 14
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: '12',
        name: 'RS-X Puma',
        brand: 'Puma',
        description: 'Bold chunky sneaker with retro-futuristic design and superior comfort.',
        basePrice: 1050000, // KES 10,500 in cents
        imageUrls: [
          'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500',
          'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
        ],
        category: 'sneakers',
        active: true,
        variants: [
          {
            id: '12-1',
            productId: '12',
            size: '40',
            color: 'White/Red',
            sku: 'PUMA-RSX-WHTRED-40',
            priceAdjustment: 0,
            totalStock: 24,
            reservedStock: 2,
            soldStock: 4,
            availableStock: 18
          },
          {
            id: '12-2',
            productId: '12',
            size: '41',
            color: 'Black/Yellow',
            sku: 'PUMA-RSX-BLKYEL-41',
            priceAdjustment: 0,
            totalStock: 20,
            reservedStock: 1,
            soldStock: 3,
            availableStock: 16
          },
          {
            id: '12-3',
            productId: '12',
            size: '42',
            color: 'Blue/White',
            sku: 'PUMA-RSX-BLUWHT-42',
            priceAdjustment: 0,
            totalStock: 16,
            reservedStock: 0,
            soldStock: 2,
            availableStock: 14
          }
        ],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ]

    let filteredProducts = mockProducts

    if (filters?.category) {
      filteredProducts = filteredProducts.filter(p => p.category === filters.category)
    }

    if (filters?.featured !== undefined) {
      // For mock data, consider first 2 products as featured
      filteredProducts = filters.featured 
        ? filteredProducts.slice(0, 2)
        : filteredProducts
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase()
      filteredProducts = filteredProducts.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.brand.toLowerCase().includes(searchTerm) ||
        p.description?.toLowerCase().includes(searchTerm)
      )
    }

    return filteredProducts
  }
}