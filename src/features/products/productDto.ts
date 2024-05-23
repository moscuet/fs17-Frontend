import { BaseEntity } from "../../common-types/BaseEntity";
import { ProductImage } from "../images/imageDto";

export interface ProductCreateDto {
    productLineId: string;
    productSizeId?: string;
    productColorId?: string;
    price: number;
    inventory: number;
    imageUrls: string[];
}

export interface ProductReadDto extends BaseEntity {
    productLineId: string;
    productSizeId?: string;
    productColorId?: string;
    inventory: number;
    price: number;
    images: ProductImage[];
    productLineName: string;
    productSizeValue: string;
    productColorValue: string;
}

export interface ProductUpdateDto {
    productLineId?: string;
    productSizeId?: string;
    productColorId?: string;
    inventory?: number;
    price?: number;
}

