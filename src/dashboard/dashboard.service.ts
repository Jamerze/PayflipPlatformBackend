import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitModel } from 'src/benefit/benefit.model';
import { EmployeeModel } from 'src/employee/employee.model';
import { EmployerModel } from 'src/employer/employer.model';
import { responseWithData } from 'src/shared/common-function';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async getAdminDashboard(): Promise<any> {
        const employersCount = await this.employerModel.count();
        const employeesCount = await this.employeeModel.count();
        const benefitsCount = await this.benefitModel.count();
        const usersCount = await this.userModel.count();
        let dashboardData = {
            total_users: usersCount,
            total_employers: employersCount,
            total_employees: employeesCount,
            total_benefits: benefitsCount
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
