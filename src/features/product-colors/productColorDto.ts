import { BaseEntity } from "../../common-types/BaseEntity";

namespace Eshop.Service.src.Dto {
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
}
