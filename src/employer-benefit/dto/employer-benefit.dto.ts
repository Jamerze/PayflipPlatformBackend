import { BenefitDto } from "src/benefit/dto/benefit.dto";

export class EmployerBenefitDto {
    id: string;
    employer_id: string;
    benefit_id: string;
    benefit_name: string;
    benefit_cost: string;
    benefit_description: string;
}