import { Strategy } from 'passport-jwt';
import { UserDto } from 'src/user/dto/user.dto';
import { AuthService } from './auth.service';
import { JwtPayload } from './interfaces/payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
    validate(payload: JwtPayload): Promise<UserDto>;
}
export {};
