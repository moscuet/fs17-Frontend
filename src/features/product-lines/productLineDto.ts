import { BaseEntity } from "../../common-types/BaseEntity";

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
