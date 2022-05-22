import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isEmployee, notAuthorize } from 'src/shared/common-function';
import { EmployeeBenefitCreateDto } from './dto/employee-benefit.create.dto';
import { EmployeeBenefitService } from './employee-benefit.service';

@Controller('employee-benefit')
export class EmployeeBenefitController {
    constructor(
        private readonly employeeBenefitService: EmployeeBenefitService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get("available-benefits/:employee_id")
    async findAll(
        @Req() req: any,
        @Param("employee_id") employee_id: string
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.employeeBenefitService.getAvailableBenefits(req, employee_id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() employeeBenefitCreateDto: EmployeeBenefitCreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.employeeBenefitService.buyBenefit(req, employeeBenefitCreateDto);
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
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.employeeBenefitService.getEmployeeBenefitsList(req, id);
    }
}
