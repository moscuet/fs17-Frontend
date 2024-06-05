import { BaseEntity } from "../../common-types/BaseEntity";
    export interface ProductColorCreateDto {
        value: string;
    }

    export interface ProductColorReadDto extends BaseEntity {
        id: string;
        value: string;
    }

    export interface ProductColorUpdateDto {
        value: string;
    }

