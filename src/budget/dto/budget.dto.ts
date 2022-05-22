import { EmployeeDto } from "src/employee/dto/employee.dto";

export class BudgetDto {
    id: string;
    amount: string;
    budget_type: string;
    employer_id: string;
    employee_id: string;
    employee_name: string;
    createdOn?: Date;
    updatedOn?: Date;
}