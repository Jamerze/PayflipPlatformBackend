import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitModel } from 'src/benefit/benefit.model';
import { EmployeeModel } from 'src/employee/employee.model';
import { EmployerBenefitModel } from 'src/employer-benefit/employer-benefit.model';
import { checkBuyBenefitValidation, isEmployee, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { toEmployeeBenefitDto, toEmployerBenefitDto } from 'src/shared/mapper';
import { TotalBudgetModel } from 'src/total-budget/total-budget.model';
import { EmployeeBenefitCreateDto } from './dto/employee-benefit.create.dto';
import { EmployeeBenefitModel } from './employee-benefit.model';

@Injectable()
export class EmployeeBenefitService {
    constructor(
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>,
        @InjectModel("EmployeeBenefit") private employeeBenefitModel: Model<EmployeeBenefitModel>,
        @InjectModel("EmployerBenefit") private employerBenefitModel: Model<EmployerBenefitModel>,
        @InjectModel("TotalBudget") private totalBudgetModel: Model<TotalBudgetModel>,
    ) { }

    async getAvailableBenefits(req: any): Promise<any> {
        let employee = await this.employeeModel.findOne({ user_id: req.user.data.id });
        if (!employee) {
            return responseWithoutData(false, "Invalid Employee");
        }
        let benefitsList = await this.employerBenefitModel.find({
            employer_id: employee.employer_id
        }).sort({"_id":-1});
        return responseWithData(true, "Benefits Retreived Successfully.", benefitsList.map(employerBenefits => toEmployerBenefitDto(employerBenefits)));
    }

    async buyBenefit(req: any, employeeBenefitCreateDto: EmployeeBenefitCreateDto): Promise<any> {
        const { benefit_id } = employeeBenefitCreateDto;
        let validation = checkBuyBenefitValidation(employeeBenefitCreateDto);
        if (!validation.success) {
            return validation;
        }
        let employee = await this.employeeModel.findOne({ user_id: req.user.data.id });
        if (!employee) {
            return responseWithoutData(false, "Invalid Employee");
        }
        let benefit;
        try {
            benefit = await this.benefitModel.findById(benefit_id);
        }
        catch (err) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        if (!benefit) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        const getEmployeeTotalBudget = await this.totalBudgetModel.findOne({ employee_id: employee.id });
        if (!getEmployeeTotalBudget || (getEmployeeTotalBudget && (parseInt(getEmployeeTotalBudget.amount) < parseInt(benefit.cost)))) {
            return responseWithoutData(false, "Not enough budget to buy this benefit");
        }
        let imageUrl = `${process.env.REACT_APP_BASE_URL}/default.png`;
        if(benefit && benefit.imageUrl){
            imageUrl = benefit.imageUrl
        }
        const newEmployeeBenefit = new this.employeeBenefitModel({
            employee_id: employee.id,
            benefit_id: benefit_id,
            benefit_name: benefit.name,
            benefit_cost: benefit.cost,
            benefit_description: benefit.description,
            imageUrl: imageUrl,
            date_added: Date.now()
        });
        await newEmployeeBenefit.save();
        let totalBudgetAmount = parseInt(getEmployeeTotalBudget.amount) - parseInt(benefit.cost);
        await this.totalBudgetModel.updateOne({ employee_id: employee.id }, {
            amount: totalBudgetAmount,
        });
        return responseWithData(true, "Benefit Bought Successfully.", toEmployeeBenefitDto(newEmployeeBenefit));
    }

    async getEmployeeBenefitsList(req: any): Promise<any> {
        let employee = await this.employeeModel.findOne({ user_id: req.user.data.id });
        if (!employee) {
            return responseWithoutData(false, "Invalid Employee");
        }
        let benefitsList = await this.employeeBenefitModel.find({
            employee_id: employee.id
        }).sort({"_id":-1});
        return responseWithData(true, "Employee Benefits Retreived Successfully.", benefitsList.map(employeeBenefits => toEmployeeBenefitDto(employeeBenefits)));
    }
}
