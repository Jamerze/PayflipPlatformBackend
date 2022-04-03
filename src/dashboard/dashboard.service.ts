import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployerModel } from 'src/employer/employer.model';
import { responseWithData } from 'src/shared/common-function';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
    ) { }

    async getAdminDashboard(): Promise<any> {
        const employersList = await this.employerModel.count({ relations: ['user'] });
        let dashboardData = {
            total_employers: employersList,
            total_employees: 20,
            total_salary_used: 2000
        };
        return responseWithData(true, "Data Retreived Successfully.", dashboardData);
    }

    async getEmployerDashboard(): Promise<any> {
        let dashboardData = {
            total_benefits: 10,
            total_employees: 20,
            total_salary_used: 2000
        };
        return responseWithData(true, "Data Retreived Successfully.", dashboardData);
    }
    
    async getEmployeeDashboard(): Promise<any> {
        let dashboardData = {
            total_spendable_amount: 1400,
            total_benefits_ordered: 20,
            saved_on_taxes: 2000
        };
        return responseWithData(true, "Data Retreived Successfully.", dashboardData);
    }
}
