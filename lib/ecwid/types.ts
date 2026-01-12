// Ecwid API TypeScript Types

// ============================================
// PRODUCT TYPES
// ============================================

export interface EcwidProduct {
  id: number
  name: string
  nameTranslated?: Record<string, string>
  sku: string
  price: number
  defaultDisplayedPrice: number
  defaultDisplayedPriceFormatted: string
  compareToPrice?: number
  compareToPriceFormatted?: string
  quantity: number
  unlimited: boolean
  inStock: boolean
  enabled: boolean
  description: string
  descriptionTranslated?: Record<string, string>
  imageUrl?: string
  thumbnailUrl?: string
  smallThumbnailUrl?: string
  hdThumbnailUrl?: string
  originalImageUrl?: string
  galleryImages?: GalleryImage[]
  weight?: number
  isShippingRequired: boolean
  categoryIds: number[]
  categories?: CategoryInfo[]
  options?: ProductOption[]
  combinations?: ProductCombination[]
  tax?: ProductTax
  url?: string
  seoTitle?: string
  seoDescription?: string
  relatedProducts?: RelatedProducts
  attributes?: ProductAttribute[]
  dimensions?: ProductDimensions
  showOnFrontpage?: number
  isSampleProduct?: boolean
  googleItemCondition?: string
  isGiftCard?: boolean
  discountsAllowed?: boolean
  createDate?: string
  updateDate?: string
}

export interface GalleryImage {
  id: number
  url: string
  thumbnail: string
  originalImageUrl: string
  imageUrl: string
  hdThumbnailUrl: string
  thumbnailUrl: string
  smallThumbnailUrl: string
  width: number
  height: number
  orderBy: number
}

export interface CategoryInfo {
  id: number
  enabled: boolean
}

export interface ProductOption {
  type: 'SELECT' | 'RADIO' | 'CHECKBOX' | 'TEXTFIELD' | 'TEXTAREA' | 'DATE' | 'FILES'
  name: string
  nameTranslated?: Record<string, string>
  choices?: OptionChoice[]
  defaultChoice?: number
  required?: boolean
}

export interface OptionChoice {
  text: string
  textTranslated?: Record<string, string>
  priceModifier?: number
  priceModifierType?: 'ABSOLUTE' | 'PERCENT'
}

export interface ProductCombination {
  id: number
  combinationNumber: number
  options: CombinationOption[]
  sku?: string
  price?: number
  compareToPrice?: number
  quantity?: number
  unlimited?: boolean
  inStock?: boolean
  weight?: number
  imageUrl?: string
  thumbnailUrl?: string
  smallThumbnailUrl?: string
  hdThumbnailUrl?: string
  originalImageUrl?: string
  isDefault?: boolean
}

export interface CombinationOption {
  name: string
  value: string
}

export interface ProductTax {
  taxable: boolean
  defaultLocationIncludedTaxRate?: number
  enabledManualTaxes?: number[]
}

export interface RelatedProducts {
  productIds?: number[]
  relatedCategory?: {
    enabled: boolean
    categoryId?: number
    productCount?: number
  }
}

export interface ProductAttribute {
  id?: number
  name: string
  value: string
  type?: 'CUSTOM' | 'UPC' | 'BRAND' | 'GENDER' | 'AGE_GROUP' | 'COLOR' | 'SIZE' | 'PRICE_PER_UNIT' | 'UNITS_IN_PRODUCT'
  show?: 'DESCR' | 'PRICE' | 'NOTSHOW'
}

