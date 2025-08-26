import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { getPayload } from 'payload'
import configPromise from '../dev/payload.config.js'
import type { CollectionSlug } from 'payload'
import dotenv from 'dotenv'
import type { Product } from '../src/types.js'

dotenv.config()

describe('Products Plugin Fields E2E', () => {
  let localPayload: Awaited<ReturnType<typeof getPayload>>
  const createdProductIds: string[] = []
  const validProductData = {
    name: 'Test Product',
    description: 'This is a test product description',
    content: [
      {
        children: [
          {
            text: 'This is the main content of the product',
          },
        ],
      },
    ],
    tags: [
      {
        tag: 'test-tag',
      },
    ],
    seasonalExpiryDate: '2024-12-31',
    productGroup: 'Test Group',
    status: 'draft',
    mainImage: {
      image: null,
      alt: 'Test product image',
      caption: 'This is a test product image',
    },
    imagesGallery: [
      {
        image: null,
        alt: 'Gallery image 1',
        caption: 'First gallery image',
      },
    ],
    icons: [
      {
        image: null,
        name: 'test-icon',
        label: 'Test Icon',
      },
    ],
    files: [
      {
        file_type: 'text',
        url: 'https://example.com/test.pdf',
        upload: null,
        iframe: '<iframe src="https://example.com"></iframe>',
        alt: 'Test file',
        caption: 'This is a test file',
      },
    ],
    material: 'Test Material',
    dimensions: '10x20x30',
    weight: {
      unit: 'kg',
      value: 1.5,
    },
    productCode: 'TEST-001',
    modelNumber: 'MODEL-001',
    spec: [
      {
        group: 'General',
        values: [
          {
            name: 'Color',
            value: [
              {
                children: [
                  {
                    text: 'Red',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    seoTitle: 'Test Product SEO Title',
    seoDescription: 'This is a test product SEO description',
    keywords: 'test, product, example',
    Features: [
      {
        name: 'Feature 1',
        value: [
          {
            children: [
              {
                text: 'This is feature 1 description',
              },
            ],
          },
        ],
      },
    ],
    terms: [
      {
        term: [
          {
            children: [
              {
                text: 'Test terms and conditions',
              },
            ],
          },
        ],
      },
    ],
    reviews: [
      {
        customer: 'Test Customer',
        date: '2024-03-20',
        rating: '5',
        review: [
          {
            children: [
              {
                text: 'This is a great product!',
              },
            ],
          },
        ],
        image: null,
      },
    ],
  }

  beforeAll(async () => {
    process.env.PAYLOAD_CONFIG_PATH = new URL('../dev/payload.config.ts', import.meta.url).pathname
    const config = await configPromise

    localPayload = await getPayload({ config })
  })

  it('should successfully create a product with all valid fields', async () => {
    const validProduct = (await localPayload.create({
      collection: 'products' as CollectionSlug,
      data: validProductData,
    })) as Product

    createdProductIds.push(validProduct.id)

    // Verify that all fields were created correctly
    expect(validProduct).toBeDefined()
    expect(validProduct.id).toBeDefined()
    expect(validProduct.name).toBe('Test Product')
    expect(validProduct.description).toBe('This is a test product description')
    expect(validProduct.content).toBeDefined()
    expect(validProduct.tags).toHaveLength(1)
    expect(validProduct.seasonalExpiryDate).toBe('2024-12-30T22:00:00.000Z')
    expect(validProduct.productGroup).toBe('Test Group')
    expect(validProduct.status).toBe('draft')
    expect(validProduct.mainImage).toBeDefined()
    expect(validProduct.imagesGallery).toHaveLength(1)
    expect(validProduct.icons).toHaveLength(1)
    expect(validProduct.files).toHaveLength(1)
    expect(validProduct.material).toBe('Test Material')
    expect(validProduct.dimensions).toBe('10x20x30')
    expect(validProduct.weight).toBeDefined()
    expect(validProduct.productCode).toBe('TEST-001')
    expect(validProduct.modelNumber).toBe('MODEL-001')
    expect(validProduct.spec).toHaveLength(1)
    expect(validProduct.seoTitle).toBe('Test Product SEO Title')
    expect(validProduct.seoDescription).toBe('This is a test product SEO description')
    expect(validProduct.keywords).toBe('test, product, example')
    expect(validProduct.Features).toHaveLength(1)
    expect(validProduct.terms).toHaveLength(1)
    expect(validProduct.reviews).toHaveLength(1)
  })

  it('should fail to create a product without required field', async () => {
    await expect(
      localPayload.create({
        collection: 'products' as CollectionSlug,
        data: {
          ...validProductData,
          name: null,
        } as unknown as Product,
      }),
    ).rejects.toThrow()
  })

  it('should fail to create a product with non-number value in weight.value field', async () => {
    // Test weight.value
    await expect(
      localPayload.create({
        collection: 'products' as CollectionSlug,
        data: {
          ...validProductData,
          weight: {
            ...validProductData.weight,
            value: 'not a number',
          },
        } as unknown as Product,
      }),
    ).rejects.toThrow()
  })

  it('should fail to create a product with non-number value in review.rating field', async () => {
    // Test review.rating
    await expect(
      localPayload.create({
        collection: 'products' as CollectionSlug,
        data: {
          ...validProductData,
          reviews: [
            {
              ...validProductData.reviews,
              rating: 'not a number',
            },
          ],
        } as unknown as Product,
      }),
    ).rejects.toThrow()
  })

  it('should fail to create a product with non-date values in seasonalExpiryDate field', async () => {
    // Test seasonalExpiryDate
    await expect(
      localPayload.create({
        collection: 'products' as CollectionSlug,
        data: {
          ...validProductData,
          seasonalExpiryDate: 'not a date', // Invalid: should be a date
        } as unknown as Product,
      }),
    ).rejects.toThrow()
  })

  it('should fail to create a product with non-date values in review.date field', async () => {
    // Test review date
    await expect(
      localPayload.create({
        collection: 'products' as CollectionSlug,
        data: {
          ...validProductData,
          reviews: [
            {
              date: 'not a date',
              rating: '5',
              review: [
                {
                  children: [
                    {
                      text: 'This is a great product!',
                    },
                  ],
                },
              ],
              image: null,
            },
          ],
        } as unknown as Product,
      }),
    ).rejects.toThrow()
  })

  afterAll(async () => {
    await Promise.all(
      createdProductIds.map(async (id) => {
        try {
          await localPayload.delete({
            collection: 'products' as CollectionSlug,
            id,
          })
        } catch (err: any) {
          if (err.message?.includes('Not Found'))
            console.warn(`Product with id ${id} already deleted.`) // not a real error
          else throw err // a true error - stop the test
        }
      }),
    )
  })
})
