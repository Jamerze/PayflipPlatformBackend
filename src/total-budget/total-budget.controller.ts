import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isEmployee, notAuthorize } from 'src/shared/common-function';
import { TotalBudgetService } from './total-budget.service';

@Controller('total-budget')
export class TotalBudgetController {
    constructor(
        private readonly totalBudgetService: TotalBudgetService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    async findAll(
        @Req() req: any,
        @Param("id") id: string
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (!isEmployee(req)) {
            return notAuthorize();
        }
        return await this.totalBudgetService.getBudget(req, id);
    }
}
