
export interface SalesRecord {
  // Customer Fields
  customerId: string;
  customerName: string;
  phoneNumber: string;
  gender: 'Male' | 'Female' | 'Other';
  age: number;
  customerRegion: string;
  customerType: string;

  // Product Fields
  productId: string;
  productName: string;
  brand: string;
  productCategory: string;
  tags: string;

  // Sales Fields
  quantity: number;
  pricePerUnit: number;
  discountPercentage: number;
  totalAmount: number;
  finalAmount: number;

  // Operational Fields
  date: string;
  paymentMethod: string;
  orderStatus: string;
  deliveryType: string;
  storeId: string;
  storeLocation: string;
  salespersonId: string;
  employeeName: string;
}

export interface FilterOptionsResponse {
  customerRegions: string[];
  genders: ('Male' | 'Female' | 'Other')[];
  productCategories: string[];
  tags: string[];
  paymentMethods: string[];
  ageRange: {
    min: number;
    max: number;
  };
  dateRange: {
    min: number; // timestamp
    max: number;
  };
}

export interface SalesResponse {
  data: SalesRecord[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
  };
  filterOptions?: FilterOptionsResponse;
}

export interface FilterOptions {
  customerRegion?: string[];
  gender?: string[];
  ageRange?: { min: number; max: number };
  productCategory?: string[];
  tags?: string[];
  paymentMethod?: string[];
  dateRange?: { start: string; end: string };
}

export interface SearchAndFilterRequest {
  searchTerm?: string;
  filters?: FilterOptions;
  sortBy?: 'date' | 'quantity' | 'customerName';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
