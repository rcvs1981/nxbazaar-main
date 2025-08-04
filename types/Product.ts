

export interface Product {
  id: string;
  title: string;
  slug: string;
  imageUrl?: string;
  productImages: string[];
  description?: string;
  isActive: boolean;
  isWholesale: boolean;
  sku?: string;
  barcode?: string;
  productCode?: string;
  unit?: string;
  productPrice: number;
  salePrice: number;
  wholesalePrice?: number;
  wholesaleQty?: number;
  productStock?: number;
  qty?: number;
  tags: string[];
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}
