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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mapper_1 = require("../shared/mapper");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findOne(options) {
        const user = await this.userModel.findOne(options);
        return (0, mapper_1.toUserDto)(user);
    }
    async findByLogin({ email, password }) {
        const user = await this.userModel.findOne({ email: email });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.UNAUTHORIZED);
        }
        const areEqual = await bcrypt.compare(password, user.password);
        if (!areEqual) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        return (0, mapper_1.toUserDto)(user);
    }
    async findByPayload({ email }) {
        return await this.findOne({
            where: { email }
        });
    }
    async create(userDto) {
        const { name, company_name, email, address, password, country } = userDto;
        const userInDb = await this.userModel.findOne({
            email: email
        });
        if (userInDb) {
            throw new common_1.HttpException('User already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const newUser = new this.userModel({
            name: name,
            email: email,
            country: country,
            role: "employer",
            password: await bcrypt.hash(password, 10),
        });
        await newUser.save();
        return (0, mapper_1.toUserDto)(newUser);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("User")),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map