import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document } from 'mongoose';
import { Benefit, BenefitModel, BenefitSchema } from "src/benefit/benefit.model";

@Schema()
export class EmployeeBenefit {
    @Prop()
    employee_id: string;
    
    @Prop()
    benefit_id: string;

    @Prop()
    benefit_name: string;
    
    @Prop()
    benefit_cost: string;

    @Prop()
    benefit_description: string;
    
    @Prop({default: `${process.env.REACT_APP_BASE_URL}/default.png`})
    imageUrl?: string;
    
    @Prop()
    date_added: Date;
}

export type EmployeeBenefitModel = EmployeeBenefit & Document

export const EmployeeBenefitSchema = SchemaFactory.createForClass(EmployeeBenefit)