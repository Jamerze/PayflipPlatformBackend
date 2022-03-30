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
        let status = {
            success: false,
            message: "",
            data: {}
        }
        if (!id || id == "") {
            status.message = "ID is missing."
        }
        if (status.message != "") {
            return status;
        }

        const employer = await this.employerModel.findOne({
            _id: id,
            relations: ['user'],
        });
        if (!employer) {
            status.message = "Employer doesn't exist";
            return status;
        }
        status = {
            success: true,
            message: "Data Retreived Successfully.",
            data: toEmployerDto(employer)
        }
        return status;
    }

    async createEmployer(
        createEmployerDto: CreateDto
    ): Promise<any> {
        const { name, company_name, email, address, country, password } = createEmployerDto;
        let status = {
            success: false,
            message: "",
            data: {}
        };

        if (!name || name == "") {
            status.message = "Name is required."
        }
        else if (!company_name || company_name == "") {
            status.message = "Company Name is required."
        }
        else if (!email || email == "") {
            status.message = "Email is required."
        }
        else if (!address || address == "") {
            status.message = "Address is required."
        }
        else if (!country || country == "") {
            status.message = "Country is required."
        }
        else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            status.message = "Email is not valid."
        }

        if (status.message != "") {
            return status;
        }
        const userInDb = await this.userModel.findOne({
            email: email
        });
        if (userInDb) {
            status.message = "User Already Exist";
            return status;
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
        status.success = true;
        status.message = "Employer Created Successfully";
        status.data = toEmployerDto(newEmployer);
        return status;
    }

    async updateEmployer(id: string, employerDto: EmployerDto): Promise<any> {
        const { name, address, country } = employerDto;

        let status = {
            success: false,
            message: "",
            data: {}
        }
        if (!id || id == "") {
            status.message = "ID is missing."
        }
        else if (!name || name == "") {
            status.message = "Name is required."
        }
        else if (!address || address == "") {
            status.message = "Address is required."
        }
        else if (!country || country == "") {
            status.message = "Country is required."
        }
        if (status.message != "") {
            return status;
        }
        let employer: EmployerModel = await this.employerModel.findOne({
            _id: id,
        });
        if (!employer) {
            status.message = "Employer doesn't exist";
            return status;
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
        status.success = true;
        status.message = "Employer Updated Successfully";
        status.data = toEmployerDto(employer)
        return status;
    }

    async destoryEmployer(id: string): Promise<any> {
        let status = {
            success: false,
            message: "",
            data: {}
        }
        if (!id || id == "") {
            status.message = "ID is missing."
        }
        if (status.message != "") {
            return status;
        }
        const employer: EmployerModel = await this.employerModel.findOne({
            _id: id,
            relations: ['user'],
        });
        if (!employer) {
            status.message = "Employer doesn't exist";
            return status;
        }

        await this.employerModel.deleteOne({
            _id: id,
            relations: ['user'],
        });
        await this.userModel.deleteOne({
            email: employer.user.email,
        });
        status.success = true;
        status.message = "Employer Deleted Successfully";
        return status;
    }
}
