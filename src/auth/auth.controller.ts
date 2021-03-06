import {
    Controller,
    Body,
    Post,
    Get,
    Req,
    UseGuards,
    Put,
} from '@nestjs/common';
import { CreateDto } from 'src/user/dto/create.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

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

    @UseGuards(JwtAuthGuard)
    @Get('whoami')
    public async testAuth(@Req() req: any): Promise<any> {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Get('refreshToken')
    public async refreshToken(@Req() req: any): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.refreshToken(req);
    }

    @Get('validate')
    @UseGuards(JwtAuthGuard)
    public async validate(@Req() req: any): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.validate(req);
    }

    @Get('role')
    @UseGuards(JwtAuthGuard)
    public async role(@Req() req: any): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.getRole(req);
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    public async profile(@Req() req: any): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.getProfile(req);
    }

    @UseGuards(JwtAuthGuard)
    @Put("updateProfile")
    public async updateProfile(@Req() req: any, @Body() createUserDto: CreateDto): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.updateProfile(req, createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put("updatePassword")
    public async updatePassword(@Req() req: any, @Body() passwords: any): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        return await this.authService.updatePassword(req, passwords);
    }
}
