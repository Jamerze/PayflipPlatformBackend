import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User {
    @Prop()
    name: string;
    
    @Prop()
    company_name: string;

    @Prop({unique: true})
    email: string;
    
    @Prop()
    address: string;

    @Prop()
    password: string;
    
    @Prop()
    country: string;
    
    @Prop()
    role: string;
}

export type UserModel = User & Document

export const UserSchema = SchemaFactory.createForClass(User)