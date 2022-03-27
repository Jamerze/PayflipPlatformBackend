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
import { EmployerCreateDto } from './dto/employer.create.dto';
import { EmployerDto } from './dto/employer.dto';
import { EmployerListDto } from './dto/employer.list.dto';
import { EmployerService } from './employer.service';

@Controller('employer')
export class EmployerController {
    constructor(private readonly employerService: EmployerService) { }

    @Get("list")
    async findAll(): Promise<EmployerListDto> {
        const employers = await this.employerService.getAllEmployer();
        return toPromise({ employers });
    }

    @Get("detail/:id")
    async findOne(@Param("id") id: string): Promise<EmployerDto> {
        return await this.employerService.getOneEmployer(id);
    }

    @Post('create')
    async create(@Body() employerCreateDto: EmployerCreateDto): Promise<EmployerDto> {
        return await this.employerService.createEmployer(employerCreateDto);
    }

    @Put("update/:id")
    async update(
        @Param("id") id: string,
        @Body() employerDto: EmployerDto
    ): Promise<EmployerDto> {
        return await this.employerService.updateEmployer(id, employerDto);
    }

    @Delete("delete/:id")
    async destory(@Param("id") id: string): Promise<EmployerDto> {
        return await this.employerService.destoryEmployer(id);
    }
}
