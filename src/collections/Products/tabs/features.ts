import { Tab } from 'payload'

export const featuresTab: Tab = {
  label: 'Features',
  fields: [
    {
      name: 'Features',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text', admin: { width: 20 } },
            { name: 'value', type: 'richText' },
          ],
        },
      ],
    },
  ],
}
