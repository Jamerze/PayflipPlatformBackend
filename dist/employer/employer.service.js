"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mapper_1 = require("../shared/mapper");
let EmployerService = class EmployerService {
    constructor(employerModel) {
        this.employerModel = employerModel;
    }
    async getAllEmployer() {
        const employers = await this.employerModel.find();
        return employers.map(employer => (0, mapper_1.toEmployerDto)(employer));
    }
    async getOneEmployer(id) {
        const employer = await this.employerModel.findOne({
            where: { id },
        });
        if (!employer) {
            throw new common_1.HttpException(`Employer list doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
        }
        return (0, mapper_1.toEmployerDto)(employer);
    }
    async createEmployer(createEmployerDto) {
        const { user_id, name, address, country } = createEmployerDto;
        const newEmployer = new this.employerModel({
            user_id: user_id,
            name: name,
            address: address,
            country: country
        });
        await newEmployer.save();
        return (0, mapper_1.toEmployerDto)(newEmployer);
    }
    async updateEmployer(id, employerDto) {
        const { user_id, name, address, country } = employerDto;
        let employer = await this.employerModel.findOne({
            where: { id },
        });
        if (!employer) {
            throw new common_1.HttpException(`Employer list doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.employerModel.updateOne({ id }, {
            user_id: user_id,
            name: name,
            address: address,
            country: country
        });
        employer = await this.employerModel.findOne({
            where: { id },
        });
        return (0, mapper_1.toEmployerDto)(employer);
    }
    async destoryEmployer(id) {
        const employer = await this.employerModel.findOne({
            where: { id },
        });
        if (!employer) {
            throw new common_1.HttpException(`Employer list doesn't exist`, common_1.HttpStatus.BAD_REQUEST);
        }
        await this.employerModel.deleteOne({ id });
        return (0, mapper_1.toEmployerDto)(employer);
    }
};
EmployerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Employer")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], EmployerService);
exports.EmployerService = EmployerService;
//# sourceMappingURL=employer.service.js.map