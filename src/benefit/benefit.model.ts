import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Schema()
export class Benefit {
    @Prop()
    name: string;
    
    @Prop()
    cost: string;
    
    @Prop()
    country?: string;
    
    @Prop()
    description?: string;

    @Prop({default: `${process.env.REACT_APP_BASE_URL}/default.png`})
    imageUrl?: string;
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type BenefitModel = Benefit & Document

export const BenefitSchema = SchemaFactory.createForClass(Benefit)