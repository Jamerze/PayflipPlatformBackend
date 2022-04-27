import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { isAdmin, isEmployee, isEmployer, notAuthorize, responseWithoutData } from 'src/shared/common-function';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService,
    ) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async dashboard(
        @Req() req: any,
    ): Promise<any> {
        if(req.user.success == false){
            return req.user;
        }
        if (isAdmin(req)) {
            return await this.dashboardService.getAdminDashboard();
        } else if (isEmployer(req)) {
            return await this.dashboardService.getEmployerDashboard();
        } else if (isEmployee(req)) {
            return await this.dashboardService.getEmployeeDashboard();
        } else {
            return responseWithoutData(false, "Unauthorized")
        }
    }
}
