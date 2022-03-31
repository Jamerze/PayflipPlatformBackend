import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toUserDto } from 'src/shared/mapper';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/create.dto';
import { EmployerModel } from 'src/employer/employer.model';

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
        let status = {
            success: false,
            message: "",
            data: {}
        };
        if (!email || email == "") {
            status.message = "Email is required."
        }
        else if (!password || password == "") {
            status.message = "Password is required."
        }
        else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            status.message = "Email is not valid."
        }
        else if (password.length < 8) {
            status.message = "Password length should be atleast 8."
        }
        if (status.message != "") {
            return status;
        }
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            status.message = "User not found"
            return status;
        }

        // compare passwords
        const areEqual = await bcrypt.compare(password, user.password);

        if (!areEqual) {
            status.message = "Invalid credentials"
            return status;
        }

        status.success = true;
        status.message = "User LoggedIn Successfully";
        status.data = toUserDto(user);
        return status;
    }

    async findByPayload({ email }: any): Promise<any> {
        return await this.findOne({
            email: email
        });
    }

    async create(userDto: CreateDto): Promise<any> {
        const { name, company_name, email, address, password, country } = userDto;
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
        else if (!password || password == "") {
            status.message = "Password is required."
        }
        else if (!country || country == "") {
            status.message = "Country is required."
        }
        else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            status.message = "Email is not valid."
        }
        else if (password.length < 8) {
            status.message = "Password length should be atleast 8."
        }

        if (status.message != "") {
            return status;
        }

        // check if the user exists in the db    
        const userInDb = await this.userModel.findOne({
            email: email
        });
        if (userInDb) {
            status.message = "User already exists"
            return status;
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
        status.success = true;
        status.message = "User registered successfully";
        status.data = toUserDto(newUser);
        return status;
    }
}
