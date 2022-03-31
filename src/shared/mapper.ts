import { EmployerDto } from "src/employer/dto/employer.dto";
import { EmployerModel } from "src/employer/employer.model";
import { UserDto } from "src/user/dto/user.dto";
import { UserModel } from "src/user/user.model";

export const toUserDto = (data: UserModel): UserDto => {
    const { id, name, email, country, role } = data;
    let userDto: UserDto = { id, name, email, country, role };
    return userDto;
};

export const toEmployerDto = (data: EmployerModel): EmployerDto => {
    const { id, name, address, country, user } = data;
    let employerDto: EmployerDto = { id, name, address, country, user: user ? toUserDto(user) : null };
    return employerDto;
};

export const isAdmin = (req: any) => {
    if (req.user.role == "admin") {
        return true;
    }
    else {
        return false;
    }
}
export const isEmployer = (req: any) => {
    if (req.user.role == "employer") {
        return true;
    }
    else {
        return false;
    }
}
export const isEmployee = (req: any) => {
    if (req.user.role == "employee") {
        return true;
    }
    else {
        return false;
    }
}