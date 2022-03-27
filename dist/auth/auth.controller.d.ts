import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateDto): Promise<RegistrationStatus>;
    login(loginUserDto: LoginDto): Promise<LoginStatus>;
    testAuth(req: any): Promise<JwtPayload>;
}
