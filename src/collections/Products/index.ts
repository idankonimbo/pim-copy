// src/collections/Products/index.ts

import { CollectionConfig } from 'payload'

import { createGeneralTab } from './tabs/general.js'
import { mediaTab } from './tabs/media.js'
import { specificationsTab } from './tabs/specifications.js'
import { seoTab } from './tabs/seo.js'
import { featuresTab } from './tabs/features.js'
import { reviewsTab } from './tabs/reviews.js'
import { termsTab } from './tabs/terms.js'
import type { ProductsCollectionConfig } from '../../types.js'

export const createProductsCollection = (
  pluginOptions?: ProductsCollectionConfig,
): CollectionConfig => ({
  slug: 'products',
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        createGeneralTab(pluginOptions),
        mediaTab,
        specificationsTab,
        seoTab,
        featuresTab,
        termsTab,
        reviewsTab,
      ],
    },
  ],
})
