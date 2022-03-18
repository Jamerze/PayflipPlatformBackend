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

    async register(userDto: CreateDto): Promise<RegistrationStatus> {
        let status: RegistrationStatus = {
            success: true,
            message: 'user registered',
        };

        try {
            await this.userService.create(userDto);
        } catch (err) {
            status = {
                success: false,
                message: err,
            };
        }

        return status;
    }

    async login(loginUserDto: LoginDto): Promise<LoginStatus> {
        // find user in db
        const user = await this.userService.findByLogin(loginUserDto);

        // generate and sign token
        const token = this._createToken(user);

        const userDetail: UserDto = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            country: user.country,

        };

        return {
            user: userDetail,
            ...token,
        };
    }

    async validateUser(payload: JwtPayload): Promise<UserDto> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }
        return user;
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
