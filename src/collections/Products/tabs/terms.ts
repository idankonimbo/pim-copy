import { Tab } from 'payload'

export const termsTab: Tab = {
  label: 'Terms',
  fields: [
    {
      name: 'terms',
      type: 'array',
      fields: [
        { name: 'term', type: 'richText' },
        {
          name: 'attachment',
          type: 'upload',
          relationTo: 'media',
        },
      ],
    },
  ],
}
