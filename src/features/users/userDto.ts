import { BaseEntity } from "../../common-types/BaseEntity";
import { UserRole } from "../../common-types/UserRole";

export interface UserCreateDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar: string;
    phoneNumber: string;
    dateOfBirth: string;
    userRole: UserRole;
}

// UserReadDto Interface
export interface UserReadDto extends BaseEntity {
    firstName: string;
    lastName: string;
    email: string;
    userRole: UserRole;
    phoneNumber: string;
    avatar: string;
    dateOfBirth: string;
}

// UserUpdateDto Interface
export interface UserUpdateDto {
    firstName?: string;
    lastName?: string;
    password?: string;
    avatar?: string;
    dateOfBirth?: string;
    userRole?: UserRole;
    phoneNumber?: string;
}
