import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toEmployerDto } from 'src/shared/mapper';
import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerModel } from './employer.model';

@Injectable()
export class EmployerService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
    ) { }

    async getAllEmployer(): Promise<EmployerDto[]> {
        const employers = await this.employerModel.find();
        return employers.map(employer => toEmployerDto(employer));
    }

    async getOneEmployer(id: string): Promise<EmployerDto> {
        const employer = await this.employerModel.findOne({
            where: { id },
        });

        if (!employer) {
            throw new HttpException(
                `Employer list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        return toEmployerDto(employer);
    }

    async createEmployer(
        createEmployerDto: EmployerCreateDto
    ): Promise<EmployerDto> {
        const { user_id, name, address, country } = createEmployerDto;
        const newEmployer = new this.employerModel({
            user_id: user_id,
            name: name,
            address: address,
            country: country
        })
        await newEmployer.save();

        return toEmployerDto(newEmployer);
    }

    async updateEmployer(id: string, employerDto: EmployerDto): Promise<EmployerDto> {
        const { user_id, name, address, country } = employerDto;

        let employer: EmployerModel = await this.employerModel.findOne({
            where: { id },
        });
        if (!employer) {
            throw new HttpException(
                `Employer list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.employerModel.updateOne({ id }, {
            user_id: user_id,
            name: name,
            address: address,
            country: country
        });

        employer = await this.employerModel.findOne({
            where: { id },
        }); 

        return toEmployerDto(employer);
    }

    async destoryEmployer(id: string): Promise<EmployerDto> {
        const employer: EmployerModel = await this.employerModel.findOne({
            where: { id },
        });

        if (!employer) {
            throw new HttpException(
                `Employer list doesn't exist`,
                HttpStatus.BAD_REQUEST,
            );
        }

        await this.employerModel.deleteOne({ id });

        return toEmployerDto(employer);
    }
}
