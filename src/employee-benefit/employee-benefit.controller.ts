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
    @Get("available")
    async findAll(
        @Req() req: any
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.employeeBenefitService.getAvailableBenefits(req);
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
    @Get()
    async findOne(
        @Req() req: any,
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.employeeBenefitService.getEmployeeBenefitsList(req);
    }
}
