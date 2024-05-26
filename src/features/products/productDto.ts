import { BaseEntity } from "../../common-types/BaseEntity";
import { ProductImage } from "../images/imageDto";

export interface ProductCreateDto {
    productLineId: string;
    productSizeId?: string;
    productColorId?: string;
    inventory: number;
    imageUrls: string[];
}

export interface ProductReadDto extends BaseEntity {
    id: string;
    productLineId: string;
    productSizeId?: string;
    productColorId?: string;
    inventory: number;
    productLineName: string;
    productSizeValue: string;
    productColorValue: string;
}

export interface ProductUpdateDto {
    productLineId?: string;
    productSizeId?: string;
    productColorId?: string;
    inventory?: number;
}

