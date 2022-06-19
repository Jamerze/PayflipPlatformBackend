import { BenefitModel } from "src/benefit/benefit.model";
import { BenefitDto } from "src/benefit/dto/benefit.dto";
import { EmployerBenefitModel } from "src/employer-benefit/employer-benefit.model";
import { EmployeeDto } from "src/employee/dto/employee.dto";
import { EmployeeModel } from "src/employee/employee.model";
import { EmployerDto } from "src/employer/dto/employer.dto";
import { EmployerModel } from "src/employer/employer.model";
import { UserDto } from "src/user/dto/user.dto";
import { UserModel } from "src/user/user.model";
import { EmployerBenefitDto } from "src/employer-benefit/dto/employer-benefit.dto";
import { BudgetModel } from "src/budget/budget.model";
import { BudgetDto } from "src/budget/dto/budget.dto";
import { TotalBudget } from "src/total-budget/total-budget.model";
import { TotalBudgetDto } from "src/total-budget/dto/budget.dto";
import { EmployeeBenefitModel } from "src/employee-benefit/employee-benefit.model";
import { EmployeeBenefitDto } from "src/employee-benefit/dto/employee-benefit.dto";

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
    const { id, name, employer_id, employer_name, designation, employement_type, address, country, user } = data;
    let employeeDto: EmployeeDto = { id, name, employer_id, employer_name, designation, employement_type, address, country, user: user ? toUserDto(user) : null };
    return employeeDto;
};

export const toBenefitDto = (data: BenefitModel): BenefitDto => {
    const { id, name, cost, country, description, imageUrl } = data;
    let benefitDto: BenefitDto = { id, name, cost, country, description, imageUrl };
    return benefitDto;
};


export const toEmployerBenefitDto = (data: EmployerBenefitModel): EmployerBenefitDto => {
    const { id, employer_id, benefit_id, benefit_name, benefit_cost, benefit_description } = data;
    let employerBenefitDto: EmployerBenefitDto = { id, employer_id, benefit_id, benefit_name, benefit_cost, benefit_description };
    return employerBenefitDto;
};

export const toBudgetDto = (data: BudgetModel): BudgetDto => {
    const { id, amount, budget_type, employer_id, employee_id, employee_name } = data;
    let budgetDto: BudgetDto = { id, amount, budget_type, employer_id, employee_id, employee_name };
    return budgetDto;
};

export const toTotalBudgetDto = (data: TotalBudget): TotalBudgetDto => {
    const { amount } = data;
    let totalBudgetDto: TotalBudgetDto = { amount};
    return totalBudgetDto;
};

export const toEmployeeBenefitDto = (data: EmployeeBenefitModel): EmployeeBenefitDto => {
    const { id, employee_id, benefit_id, benefit_name, benefit_cost, benefit_description, date_added } = data;
    let employeeBenefitDto: EmployeeBenefitDto = { id, employee_id, benefit_id, benefit_name, benefit_cost, benefit_description, date_added };
    return employeeBenefitDto;
};