import { BaseEntity } from "../../common-types/BaseEntity";
import { ProductDetails } from "../products/productDto";

export interface ProductLineCreateDto {
    title: string;
    description: string;
    categoryId: string;
    price: number;
    imageUrl: string;
}

export interface ProductLineReadDto extends BaseEntity {
    title: string;
    description: string;
    categoryId: string;
    categoryName: string;
    price: number;
    imageUrl: string;
}

export interface ProductLineUpdateDto {
    title?: string;
    description?: string;
    categoryId?: string;
    price?: number;
    imageUrl?: string;
}

export interface ProductLineDetails {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    categoryId: string;
    products: ProductDetails[];
    reviews: any[];
  }