import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

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

    @Prop({default: "https://media.idownloadblog.com/wp-content/uploads/2017/10/iphone-8-mockup-downloadable.jpg"})
    imageUrl?: string;
    
    @Prop()
    createdOn?: Date;

    @Prop()
    updatedOn?: Date;
}

export type BenefitModel = Benefit & Document

export const BenefitSchema = SchemaFactory.createForClass(Benefit)