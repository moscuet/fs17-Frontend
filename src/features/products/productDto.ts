import { BaseEntity } from "../../common-types/BaseEntity";
import { ProductImage } from "../images/imageDto";
import { ReviewReadDto } from "../reviews/ReviewDto";

export interface ProductCreateDto {
    productLineId: string ;
    productSizeId?: string | null;
    productColorId?: string | null;
    inventory: number;
    imageUrls: string[];
}

export interface ProductReadDto extends BaseEntity {
  id: string;
  productLineId: string;
  productSizeId?: string;
  productColorId?: string;
  inventory: number;
  price: number;
  images: ProductImage[];
  reviews: ReviewReadDto[]; 
  productLineName: string;
  productSizeValue: string;
  productColorValue: string;
}

export interface ProductUpdateDto {
    productLineId?: string;
    productSizeId?: string;
    productColorId?: string;
    inventory?: number;
    imageUrls?: string[];
}


  
  export interface ProductDetails {
    id: string;
    productLineId: string;
    productSizeId: string | null;
    productColorId: string | null;
    inventory: number;
    images: ProductImage[];
    reviewss: any[] | null;
    productLineName: string;
    productSizeValue: string | null;
    productColorValue: string | null;
  }
  
 
