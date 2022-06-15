import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { User, UserModel, UserSchema } from "src/user/user.model";
import { Employer, EmployerModel, EmployerSchema } from "src/employer/employer.model";

@Schema()
export class Employee {
    @Prop()
    name: string;

    @Prop()
    employer_id: string;
    
    @Prop()
    user_id: string;
    
    @Prop()
    employer_name: string;

    @Prop()
    designation: string;

    @Prop()
    employement_type: string;
    
    @Prop()
    address?: string;
    
    @Prop()
    country?: string;
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;

    @Prop({type: UserSchema})
    @Type(() => User)
    user: UserModel
}

export type EmployeeModel = Employee & Document

export const EmployeeSchema = SchemaFactory.createForClass(Employee)