import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) { 
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRETKEY,
        });  
    }
    
    async validate(payload: JwtPayload): Promise<UserDto> {
        const result = await this.authService.validateUser(payload);
        return result;  
    }
}