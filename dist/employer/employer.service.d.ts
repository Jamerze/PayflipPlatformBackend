import { Model } from 'mongoose';
import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerModel } from './employer.model';
export declare class EmployerService {
    private employerModel;
    constructor(employerModel: Model<EmployerModel>);
    getAllEmployer(): Promise<EmployerDto[]>;
    getOneEmployer(id: string): Promise<EmployerDto>;
    createEmployer(createEmployerDto: EmployerCreateDto): Promise<EmployerDto>;
    updateEmployer(id: string, employerDto: EmployerDto): Promise<EmployerDto>;
    destoryEmployer(id: string): Promise<EmployerDto>;
}
