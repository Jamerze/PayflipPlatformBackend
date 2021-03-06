import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { responseWithData, responseWithoutData } from 'src/shared/common-function';
import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserDto } from 'src/user/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './interfaces/payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async register(userDto: CreateDto): Promise<any> {
        return await this.userService.create(userDto);
    }

    async login(loginUserDto: LoginDto): Promise<any> {
        let response = await this.userService.findByLogin(loginUserDto);
        if(!response.success){
            return response;
        }
        const token = this._createToken(response.data.user);
        return responseWithData(true, "User LoggedIn Successfully", {user: response.data.user, token: token});
    }

    async validateUser(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            return responseWithoutData(false, "Unauthorized");
        }
        return responseWithData(true, "User retreived successfully", user);
    }

    async refreshToken(req: any): Promise<any> {
        const token = this._createToken(req.user.data);
        return responseWithData(true, "Token Refreshed Successfully", {user: req.user.data, token: token});
    }

    async validate(req: any): Promise<any> {
        return responseWithoutData(true, "Authorized");
    }

    async getRole(req: any): Promise<any> {
        return responseWithData(true, "Role retreived successfuly", req.user.data.role);
    }

    async getProfile(req: any): Promise<any> {
        return responseWithData(true, "Profile retreived successfuly", req.user.data);
    }

    async updateProfile(req: any, userDto: CreateDto): Promise<any> {
        return await this.userService.update(req, userDto);
    }

    async updatePassword(req: any, passwordData: any): Promise<any> {
        return await this.userService.updatePassword(req, passwordData);
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
