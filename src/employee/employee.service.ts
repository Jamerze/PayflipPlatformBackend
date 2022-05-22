import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { EmployeeModel } from './employee.model';
import { UserModel } from 'src/user/user.model';
import { checkEmployeeCreationValidation, checkEmployeeUpdationValidation, isAdmin, isEmployer, responseWithData, responseWithoutData } from 'src/shared/common-function';
import * as bcrypt from 'bcrypt';
import { EmployerModel } from 'src/employer/employer.model';
import { toEmployeeDto, toUserDto } from 'src/shared/mapper';
import { EmployeeCreateDto } from './dto/employee-create.dto';
import { EmployeeDto } from './dto/employee.dto';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async getAllEmployee(req: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let employeesList;
        if (isAdmin(req)) {
            employeesList = await this.employeeModel.find({ relations: ['user'] });
        } else {
            let employer = await this.employerModel.findOne({ user_id: req.user.data.id });
            if (!employer) {
                return responseWithoutData(false, "Employer doesn't exist");
            }
            employeesList = await this.employeeModel.find({
                employer_id: employer.id,
                relations: ['user']
            });
        }
        return responseWithData(true, "Data Retreived Successfully.", employeesList.map(employee => toEmployeeDto(employee)));
    }

    async getOneEmployee(req: any, id: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let employee;
        try {
            employee = await this.employeeModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        return responseWithData(true, "Data Retreived Successfully.", toEmployeeDto(employee));
    }

    async createEmployee(
        req: any,
        createEmployeeDto: EmployeeCreateDto
    ): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        const { name, email, address, country, password, employer_id, designation, employement_type } = createEmployeeDto;
        let validation = checkEmployeeCreationValidation(createEmployeeDto);
        if (!validation.success) {
            return validation;
        }
        const userInDb = await this.userModel.findOne({
            email: email
        });
        if (userInDb) {
            return responseWithoutData(false, "User already exists");
        }
        let employer;
        if (isAdmin(req)) {
            try {
                employer = await this.employerModel.findOne({ _id: employer_id });
            }
            catch (err) {
                return responseWithoutData(false, "Employer doesn't exist");
            }

        }
        else {
            try {
                employer = await this.employerModel.findOne({ user_id: req.user.data.id });
            }
            catch (err) {
                return responseWithoutData(false, "Employer doesn't exist");
            }
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        const newUser = new this.userModel({
            name: name,
            email: email,
            country: country,
            role: "employee",
            password: await bcrypt.hash(password, 10),
        });
        await newUser.save();
        const newEmployee = new this.employeeModel({
            name: name,
            designation: designation,
            employement_type: employement_type,
            employer_id: employer['id'],
            employer_name: employer['name'],
            user_id: newUser.id,
            address: address,
            country: country,
            user: toUserDto(newUser)
        })
        await newEmployee.save();
        return responseWithData(true, "Employee Created Successfully", toEmployeeDto(newEmployee));
    }

    async updateEmployee(req: any, id: string, employeeDto: EmployeeDto): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        const { name, address, country, designation, employement_type, employer_id } = employeeDto;
        let validation = checkEmployeeUpdationValidation(id, employeeDto);
        if (!validation.success) {
            return validation;
        }
        let employer;
        if (isAdmin(req)) {
            try {
                employer = await this.employerModel.findOne({ _id: employer_id });
            }
            catch (err) {
                return responseWithoutData(false, "Employer doesn't exist");
            }

        }
        else {
            try {
                employer = await this.employerModel.findOne({ user_id: req.user.data.id });
            }
            catch (err) {
                return responseWithoutData(false, "Employer doesn't exist");
            }
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        let employee;
        try {
            employee = await this.employeeModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        if (isEmployer(req) && employee && employee.employer_id != employer.id) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        await this.employeeModel.updateOne({ _id: id }, {
            name: name,
            designation: designation,
            employement_type: employement_type,
            address: address,
            country: country
        });
        await this.userModel.updateOne({
            email: employee.user.email,
        }, {
            name: name,
            country: country
        });

        employee = await this.employeeModel.findById(id);
        return responseWithData(true, "Employee Updated Successfully", toEmployeeDto(employee));
    }

    async destoryEmployee(req: any, id: string): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let employee;
        try {
            employee = await this.employeeModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        await this.employeeModel.deleteOne({
            _id: id,
            relations: ['user'],
        });
        await this.userModel.deleteOne({
            email: employee.user.email,
        });
        return responseWithoutData(true, "Employee Deleted Successfully");
    }

    private async checkEmployerExist(req: any) {
        const checkEmployer = await this.employerModel.findOne({ user_id: req.user.data.id });
        if (checkEmployer) {
            return true;
        } else {
            return false;
        }
    }
}
