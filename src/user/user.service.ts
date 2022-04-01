import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toUserDto } from 'src/shared/mapper';
import { LoginDto } from './dto/login.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/create.dto';
import { EmployerModel } from 'src/employer/employer.model';
import { checkLoginValidation, checkRegistrationValidation, responseWithData, responseWithoutData } from 'src/shared/common-function';

@Injectable()
export class UserService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async findOne(options?: object): Promise<any> {
        const user = await this.userModel.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ email, password }: LoginDto): Promise<any> {
        let validate = checkLoginValidation(email, password);
        
        if (!validate.success) {
            return validate;
        }
        const userData = await this.userModel.findOne({ email: email });
        if (!userData) {
            return responseWithoutData(false, "User not found");
        }
        const areEqual = await bcrypt.compare(password, userData.password);

        if (!areEqual) {
            return responseWithoutData(false, "Invalid credentials");
        }
        return responseWithData(true, "User LoggedIn Successfully", {user: toUserDto(userData)});
    }

    async findByPayload({ email }: any): Promise<any> {
        return await this.findOne({
            email: email
        });
    }

    async create(userDto: CreateDto): Promise<any> {
        const { name, company_name, email, address, password, country } = userDto;
        let validate = checkRegistrationValidation(userDto);
        if (!validate.success) {
            return validate;
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
            address: address,
            country: country,
            user: toUserDto(newUser)
        })
        await newEmployer.save();
        return responseWithData(true, "User registered successfully", toUserDto(newUser));
    }
}
