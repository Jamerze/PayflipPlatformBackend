import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { User, UserModel, UserSchema } from "src/user/user.model";

@Schema()
export class Employer {
    @Prop()
    name: string;
    
    @Prop()
    address?: string;
    
    @Prop()
    country?: string;
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;

    @Prop()
    user_id: string;

    @Prop({type: UserSchema})
    @Type(() => User)
    user: UserModel
}

export type EmployerModel = Employer & Document

export const EmployerSchema = SchemaFactory.createForClass(Employer)