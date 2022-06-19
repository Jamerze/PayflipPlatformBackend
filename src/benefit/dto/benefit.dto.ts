export class BenefitDto {
    id: string;
    name: string;
    cost: string;
    country?: string;
    description?: string;
    imageUrl?: string;
    createdOn?: Date;
    updatedOn?: Date;
}