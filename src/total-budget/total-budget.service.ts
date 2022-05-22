import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EmployeeModel } from 'src/employee/employee.model';
import { isEmployee, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { toTotalBudgetDto } from 'src/shared/mapper';
import { TotalBudgetModel } from './total-budget.model';

@Injectable()
export class TotalBudgetService {
    constructor(
        @InjectModel("TotalBudget") private totalBudgetModel: Model<TotalBudgetModel>,
        @InjectModel("Employee") private employeeModel: Model<EmployeeModel>
    ) { }

    async getBudget(req: any): Promise<any> {
        let employee = await this.employeeModel.findOne({user_id: req.user.data.id});
        if (!employee) {
            return responseWithoutData(false, "Employee doesn't exist");
        }
        let totalBudgetList;
        totalBudgetList = await this.totalBudgetModel.find({
            employee_id: employee.id
        });
        return responseWithData(true, "Data Retreived Successfully.", totalBudgetList.map(totalBudget => toTotalBudgetDto(totalBudget)));
    }
}
