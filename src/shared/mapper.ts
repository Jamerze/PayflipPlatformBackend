import { BenefitModel } from "src/benefit/benefit.model";
import { BenefitDto } from "src/benefit/dto/benefit.dto";
import { EmployeeDto } from "src/employee/dto/employee.dto";
import { EmployeeModel } from "src/employee/employee.model";
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

export const toEmployeeDto = (data: EmployeeModel): EmployeeDto => {
    const { id, name, employer_id, designation, employement_type, address, country, user } = data;
    let employeeDto: EmployeeDto = { id, name, employer_id, designation, employement_type, address, country, user: user ? toUserDto(user) : null };
    return employeeDto;
};

export const toBenefitDto = (data: BenefitModel): BenefitDto => {
    const { id, name, cost, country, description } = data;
    let benefitDto: BenefitDto = { id, name, cost, country, description };
    return benefitDto;
};