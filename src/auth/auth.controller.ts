import {
    Controller,
    Body,
    Post,
    HttpException,
    HttpStatus,
    UsePipes,
    Get,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { LoginStatus } from './interfaces/login.interface';
import { JwtPayload } from './interfaces/payload.interface';
import { RegistrationStatus } from './interfaces/registration.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')
    public async register(
        @Body() createUserDto: CreateDto,
    ): Promise<any> {
        return await this.authService.register(
            createUserDto,
        );
    }

    @Post('login')
    public async login(@Body() loginUserDto: LoginDto): Promise<any> {
        return await this.authService.login(loginUserDto);
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    public async testAuth(@Req() req: any): Promise<any> {
        return req.user;
    }
}
