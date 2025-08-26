import { Field, Tab } from 'payload'

const createAltCaptionRow = (): Field => ({
  type: 'row',
  fields: [
    { name: 'alt', label: 'Alt Text', type: 'text' },
    { name: 'caption', label: 'Caption', type: 'text' },
  ],
})

const createImageFields = (): Field[] => [
  {
    name: 'image',
    type: 'upload',
    relationTo: 'media',
  },
  createAltCaptionRow(),
]

export const mediaTab: Tab = {
  label: 'Media',
  fields: [
    {
      name: 'mainImage',
      type: 'group',
      fields: createImageFields(),
    },
    {
      name: 'imagesGallery',
      labels: {
        singular: 'image',
        plural: 'images',
      },
      type: 'array',
      fields: createImageFields(),
    },
    {
      name: 'icons',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media' },
        {
          type: 'row',
          fields: [
            { name: 'name', type: 'text' },
            { name: 'label', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'files',
      type: 'array',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'file_type',
              label: 'Type',
              type: 'select',
              options: [
                { label: 'URL', value: 'text' },
                { label: 'UPLOAD', value: 'media' },
                { label: 'IFRAME', value: 'code' },
              ],
              admin: { width: 10 },
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              admin: {
                condition: (_, siblingData) => siblingData?.file_type === 'text',
              },
            },
            {
              name: 'upload',
              type: 'upload',
              relationTo: 'media',
              admin: {
                condition: (_, siblingData) => siblingData?.file_type === 'media',
              },
            },
            {
              name: 'iframe',
              label: 'Embed Code',
              type: 'code',
              admin: {
                condition: (_, siblingData) => siblingData?.file_type === 'code',
              },
            },
          ],
        },

        createAltCaptionRow(),
      ],
    },
  ],
}
