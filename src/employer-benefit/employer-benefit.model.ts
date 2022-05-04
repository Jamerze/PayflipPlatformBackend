import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class EmployerBenefit {
    @Prop()
    employer_id: string;

    @Prop([String])
    benefits: string[]
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type EmployerBenefitModel = EmployerBenefit & Document

export const EmployerBenefitSchema = SchemaFactory.createForClass(EmployerBenefit)