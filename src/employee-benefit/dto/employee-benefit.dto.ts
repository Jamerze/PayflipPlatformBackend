import { BenefitDto } from "src/benefit/dto/benefit.dto";

export class EmployeeBenefitDto {
    id: string;
    employee_id: string;
    benefit_id: string;
    benefit_name: string;
    benefit_cost: string;
    benefit_description: string;
    // image_url: string;
    date_added: Date
}