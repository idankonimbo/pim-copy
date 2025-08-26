import type { Config } from 'payload'
import { createProductsCollection } from './collections/Products/index.js'
import { ProductsCollectionConfig } from './types.js'

export const productsCollection =
  (pluginOptions?: ProductsCollectionConfig) =>
  (config: Config): Config => {
    const collections = config.collections || []

    const productCollection = createProductsCollection(pluginOptions)

    const pluginCollection = pluginOptions?.disabled
      ? {
          ...productCollection,
          admin: {
            ...productCollection.admin,
            hidden: true,
          },
          access: {
            create: () => false,
            update: () => false,
            delete: () => false,
            read: () => false,
          },
        }
      : productCollection

    return {
      ...config,
      collections: [...collections, pluginCollection],
    }
  }
