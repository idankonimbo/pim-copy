import { Tab } from 'payload'

export const seoTab: Tab = {
  label: 'SEO',
  fields: [
    { name: 'seoTitle', label: 'SEO Title', type: 'text' },
    { name: 'seoDescription', label: 'SEO Description', type: 'textarea' },
    { name: 'keywords', label: 'Keywords', type: 'text' },
  ],
}
