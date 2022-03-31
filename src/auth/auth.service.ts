import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginStatus } from './interfaces/login.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(userDto: CreateDto): Promise<any> {
        let status: any;
        status = await this.userService.create(userDto);
        return status;
    }

    async login(loginUserDto: LoginDto): Promise<any> {
        // find user in db
        let status = {
            success: false,
            message: "",
            data: {
                user: {},
                token: {}
            }
        };
        const userStatus = await this.userService.findByLogin(loginUserDto);
        if (!userStatus.success) {
            return userStatus;
        }
        // generate and sign token
        const token = this._createToken(userStatus);

        const userDetail: UserDto = {
            id: userStatus.data.id,
            name: userStatus.data.name,
            email: userStatus.data.email,
            role: userStatus.data.role,
            country: userStatus.data.country,

        };
        status.success = userStatus.success;
        status.message = userStatus.message;
        status.data.user = userDetail;
        status.data.token = token;
        return status;
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findByPayload(payload);
        let status = {
            success: false,
            message: "",
            data: {}
        };
        if (!user) {
            status.message = "Unauthorized";
            return status;
        }
        status.success = true;
        status.message = "User retreived successfully";
        status.data = user;
        return status;
    }

    private _createToken({ email }: UserDto): any {
        const expiresIn = process.env.EXPIRESIN;

        const user: JwtPayload = { email };
        const accessToken = this.jwtService.sign(user);
        const type = "Bearer";
        return {
            type,
            expiresIn,
            accessToken,
        };
    }
}
