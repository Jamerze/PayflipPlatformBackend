import { JwtService } from '@nestjs/jwt';
import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interfaces/login.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration.interface';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    register(userDto: CreateDto): Promise<RegistrationStatus>;
    login(loginUserDto: LoginDto): Promise<LoginStatus>;
    validateUser(payload: JwtPayload): Promise<UserDto>;
    private _createToken;
}
