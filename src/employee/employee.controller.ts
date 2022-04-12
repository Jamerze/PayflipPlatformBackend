import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isAdmin, isEmployer, notAuthorize } from 'src/shared/common-function';
import { CreateDto } from 'src/user/dto/create.dto';
import { EmployeeCreateDto } from './dto/employee-create.dto';
import { EmployeeDto } from './dto/employee.dto';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(
        private readonly employeeService: EmployeeService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Req() req: any
    ): Promise<any> {
        if (!isAdmin(req) && !isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employeeService.getAllEmployee(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findOne(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if (!isAdmin(req) && !isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employeeService.getOneEmployee(req, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() employeeCreateDto: EmployeeCreateDto
    ): Promise<any> {
        if (!isAdmin(req) && !isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employeeService.createEmployee(req, employeeCreateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(
        @Req() req: any,
        @Param("id") id: string,
        @Body() employeeDto: EmployeeDto
    ): Promise<any> {
        if (!isAdmin(req) && !isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employeeService.updateEmployee(req, id, employeeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(":id")
    async destory(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if (!isAdmin(req) && !isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employeeService.destoryEmployee(req, id);
    }
}
