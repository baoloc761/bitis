export interface IBitisImage {
  id: number;
  src: string;
  position: number;
}

export interface IBitisOption {
  name: "Màu sắc" | "Kích thước" | string;
  position: number;
  values: string[];
}

export interface IBitisVariant {
  id: number;
  barcode: string;
  price: number;
  compareAtPrice?: number;
  available: boolean;
  option1?: string;
  option2?: string;
  inventoryQuantity: number;
}

export interface IBitisVariant {
  id: number;
  price: number;
  compare_at_price: string;
  available: boolean;
  inventory_quantity: number;
}

export interface IBitisProduct {
  id: number;
  handle: string;
  title: string;
  productType: string;
  tags: string[];
  soldQuantity: number;
  images: IBitisImage[];
  image: IBitisImage;
  options: IBitisOption[];
  variants: IBitisVariant[];
  sole_quantity: number;
  isNew: boolean;
}

interface IBitisResponse {
  products: IBitisProduct[];
}