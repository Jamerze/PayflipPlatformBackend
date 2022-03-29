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
        const user = await this.userModel.findOne({ email: email });

        let status = {
            success : false,
            message : "",
            data : {}
        };
        if (!user) {
            status.success = false;
            status.message = "User not found"
            return status;
        }

        // compare passwords
        const areEqual = await bcrypt.compare(password, user.password);

        if (!areEqual) {
            status.success = false;
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
            where: { email }
        });
    }

    async create(userDto: CreateDto): Promise<any> {
        const { name, company_name, email, address, password, country } = userDto;

        // check if the user exists in the db    
        const userInDb = await this.userModel.findOne({
            email: email
        });
        let status = {
            success : false,
            message : "",
            data : {}
        };
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
        status.data  = toUserDto(newUser);
        return status;
    }
}
