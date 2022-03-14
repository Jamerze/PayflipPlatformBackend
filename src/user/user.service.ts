import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toUserDto } from 'src/shared/mapper';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';
import * as bcrypt from 'bcrypt';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async findOne(options?: object): Promise<UserDto> {
        const user = await this.userModel.findOne(options);
        return toUserDto(user);
    }

    async findByLogin({ email, password }: LoginDto): Promise<UserDto> {
        const user = await this.userModel.findOne({ where: { email } });

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
        }

        // compare passwords
        let areEqual = false;
        if(password == user.password){
            areEqual = true;
        }

        if (!areEqual) {
            throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
        }

        return toUserDto(user);
    }

    async findByPayload({ email }: any): Promise<UserDto> {
        return await this.findOne({
            where: { email }
        });
    }

    async create(userDto: CreateDto): Promise<UserDto> {
        const { username, password, email } = userDto;

        // check if the user exists in the db    
        const userInDb = await this.userModel.findOne({
            where: { email }
        });
        if (userInDb) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }
        const newUser = new this.userModel({
            username: username,
            email: email,
            password: password,
        })
        await newUser.save();
        return toUserDto(newUser);
    }
}
