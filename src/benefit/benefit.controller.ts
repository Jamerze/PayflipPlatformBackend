import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isAdmin, notAuthorize } from 'src/shared/common-function';
import { BenefitService } from './benefit.service';
import { BenefitCreateDto } from './dto/benefit.create.dto';
import { BenefitDto } from './dto/benefit.dto';

@Controller('benefit')
export class BenefitController {
    constructor(
        private readonly benefitService: BenefitService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async findAll(
        @Req() req: any
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        // if (!isAdmin(req)) {
        //     return notAuthorize();
        // }
        return await this.benefitService.getAllBenefits();
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
        return await this.benefitService.getOneBenefit(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() benefitCreateDto: BenefitCreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.benefitService.createBenefit(benefitCreateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(
        @Req() req: any,
        @Param("id") id: string,
        @Body() benefitDto: BenefitDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isAdmin(req)) {
            return notAuthorize();
        }
        return await this.benefitService.updateBenefit(id, benefitDto);
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
        return await this.benefitService.destoryBenefit(id);
    }
}
