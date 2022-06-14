import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitModel, BenefitSchema } from 'src/benefit/benefit.model';
import { BudgetModel } from 'src/budget/budget.model';
import { EmployeeModel } from 'src/employee/employee.model';
import { EmployerBenefitModel } from 'src/employer-benefit/employer-benefit.model';
import { EmployerModel } from 'src/employer/employer.model';
import { responseWithData, responseWithoutData } from 'src/shared/common-function';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
        @InjectModel("EmployerBenefit") private employerBenefitModel: Model<EmployerBenefitModel>,
        @InjectModel("Budget") private budgetModel: Model<BudgetModel>,
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

    async getEmployerDashboard(req: any): Promise<any> {
        let employer = await this.employerModel.findOne({ user_id: req.user.data.id });
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        const employeesCount = await this.employeeModel.count({employer_id: employer.id});
        const countryBenefitsCount = await this.benefitModel.count({country: employer.country});
        const employerBenefit = await this.employerBenefitModel.findOne({employer_id: employer.id});
        const employerTotalBudgetAssigned= await this.budgetModel.count({employer_id: employer.id});
        let employerBenefitsCount = 0;
        if(employerBenefit){
            employerBenefitsCount = employerBenefit.benefits.length;
        }
        let dashboardData = {
            total_country_benefits: countryBenefitsCount,
            total_employees: employeesCount,
            total_employer_benefits: employerBenefitsCount,
            total_employer_budget_assigned: employerTotalBudgetAssigned
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
