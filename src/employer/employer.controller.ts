import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Put,
    Delete,
    UsePipes,
    UseGuards,
    Req,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isAdmin, notAuthorize } from 'src/shared/common-function';
import { CreateDto } from 'src/user/dto/create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
    constructor(
        private readonly employerService: EmployerService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Req() req: any
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.employerService.getAllEmployer();
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.employerService.getOneEmployer(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() employerCreateDto: CreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.employerService.createEmployer(employerCreateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(
        @Req() req: any,
        @Param("id") id: string,
        @Body() employerDto: EmployerDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.employerService.updateEmployer(id, employerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async destory(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.employerService.destoryEmployer(id);
    }
}
