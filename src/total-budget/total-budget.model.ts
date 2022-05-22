import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class TotalBudget {
    @Prop()
    amount: string;
    
    @Prop()
    employee_id: string;
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type TotalBudgetModel = TotalBudget & Document

export const TotalBudgetSchema = SchemaFactory.createForClass(TotalBudget)