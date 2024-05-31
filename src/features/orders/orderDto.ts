import { BaseEntity } from "../../common-types/BaseEntity";
import { OrderStatus } from "../../common-types/OrderStatus";
import { OrderItemCreateDto, OrderItemReadDto } from "../order-items/orderItemDto";


export interface OrderCreateDto {
    addressId: string;
    items: OrderItemCreateDto[];
}
export interface OrderReadDto extends BaseEntity {
    UserId: string;
    total: number;
    status: OrderStatus;
    Items: OrderItemReadDto[];
}

export interface OrderUpdateDto {
    AddressId?: string;
    Status?: OrderStatus;
}
