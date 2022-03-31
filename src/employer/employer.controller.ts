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
import { isAdmin } from 'src/shared/mapper';
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
        if (!isAdmin(req)) {
            return this.notAuthorize();
        }
        const employers = await this.employerService.getAllEmployer();
        return employers;
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if (!isAdmin(req)) {
            return this.notAuthorize();
        }
        return await this.employerService.getOneEmployer(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() employerCreateDto: CreateDto
    ): Promise<any> {
        if (!isAdmin(req)) {
            return this.notAuthorize();
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
        if (!isAdmin(req)) {
            return this.notAuthorize();
        }
        return await this.employerService.updateEmployer(id, employerDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async destory(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if (!isAdmin(req)) {
            return this.notAuthorize();
        }
        return await this.employerService.destoryEmployer(id);
    }

    private async notAuthorize() {
        let status = {
            success: false,
            message: "You are not authorized to access this request."
        };
        return status;
    }
}
