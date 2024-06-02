import { BaseEntity } from "../../common-types/BaseEntity";
import { OrderStatus } from "../../common-types/OrderStatus";

export interface OrderCreateDto {
    addressId: string;
    items: OrderItemCreateDto[];
}
export interface OrderReadDto extends BaseEntity {
    UserId: string;
    total: number;
    status: OrderStatus;
    items: OrderItemReadDto[];
}

export interface OrderUpdateDto {
    AddressId?: string;
    Status?: OrderStatus;
}


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


