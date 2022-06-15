import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitModel, BenefitSchema } from 'src/benefit/benefit.model';
import { BudgetModel } from 'src/budget/budget.model';
import { EmployeeBenefitModel } from 'src/employee-benefit/employee-benefit.model';
import { EmployeeModel } from 'src/employee/employee.model';
import { EmployerBenefitModel } from 'src/employer-benefit/employer-benefit.model';
import { EmployerModel } from 'src/employer/employer.model';
import { responseWithData, responseWithoutData } from 'src/shared/common-function';
import { TotalBudgetModel } from 'src/total-budget/total-budget.model';
import { UserModel } from 'src/user/user.model';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
        @InjectModel("EmployerBenefit") private employerBenefitModel: Model<EmployerBenefitModel>,
        @InjectModel("EmployeeBenefit") private employeeBenefitModel: Model<EmployeeBenefitModel>,
        @InjectModel("Budget") private budgetModel: Model<BudgetModel>,
        @InjectModel("TotalBudget") private totalBudgetModel: Model<TotalBudgetModel>,
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
        const employeesCount = await this.employeeModel.count({ employer_id: employer.id });
        const countryBenefitsCount = await this.benefitModel.count({ country: employer.country });
        const employerBenefitsCount = await this.employerBenefitModel.count({ employer_id: employer.id });
        const employerBudget = await this.budgetModel.find({ employer_id: employer.id });
        let employerTotalBudgetAssigned = 0;
        if (employerBudget && employerBudget.length > 0) {
            employerBudget.map((budget) => (
                employerTotalBudgetAssigned = employerTotalBudgetAssigned + parseInt(budget.amount)
            ))
        }
        let dashboardData = {
            total_country_benefits: countryBenefitsCount,
            total_employees: employeesCount,
            total_employer_benefits: employerBenefitsCount,
            total_employer_budget_assigned: employerTotalBudgetAssigned
        };
        return responseWithData(true, "Data Retreived Successfully.", dashboardData);
    }

    async getEmployeeDashboard(req: any): Promise<any> {
        let employee = await this.employeeModel.findOne({ user_id: req.user.data.id });
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        const budgetAssigned = await this.budgetModel.find({ employee_id: employee.id });
        let totalBudgetAssigned = 0;
        if (budgetAssigned && budgetAssigned.length > 0) {
            budgetAssigned.map((budget) => (
                totalBudgetAssigned = totalBudgetAssigned + parseInt(budget.amount)
            ))
        }
        const totalBenefitsAvailable = await this.employerBenefitModel.count({ employer_id: employee.employer_id });
        const employeeBenefitsCount = await this.employeeBenefitModel.count({ employee_id: employee.id });
        const totalBudgetData = await this.totalBudgetModel.findOne({ employee_id: employee.id });
        let totalBudgetLeft = 0;
        if (totalBudgetData) {
            totalBudgetLeft = parseInt(totalBudgetData.amount);
        }
        const employeeBenefitsData = await this.employeeBenefitModel.find({ employee_id: employee.id });
        let totalBudgetSpent = 0;
        if (employeeBenefitsData && employeeBenefitsData.length > 0) {
            employeeBenefitsData.map((benefit) => (
                totalBudgetSpent = totalBudgetSpent + parseInt(benefit.benefit_cost)
            ))
        }
        let dashboardData = {
            total_budget_assigned: totalBudgetAssigned,
            total_budget_left: totalBudgetLeft,
            total_budget_spent: totalBudgetSpent,
            total_benefits_available: totalBenefitsAvailable,
            total_benefits_ordered: employeeBenefitsCount
        };
        return responseWithData(true, "Data Retreived Successfully.", dashboardData);
    }
}
