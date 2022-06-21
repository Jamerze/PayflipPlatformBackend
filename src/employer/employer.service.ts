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
import { checkRegistrationValidation, checkUpdateEmployeeValidation, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { EmployeeModel } from 'src/employee/employee.model';

@Injectable()
export class EmployerService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
    ) { }

    async getAllEmployer(): Promise<any> {
        const employersList = await this.employerModel.find({ relations: ['user'] }).sort({"_id":-1});
        return responseWithData(true, "Data Retreived Successfully.", employersList.map(employer => toEmployerDto(employer)));
    }

    async getOneEmployer(id: string): Promise<any> {
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let employer;  
        try {
            employer = await this.employerModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Employer doesn't exist");
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        return responseWithData(true, "Data Retreived Successfully.", toEmployerDto(employer));
    }

    async createEmployer(
        createEmployerDto: CreateDto
    ): Promise<any> {
        const { name, company_name, email, address, country, password } = createEmployerDto;
        let validation = checkRegistrationValidation(createEmployerDto);
        if (!validation.success) {
            return validation;
        }
        const userInDb = await this.userModel.findOne({
            email: email
        });
        if (userInDb) {
            return responseWithoutData(false, "User already exists");
        }
        const newUser = new this.userModel({
            name: name,
            email: email,
            country: country,
            role: "employer",
            password: await bcrypt.hash(password, 10),
        });
        await newUser.save();
        const newEmployer = new this.employerModel({
            name: company_name,
            user_id: newUser.id,
            address: address,
            country: country,
            user: toUserDto(newUser)
        })
        await newEmployer.save();
        return responseWithData(true, "Employer Created Successfully", toEmployerDto(newEmployer));
    }

    async updateEmployer(id: string, employerDto: EmployerDto): Promise<any> {
        const { name, address, country } = employerDto;
        let validation = checkUpdateEmployeeValidation(id, employerDto);
        if (!validation.success) {
            return validation;
        }
        let employer;  
        try {
            employer = await this.employerModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Employer doesn't exist");
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        await this.employerModel.updateOne({ _id: id }, {
            name: name,
            address: address,
            country: country
        });

        await this.userModel.updateOne({
            _id: employer.user.id
        }, {
            country: country
        });
        await this.employeeModel.updateMany({ employer_id: id }, {
            employer_name: name,
        });
        employer = await this.employerModel.findById(id);
        return responseWithData(true, "Employer Updated Successfully", toEmployerDto(employer));
    }

    async destoryEmployer(id: string): Promise<any> {
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let employer;  
        try {
            employer = await this.employerModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Employer doesn't exist");
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        await this.employerModel.deleteOne({
            _id: id,
            relations: ['user'],
        });
        await this.userModel.deleteOne({
            email: employer.user.email,
        });
        return responseWithoutData(true, "Employer Deleted Successfully");
    }
}
