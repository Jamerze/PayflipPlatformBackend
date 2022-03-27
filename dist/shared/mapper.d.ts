import { EmployerDto } from "src/employer/dto/employer.dto";
import { EmployerModel } from "src/employer/employer.model";
import { UserDto } from "src/user/dto/user.dto";
import { UserModel } from "src/user/user.model";
export declare const toUserDto: (data: UserModel) => UserDto;
export declare const toEmployerDto: (data: EmployerModel) => EmployerDto;
