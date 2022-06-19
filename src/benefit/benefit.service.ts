import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { checkBenefitUpdationValidation, checkBenefitValidation, responseWithData, responseWithoutData } from 'src/shared/common-function';
import { toBenefitDto } from 'src/shared/mapper';
import { BenefitModel } from './benefit.model';
import { BenefitCreateDto } from './dto/benefit.create.dto';
import { BenefitDto } from './dto/benefit.dto';

@Injectable()
export class BenefitService {
    constructor(
        @InjectModel("Benefit") private benefitModel: Model<BenefitModel>,
    ) { }

    async getAllBenefits(): Promise<any> {
        const benefitsList = await this.benefitModel.find().sort({"_id":-1});
        return responseWithData(true, "Data Retreived Successfully.", benefitsList.map(benefit => toBenefitDto(benefit)));
    }

    async getOneBenefit(id: string): Promise<any> {
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let benefit;  
        try {
            benefit = await this.benefitModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        if (!benefit) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        return responseWithData(true, "Data Retreived Successfully.", toBenefitDto(benefit));
    }

    async createBenefit(
        createBenefitDto: BenefitCreateDto
    ): Promise<any> {
        const { name, cost, country, description, imageUrl } = createBenefitDto;
        let validation = checkBenefitValidation(createBenefitDto);
        if (!validation.success) {
            return validation;
        }
        const newBenefit = new this.benefitModel({
            name: name,
            cost: cost,
            country: country,
            description: description,
            imageUrl: imageUrl
        });
        await newBenefit.save();
        return responseWithData(true, "Benefit Created Successfully", toBenefitDto(newBenefit));
    }

    async updateBenefit(id: string, benefitDto: BenefitDto): Promise<any> {
        const { name, cost, country, description, imageUrl } = benefitDto;
        let validation = checkBenefitUpdationValidation(id, benefitDto);
        if (!validation.success) {
            return validation;
        }
        let benefit;  
        try {
            benefit = await this.benefitModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        if (!benefit) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        await this.benefitModel.updateOne({ _id: id }, {
            name: name,
            cost: cost,
            country: country,
            description: description,
            imageUrl: imageUrl,
        });

        benefit = await this.benefitModel.findById(id);
        return responseWithData(true, "Benefit Updated Successfully", toBenefitDto(benefit));
    }

    async destoryBenefit(id: string): Promise<any> {
        if (!id || id == "") {
            return responseWithoutData(false, "ID is missing.");
        }
        let benefit;  
        try {
            benefit = await this.benefitModel.findById(id);
        }
        catch (err){
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        if (!benefit) {
            return responseWithoutData(false, "Benefit doesn't exist");
        }
        await this.benefitModel.deleteOne({
            _id: id,
        });
        return responseWithoutData(true, "Benefit Deleted Successfully");
    }
}
