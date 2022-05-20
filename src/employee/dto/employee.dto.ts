import { UserDto } from "src/user/dto/user.dto";

export class EmployeeDto {
    id: string;
    name: string;
    employer_id: string;
    employer_name: string;
    designation: string;
    employement_type: string;
    address?: string;
    country?: string;
    createdOn?: Date;
    updatedOn?: Date;
    user: UserDto
}