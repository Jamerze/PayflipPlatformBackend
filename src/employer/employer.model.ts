import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class Employer {
    @Prop()
    user_id: string;
    
    @Prop()
    name: string;
    
    @Prop()
    address?: string;
    
    @Prop()
    country?: string;
}

export type EmployerModel = Employer & Document

export const EmployerSchema = SchemaFactory.createForClass(Employer)