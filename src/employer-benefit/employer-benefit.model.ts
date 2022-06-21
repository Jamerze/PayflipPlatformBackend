import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document } from 'mongoose';
import { Benefit, BenefitModel, BenefitSchema } from "src/benefit/benefit.model";

@Schema()
export class EmployerBenefit {
    @Prop()
    employer_id: string;

    @Prop()
    benefit_id: string;

    @Prop()
    benefit_name: string;
    
    @Prop()
    benefit_cost: string;

    @Prop()
    benefit_description: string;

    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type EmployerBenefitModel = EmployerBenefit & Document

export const EmployerBenefitSchema = SchemaFactory.createForClass(EmployerBenefit)