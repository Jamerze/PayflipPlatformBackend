import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { Document } from 'mongoose';
import { Employee, EmployeeModel, EmployeeSchema } from "src/employee/employee.model";

@Schema()
export class Budget {
    @Prop()
    amount: string;
    
    @Prop()
    budget_type: string;
    
    @Prop()
    employer_id: string;
    
    @Prop()
    employee_id: string;

    @Prop()
    employee_name: string;

    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type BudgetModel = Budget & Document

export const BudgetSchema = SchemaFactory.createForClass(Budget)