export interface ProductsCollectionConfig {
  disabled?: boolean
  enableCategoryField?: boolean
  enableProductTypeField?: boolean
}

export interface ProductImage {
  image: string | null // Media ID reference
  alt: string | null
  caption: string | null
}

export interface ProductIcon {
  image: string | null // Media ID reference
  name: string | null
  label: string | null
}

export interface ProductFile {
  file_type: string | null
  url: string | null
  upload: string | null // Media ID reference
  iframe: string | null
  alt: string | null
  caption: string | null
}

export interface ProductWeight {
  unit: string | null
  value: number | null
}

export interface ProductSpecValue {
  name: string | null
  value: any[] // Rich text content
}

export interface ProductSpec {
  group: string | null
  values: ProductSpecValue[]
}

export interface ProductFeature {
  name: string | null
  value: any[] // Rich text content
}

export interface ProductTerm {
  term: any[] // Rich text content
  attachment: string | null
}

export interface ProductReview {
  customer: string | null
  date: string | null // YYYY-MM-DD format
  rating: number | null
  review: any[] // Rich text content
  image: string | null // Media ID reference
}

export interface Product {
  id: string
  name: string | null
  description: string | null
  content: any[] | null // Rich text content
  tags: Array<{ tag: string | null }>
  seasonalExpiryDate: string | null
  productGroup: string | null
  status: string | null
  mainImage: ProductImage
  imagesGallery: ProductImage[]
  icons: ProductIcon[]
  files: ProductFile[]
  material: string | null
  dimensions: string | null
  weight: ProductWeight
  productCode: string | null
  modelNumber: string | null
  spec: ProductSpec[]
  seoTitle: string | null
  seoDescription: string | null
  keywords: string | null
  Features: ProductFeature[]
  terms: ProductTerm[]
  reviews: ProductReview[]
  createdAt: string
  updatedAt: string
}
