/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
import { Document } from 'mongoose';
export declare class Employer {
    user_id: string;
    name: string;
    address?: string;
    country?: string;
}
export declare type EmployerModel = Employer & Document;
export declare const EmployerSchema: import("mongoose").Schema<Document<Employer, any, any>, import("mongoose").Model<Document<Employer, any, any>, any, any, any>, any, any>;
