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
        }).sort({"_id":-1});
        return responseWithData(true, "Benefits Retreived Successfully.", benefitsList.map(benefit => toBenefitDto(benefit)));
    }

    async getEmployerBenefits(req: any): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let employer = await this.employerModel.findOne({ user_id: req.user.data.id });
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        let employerBenefitsList = await this.employerBenefitModel.find({
            employer_id: employer.id
        }).sort({"_id":-1});
        return responseWithData(true, "Employer Benefits Retreived Successfully.", employerBenefitsList.map(employerBenefits => toEmployerBenefitDto(employerBenefits)));
    }

    async addEmployerBenefits(req: any, employerBenefitCreate: EmployerBenefitCreateDto): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        let employer = await this.employerModel.findOne({ user_id: req.user.data.id });
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        const { benefit_id } = employerBenefitCreate;
        let benefit = await this.benefitModel.findOne({ _id: benefit_id });
        if (!benefit) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        let imageUrl = `${process.env.REACT_APP_BASE_URL}/default.png`;
        if(benefit && benefit.imageUrl){
            imageUrl = benefit.imageUrl
        }
        const newEmployerBenefit = new this.employerBenefitModel({
            employer_id: employer.id,
            benefit_id: benefit_id,
            benefit_name: benefit.name,
            benefit_cost: benefit.cost,
            benefit_description: benefit.description,
            imageUrl: benefit.imageUrl
        });
        await newEmployerBenefit.save();
        return responseWithData(true, "Employer Benefits Added Successfully", toEmployerBenefitDto(newEmployerBenefit));
    }

    async destoryEmployerBenefit(req: any, id: string): Promise<any> {
        if (isEmployer(req) && !this.checkEmployerExist(req)) {
            return responseWithoutData(false, "Invalid Employer");
        }
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let employer;
        try {
            employer = await this.employerModel.findOne({ user_id: req.user.data.id });
        }
        catch (err) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        if (!employer) {
            return responseWithoutData(false, "Employer doesn't exist");
        }
        let employerBenefit;
        try {
            employerBenefit = await this.employerBenefitModel.findById(id);
        }
        catch (err) {
            return responseWithoutData(false, "Employer Benefit doesn't exist");
        }
        if (!employerBenefit) {
            return responseWithoutData(false, "Employer Benefit doesn't exist");
        }
        await this.employerBenefitModel.deleteOne({
            _id: id,
        });
        return responseWithoutData(true, "Employer Benefit Deleted Successfully");
    }

    private async checkEmployerExist(req: any) {
        const checkEmployer = await this.employerModel.findOne({ user_id: req.user.data.id });
        if (checkEmployer) {
            return true;
        } else {
            return false;
        }
    }
}
