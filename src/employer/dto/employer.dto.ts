import { UserDto } from "src/user/dto/user.dto";

export class EmployerDto {
    id: string;
    name: string;
    address?: string;
    country?: string;
    createdOn?: Date;
    updatedOn?: Date;
    user: UserDto
}