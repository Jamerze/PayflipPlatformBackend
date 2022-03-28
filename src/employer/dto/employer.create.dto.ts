import { UserDto } from "src/user/dto/user.dto";

export class EmployerCreateDto {  
    name: string;  
    contact_name: string;
    address?: string;
    country?: string;
}