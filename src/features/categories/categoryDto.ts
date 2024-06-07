import { BaseEntity } from "../../common-types/BaseEntity";

export interface CategoryCreateDto {
    name: string;
    parentCategoryId?: string;
    imageUrl?: string;
}

export interface CategoryReadDto extends BaseEntity {
    name: string;
    parentCategoryId?: string;
    imageUrl: string;
}

export interface CategoryUpdateDto {
    name?: string;
    parentCategoryId?: string;
    imageUrl?: string;
}
