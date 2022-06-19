import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeModel } from 'src/employee/employee.model';
import { EmployerModel } from 'src/employer/employer.model';
import { checkBudgetCreationValidation, checkBudgetUpdationValidation, isEmployer, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { toBudgetDto } from 'src/shared/mapper';
import { TotalBudgetModel } from 'src/total-budget/total-budget.model';
import { UserModel } from 'src/user/user.model';
import { BudgetModel } from './budget.model';
import { BudgetCreateDto } from './dto/budget.create.dto';

@Injectable()
export class BudgetService {
    constructor(
        @InjectModel("Budget") private budgetModel: Model<BudgetModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("TotalBudget") private totalBudgetModel: Model<TotalBudgetModel>,
        @InjectModel("User") private userModel: Model<UserModel>,
    ) { }

    async getAllBudgets(req: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let budgetList;
        let employer = await this.employerModel.findOne({user_id: req.user.data.id});
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        budgetList = await this.budgetModel.find({
            employer_id: employer.id,
            relations: ['employee']
        }).sort({"_id":-1});
        return responseWithData(true, "Data Retreived Successfully.", budgetList.map(budget => toBudgetDto(budget)));
    }

    async getOneBudget(req: any, id: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let budget;
        try {
            budget = await this.budgetModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        if (!budget) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        return responseWithData(true, "Data Retreived Successfully.", toBudgetDto(budget));
    }

    async createBudget(
        req: any,
        budgetCreateDto: BudgetCreateDto
    ): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        const { amount, budget_type, employee_id } = budgetCreateDto;
        let validation = checkBudgetCreationValidation(budgetCreateDto);
        if (!validation.success) {
            return validation;
        }
        let employee;
        try {
            employee = await this.employeeModel.findOne({ _id: employee_id });
        }
        catch (err) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        const newBudget = new this.budgetModel({
            amount: amount,
            budget_type: budget_type,
            employer_id: employee.employer_id,
            employee_id: employee_id,
            employee_name: employee.name,
        });
        await newBudget.save();
        let totalBudgetAmount;
        const getEmployeeTotalBudget = await this.totalBudgetModel.findOne({ employee_id: employee_id });
        if (getEmployeeTotalBudget) {
            totalBudgetAmount = parseInt(getEmployeeTotalBudget.amount) + parseInt(amount);
            await this.totalBudgetModel.updateOne({ employee_id: employee_id }, {
                amount: totalBudgetAmount,
            });
        }
        else {
            totalBudgetAmount = amount;
            const newTotalBudget = new this.totalBudgetModel({
                amount: totalBudgetAmount,
                employee_id: employee_id
            });
            await newTotalBudget.save();
        }
        return responseWithData(true, "Budget Created Successfully", toBudgetDto(newBudget));
    }

    async updateBudget(req: any, id: string, budgetCreateDto: BudgetCreateDto): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        const { amount, budget_type, employee_id } = budgetCreateDto;
        let validation = checkBudgetUpdationValidation(id, budgetCreateDto);
        if (!validation.success) {
            return validation;
        }
        let budget;
        try {
            budget = await this.budgetModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        if (!budget) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        await this.budgetModel.updateOne({ _id: id }, {
            amount: amount,
            budget_type: budget_type,
        });
        let totalBudgetAmount;
        const getEmployeeTotalBudget = await this.totalBudgetModel.findOne({ employee_id: employee_id });
        if (getEmployeeTotalBudget) {
            totalBudgetAmount = parseInt(getEmployeeTotalBudget.amount) - parseInt(budget.amount);
            totalBudgetAmount = parseInt(totalBudgetAmount) + parseInt(amount);
            await this.totalBudgetModel.updateOne({ employee_id: employee_id }, {
                amount: totalBudgetAmount,
            });
        }
        else {
            totalBudgetAmount = amount;
            const newTotalBudget = new this.totalBudgetModel({
                amount: totalBudgetAmount,
                employee_id: employee_id
            });
            await newTotalBudget.save();
        }
        budget = await this.budgetModel.findById(id);
        return responseWithData(true, "Budget Updated Successfully", toBudgetDto(budget));
    }

    async destoryBudget(req: any, id: string): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let budget;
        try {
            budget = await this.budgetModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        if (!budget) {
            return responseWithoutData(false, "Budget doesn't exist");
        }
        await this.budgetModel.deleteOne({
            _id: id
        });
        let totalBudgetAmount;
        const getEmployeeTotalBudget = await this.totalBudgetModel.findOne({ employee_id: budget.employee_id });
        if (getEmployeeTotalBudget) {
            totalBudgetAmount = parseInt(getEmployeeTotalBudget.amount) - parseInt(budget.amount);
            await this.totalBudgetModel.updateOne({ employee_id: budget.employee_id }, {
                amount: totalBudgetAmount,
            });
        }
        return responseWithoutData(true, "Budget Deleted Successfully");
    }

    private async checkEmployerExist(req: any) {
        const checkEmployer = await this.employerModel.findOne({user_id: req.user.data.id});
        if (checkEmployer) {
            return true;
        } else {
            return false;
        }
    }
}
