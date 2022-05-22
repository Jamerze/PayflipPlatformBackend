import { BenefitDto } from "src/benefit/dto/benefit.dto";

export class EmployeeBenefitDto {
    id: string;
    employee_id: string;
    benefit: BenefitDto;
    date_added: Date
}