import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BenefitModel } from 'src/benefit/benefit.model';
import { EmployerModel } from 'src/employer/employer.model';
import { isEmployer, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { toBenefitDto, toEmployerBenefitDto } from 'src/shared/mapper';
import { EmployerBenefitCreateDto } from './dto/employer-benefit.create.dto';
import { EmployerBenefitModel } from './employer-benefit.model';

@Injectable()
export class EmployerBenefitService { 
    constructor(
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
        @InjectModel("Employer") private employerModel: Model<EmployerModel>,
        @InjectModel("EmployerBenefit") private employerBenefitModel: Model<EmployerBenefitModel>,
    ) { }
    
    async getEmployersCountryBenefits(req: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let benefitsList = await this.benefitModel.find({
            country: req.user.data.country
        });
        return responseWithData(true, "Benefits Retreived Successfully.", benefitsList.map(benefit => toBenefitDto(benefit)));
    }

    async getEmployerBenefits(req: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let employerBenefitsList = await this.employerBenefitModel.find({
            employer_id: req.user.data.id
        });
        return responseWithData(true, "Employer Benefits Retreived Successfully.", employerBenefitsList.map(employerBenefits => toEmployerBenefitDto(employerBenefits)));
    }

    async addEmployerBenefits(req: any, employerBenefitCreate: EmployerBenefitCreateDto): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        const {employer_id, benefits} = employerBenefitCreate;
        await this.employerBenefitModel.deleteOne({
            employer_id: req.user.data.id,
        });
        const newEmployerBenefit = new this.employerBenefitModel({
            employer_id: employer_id,
            benefits: benefits
        });
        await newEmployerBenefit.save();
        return responseWithData(true, "Employer Benefits Added Successfully", toEmployerBenefitDto(newEmployerBenefit));
    }

    
    private async checkEmployerExist(req: any) {
        const checkEmployer = await this.employerModel.findById(req.user.data.id);
        if(checkEmployer) {
            return true;
        } else {
            return false;
        }
    }
}
