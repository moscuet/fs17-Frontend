import { BaseEntity } from "../../common-types/BaseEntity";

    export interface ProductSizeCreateDto {
        value: string;
    }

    export interface ProductSizeReadDto extends BaseEntity{
        id: string;
        Value: string;
    }

    export interface ProductSizeUpdateDto {
        value: string;
    }

