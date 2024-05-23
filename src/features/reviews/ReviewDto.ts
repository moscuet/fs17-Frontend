import { BaseEntity } from "../../common-types/BaseEntity";
import { ReviewImage } from "../images/imageDto";

export interface ReviewCreateControllerDto {
    productId: string;
    comment: string;
    rating: number;
    isAnonymous: boolean;
    imageUrls: string[];
}

export interface ReviewCreateDto {
    userId: string;
    productId: string;
    comment: string;
    rating: number;
    isAnonymous: boolean;
    imageUrls: string[];
}

export interface ReviewReadDto extends BaseEntity {
    productId: string;
    comment: string;
    rating: number;
    isAnonymous: boolean;
    images: ReviewImage[];
}

export interface ReviewUpdateDto {
    comment?: string;
    rating?: number;
    isAnonymous?: boolean;
}
