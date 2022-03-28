import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toEmployerDto, toUserDto } from 'src/shared/mapper';
import { CreateDto } from 'src/user/dto/create.dto';
import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerModel } from './employer.model';
import * as bcrypt from 'bcrypt';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class EmployerService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async getAllEmployer(): Promise<any> {
        const employersList = await this.employerModel.find({ relations: ['user'] });
        let status = {
            success: true,
            message: "Data Retreived Successfully.",
            data: employersList.map(employer => toEmployerDto(employer))
        }
        return status;
    }

    async getOneEmployer(id: string): Promise<any> {
        const employer = await this.employerModel.findOne({
            _id: id,
            relations: ['user'],
        });
        let status = {
            success: true,
            message: "Data Retreived Successfully.",
            data: toEmployerDto(employer)
        }

        if (!employer) {
            status = {
                success: false,
                message: "Employer list doesn't exist",
                data: toEmployerDto(employer)
            }
        }

        return status;
    }

    async createEmployer(
        createEmployerDto: CreateDto
    ): Promise<any> {
        const { name, company_name, email, address, country, password } = createEmployerDto;
        const userInDb = await this.userModel.findOne({
            email: email
        });
        let status = {
            success: true,
            message: "Employer Created Successfully",
            data: {}
        }
        if (userInDb) {
            status = {
                success: false,
                message: "User Already Exist",
                data: {}
            }
        }
        const newUser = new this.userModel({
            name: name,
            email: email,
            country: country,
            role: "employer",
            password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10),
        });
        await newUser.save();
        const newEmployer = new this.employerModel({
            name: company_name,
            address: address,
            country: country,
            user: toUserDto(newUser)
        })
        await newEmployer.save();
        status.data = toEmployerDto(newEmployer);
        return status;
    }

    async updateEmployer(id: string, employerDto: EmployerDto): Promise<any> {
        const { name, address, country } = employerDto;

        let employer: EmployerModel = await this.employerModel.findOne({
            _id: id,
        });
        let status = {
            success: true,
            message: "Employer Updated Successfully",
            data: {}
        }
        if (!employer) {
            status = {
                success: false,
                message: "Employer doesn't exist",
                data: {}
            }
        }

        await this.employerModel.updateOne({ _id: id }, {
            name: name,
            address: address,
            country: country
        });

        employer = await this.employerModel.findOne({
            _id: id,
            relations: ['user'],
        });
        status.data = toEmployerDto(employer)
        return status;
    }

    async destoryEmployer(id: string): Promise<any> {
        const employer: EmployerModel = await this.employerModel.findOne({
            _id: id,
            relations: ['user'],
        });
        let status = {
            success: true,
            message: "Employer Deleted Successfully",
            data: {}
        }

        if (!employer) {
            status = {
                success: false,
                message: "Employer list doesn't exist",
                data: {}
            }
        }

        await this.employerModel.deleteOne({
            _id: id,
            relations: ['user'],
        });

        return status;
    }
}
