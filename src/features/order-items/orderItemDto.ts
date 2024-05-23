import { BaseEntity } from "../../common-types/BaseEntity";

export interface OrderItemCreateDto {
    productId: string;
    quantity: number;
}

export interface OrderItemReadDto extends BaseEntity {
    id: string;
    productId: string;
    quantity: number;
    price: number;
}
