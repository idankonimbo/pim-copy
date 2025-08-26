import { Tab } from 'payload'

export const reviewsTab: Tab = {
  label: 'Reviews',
  fields: [
    {
      name: 'reviews',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'customer', type: 'text' },
            { name: 'date', type: 'date' },
            {
              name: 'rating',
              type: 'select',
              required: true,
              options: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
              ],
              hooks: {
                beforeValidate: [
                  ({ value }) => {
                    const numValue = Number(value)
                    if (isNaN(numValue) || numValue < 1 || numValue > 5) {
                      throw new Error('Rating must be a number between 1 and 5')
                    }
                    return numValue
                  },
                ],
              },
            },
          ],
        },

        { name: 'review', type: 'richText' },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
