import { BaseEntity } from "../../common-types/BaseEntity";

export interface ReviewImage extends BaseEntity {
    reviewId: string;
    url: string;
}

export interface ProductImage extends BaseEntity {
    productId: string;
    url: string;
}
