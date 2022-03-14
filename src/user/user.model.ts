import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

@Schema()
export class User {
    @Prop({unique: true})
    id: string;

    @Prop({unique: true})
    username: string;

    @Prop({unique: true})
    email: string;

    @Prop()
    password: string;
}

export type UserModel = User & Document

export const UserSchema = SchemaFactory.createForClass(User)