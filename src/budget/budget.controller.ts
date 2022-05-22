import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isEmployer, notAuthorize } from 'src/shared/common-function';
import { BudgetService } from './budget.service';
import { BudgetCreateDto } from './dto/budget.create.dto';

@Controller('budget')
export class BudgetController {
    constructor(
        private readonly budgetService: BudgetService,
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
        return await this.budgetService.getAllBudgets(req);
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
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.budgetService.getOneBudget(req, id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Req() req: any,
        @Body() budgetCreateDto: BudgetCreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.budgetService.createBudget(req, budgetCreateDto);
    }

    @UseGuards(JwtAuthGuard)
    @Put(":id")
    async update(
        @Req() req: any,
        @Param("id") id: string,
        @Body() BudgetCreateDto: BudgetCreateDto
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.budgetService.updateBudget(req, id, BudgetCreateDto);
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
        if (!isEmployer(req)) {
            return notAuthorize();
        }
        return await this.budgetService.destoryBudget(req, id);
    }
}
