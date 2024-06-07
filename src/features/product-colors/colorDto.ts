import { BaseEntity } from "../../common-types/BaseEntity";
    export interface ColorCreateDto {
        value: string;
    }

    export interface ColorReadDto extends BaseEntity {
        id: string;
        value: string;
    }

    export interface ColorUpdateDto {
        value: string;
    }

