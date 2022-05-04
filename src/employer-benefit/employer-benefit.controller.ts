import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isEmployer, notAuthorize } from 'src/shared/common-function';
import { EmployerBenefitCreateDto } from './dto/employer-benefit.create.dto';
import { EmployerBenefitService } from './employer-benefit.service';

@Controller('employer-benefit')
export class EmployerBenefitController {
    constructor(
        private readonly employerBenefitService: EmployerBenefitService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Req() req: any
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employerBenefitService.getEmployerBenefits(req);
    }

    @UseGuards(JwtAuthGuard)
    @Get('country')
    async findOne(
        @Req() req: any
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employerBenefitService.getEmployersCountryBenefits(req);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() employerBenefitCreateDto: EmployerBenefitCreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.employerBenefitService.addEmployerBenefits(req, employerBenefitCreateDto);
    }
}
