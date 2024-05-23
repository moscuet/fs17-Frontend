import { BaseEntity } from "../../common-types/BaseEntity";
import { ProductImage } from "../images/imageDto";

export interface ProductLineCreateDto {
    title: string;
    description: string;
    categoryId: string;
    price: number;
    images: ProductImage[];
}

export interface ProductLineReadDto extends BaseEntity {
    title: string;
    description: string;
    categoryId: string;
    categoryName: string;
    price: number;
    images: ProductImage[];
}

export interface ProductLineUpdateDto {
    title?: string;
    description?: string;
    categoryId?: string;
    price?: number;
    images?: ProductImage[];
}
