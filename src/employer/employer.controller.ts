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
import { toPromise } from 'src/shared/utils';
import { CreateDto } from 'src/user/dto/create.dto';
import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerListDto } from './dto/employer.list.dto';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
    constructor(private readonly employerService: EmployerService) { }

    @Get()
    async findAll(): Promise<any> {
        const employers = await this.employerService.getAllEmployer();
        return employers;
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<any> {
        return await this.employerService.getOneEmployer(id);
    }

    @Post()
    async create(@Body() employerCreateDto: CreateDto): Promise<any> {
        return await this.employerService.createEmployer(employerCreateDto);
    }

    @Put(":id")
    async update(
        @Param("id") id: string,
        @Body() employerDto: EmployerDto
    ): Promise<any> {
        return await this.employerService.updateEmployer(id, employerDto);
    }

    @Delete(":id")
    async destory(@Param("id") id: string): Promise<any> {
        return await this.employerService.destoryEmployer(id);
    }
}
