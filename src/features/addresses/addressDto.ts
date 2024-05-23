import { BaseEntity } from "../../common-types/BaseEntity";

export interface AddressCreateDto {
  street: string;
  house: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface AddressReadDto extends BaseEntity {
  userId: string;
  street: string;
  house: string;
  city: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface AddressUpdateDto {
  street?: string;
  house?: string;
  city?: string;
  zipCode?: string;
  country?: string;
  phoneNumber?: string;
}
