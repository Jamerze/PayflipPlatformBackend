import { UserDto } from "src/user/dto/user.dto";

export class EmployeeCreateDto {  
    name: string;
    email: string;
    password: string;
    employer_id: string;
    designation: string;
    employement_type: string;
    address?: string;
    country?: string;
}