export interface ProductDimensions {
  length?: number
  width?: number
  height?: number
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface EcwidCategory {
  id: number
  parentId?: number
  name: string
  nameTranslated?: Record<string, string>
  description?: string
  descriptionTranslated?: Record<string, string>
  enabled: boolean
  orderBy?: number
  productCount?: number
  url?: string
  imageUrl?: string
  thumbnailUrl?: string
  originalImageUrl?: string
  hdThumbnailUrl?: string
  seoTitle?: string
  seoDescription?: string
}

// ============================================
// CART / ORDER TYPES
// ============================================

export interface CartItem {
  productId: number
  name: string
  sku: string
  price: number
  quantity: number
  imageUrl?: string
  thumbnailUrl?: string
  weight?: number
  isShippingRequired: boolean
  selectedOptions?: SelectedOption[]
  combinationId?: number
}

export interface SelectedOption {
  name: string
  value: string
  type?: 'CHOICE' | 'CHOICES' | 'TEXT' | 'DATE' | 'FILES'
  valuesArray?: string[]
  selections?: OptionSelection[]
}

export interface OptionSelection {
  selectionTitle: string
  selectionModifier: number
  selectionModifierType: 'ABSOLUTE' | 'PERCENT'
}

// ============================================
// ORDER CALCULATION TYPES
// ============================================

export interface OrderCalculateRequest {
  email: string
  items: OrderItem[]
  shippingPerson: ShippingPerson
  billingPerson?: ShippingPerson
  shippingOption?: ShippingOption
  discountCoupon?: {
    code: string
  }
}

export interface OrderItem {
  productId: number
  quantity: number
  price: number
  name: string
  weight?: number
  isShippingRequired?: boolean
  selectedOptions?: SelectedOption[]
  combinationId?: number
  sku?: string
}

export interface ShippingPerson {
  name: string
  companyName?: string
  street: string
  city: string
  stateOrProvinceCode?: string
  stateOrProvinceName?: string
  postalCode: string
  countryCode: string
  countryName?: string
  phone?: string
}

export interface ShippingOption {
  shippingMethodId?: string
  shippingMethodName: string
  shippingCarrierName?: string
  shippingRate?: number
  fulfillmentType?: 'SHIPPING' | 'PICKUP' | 'DELIVERY'
  estimatedTransitTime?: string
  isPickup?: boolean
  pickupInstruction?: string
}

export interface OrderCalculateResponse {
  subtotal: number
  subtotalWithoutTax: number
  total: number
  totalWithoutTax: number
  tax: number
  shippingOption?: ShippingOption & {
    shippingRate: number
    estimatedTransitTime?: string
  }
  availableShippingOptions?: AvailableShippingOption[]
  discount?: number
  couponDiscount?: number
  volumeDiscount?: number
  membershipBasedDiscount?: number
  discountCoupon?: {
    id: number
    name: string
    code: string
    discountType: string
    status: string
    discount: number
  }
  availableTaxes?: AvailableTax[]
  taxesOnShipping?: TaxLine[]
  handlingFee?: {
    name: string
    value: number
  }
  items: CalculatedOrderItem[]
  ipAddress?: string
  customerTaxExempt?: boolean
  customerTaxId?: string
  customerTaxIdValid?: boolean
}

export interface AvailableShippingOption {
  shippingMethodId: string
  shippingMethodName: string
  shippingCarrierName?: string
  shippingRate: number
  estimatedTransitTime?: string
  fulfillmentType: 'SHIPPING' | 'PICKUP' | 'DELIVERY'
  isPickup: boolean
  pickupInstruction?: string
}

export interface AvailableTax {
  id: number
  name: string
  enabled: boolean
  includeInPrice: boolean
  defaultTax: number
}

export interface TaxLine {
  name: string
  value: number
  total: number
}

export interface CalculatedOrderItem extends OrderItem {
  taxes?: TaxLine[]
  subtotal: number
  total: number
  totalWithoutTax: number
}

// ============================================
// ORDER CREATION TYPES
// ============================================

export interface CreateOrderRequest {
  email: string
  items: OrderItem[]
  shippingPerson: ShippingPerson
  billingPerson?: ShippingPerson
  shippingOption: ShippingOption & {
    shippingRate: number
  }
  paymentMethod?: string
  paymentStatus: 'AWAITING_PAYMENT' | 'PAID' | 'CANCELLED' | 'REFUNDED' | 'PARTIALLY_REFUNDED' | 'INCOMPLETE'
  fulfillmentStatus?: 'AWAITING_PROCESSING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'WILL_NOT_DELIVER' | 'RETURNED' | 'READY_FOR_PICKUP' | 'OUT_FOR_DELIVERY'
  subtotal: number
  total: number
  tax?: number
  discountCoupon?: {
    code: string
  }
  customerId?: number
  customerGroup?: string
  refererId?: string
  globalReferer?: string
  externalTransactionId?: string
  orderComments?: string
  privateAdminNotes?: string
}

export interface CreateOrderResponse {
  id: number
  orderNumber: number
  vendorOrderNumber?: string
}

export interface EcwidOrder extends CreateOrderRequest {
  id: number
  orderNumber: number
  vendorOrderNumber?: string
  createDate: string
  updateDate: string
  createTimestamp: number
  updateTimestamp: number
  refundedAmount?: number
  paymentMessage?: string
  externalFulfillment?: boolean
  hidden?: boolean
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ProductsResponse {
  total: number
  count: number
  offset: number
  limit: number
  items: EcwidProduct[]
}

export interface CategoriesResponse {
  total: number
  count: number
  offset: number
  limit: number
  items: EcwidCategory[]
}

export interface StoreProfile {
  generalInfo: {
    storeId: number
    storeUrl: string
    starterSite: {
      ecwidSubdomain: string
      generatedUrl: string
    }
  }
  account: {
    accountName: string
    accountNickName: string
    accountEmail: string
  }
  settings: {
    closed: boolean
    storeName: string
    storeDescription?: string
    invoiceLogoUrl?: string
    emailLogoUrl?: string
    googleRemarketingEnabled: boolean
    googleAnalyticsId?: string
    orderCommentsEnabled: boolean
    orderCommentsCaption?: string
    orderCommentsRequired: boolean
    hideOutOfStockProductsInStorefront: boolean
    askCompanyName: boolean
    favoritesEnabled: boolean
    defaultProductSortOrder: string
  }
  mailNotifications: {
    adminNotificationEmails: string[]
    customerNotificationFromEmail?: string
  }
  company: {
    companyName?: string
    email?: string
    street?: string
    city?: string
    stateOrProvinceCode?: string
    stateOrProvinceName?: string
    postalCode?: string
    countryCode?: string
    countryName?: string
    phone?: string
  }
  formatsAndUnits: {
    currency: string
    currencyPrefix: string
    currencySuffix: string
    currencyGroupSeparator: string
    currencyDecimalSeparator: string
    currencyPrecision: number
    currencyTruncateZeroFractional: boolean
    currencyRate: number
    weightUnit: 'CARAT' | 'GRAM' | 'OUNCE' | 'POUND' | 'KILOGRAM'
    weightPrecision: number
    weightGroupSeparator: string
    weightDecimalSeparator: string
    weightTruncateZeroFractional: boolean
    dateFormat: string
    timeFormat: string
    timezone: string
    dimensionsUnit: 'MM' | 'CM' | 'IN' | 'YD'
    orderNumberPrefix?: string
    orderNumberSuffix?: string
  }
  languages: {
    enabledLanguages: string[]
    facebookPreferredLocale: string
    defaultLanguage: string
  }
  shipping: {
    handlingFee?: {
      name: string
      value: number
      description?: string
    }
  }
  zones: Zone[]
  taxSettings: {
    automaticTaxEnabled: boolean
    taxes: StoreTax[]
    pricesIncludeTax: boolean
  }
  businessRegistrationID?: {
    name?: string
    value?: string
  }
  legalPagesSettings: {
    requireTermsAgreementAtCheckout: boolean
    legalPagesEnabled: boolean
  }
  orderInvoiceSettings: {
    displayOrderInvoices: boolean
    attachInvoiceToOrderEmailNotifications?: string
    invoiceLogoUrl?: string
  }
  designSettings: {
    productListLayout: string
    productCardLayout: string
  }
}

export interface Zone {
  id: string
  name: string
  countryCodes?: string[]
  stateOrProvinceCodes?: string[]
  postCodes?: string[]
}

export interface StoreTax {
  id: number
  name: string
  enabled: boolean
  includeInPrice: boolean
  useShippingAddress: boolean
  taxShipping: boolean
  appliedByDefault: boolean
  defaultTax: number
  rules?: TaxRule[]
}

export interface TaxRule {
  zoneId: string
  tax: number
}
