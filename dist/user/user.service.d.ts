import { Model } from 'mongoose';
import { LoginDto } from './dto/login.dto';
import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';
import { CreateDto } from './dto/create.dto';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserModel>);
    findOne(options?: object): Promise<UserDto>;
    findByLogin({ email, password }: LoginDto): Promise<UserDto>;
    findByPayload({ email }: any): Promise<UserDto>;
    create(userDto: CreateDto): Promise<UserDto>;
}
