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
exports.EmployerController = void 0;
const common_1 = require("@nestjs/common");
const utils_1 = require("../shared/utils");
const employer_create_dto_1 = require("./dto/employer.create.dto");
const employer_dto_1 = require("./dto/employer.dto");
const employer_service_1 = require("./employer.service");
let EmployerController = class EmployerController {
    constructor(employerService) {
        this.employerService = employerService;
    }
    async findAll() {
        const employers = await this.employerService.getAllEmployer();
        return (0, utils_1.toPromise)({ employers });
    }
    async findOne(id) {
        return await this.employerService.getOneEmployer(id);
    }
    async create(employerCreateDto) {
        return await this.employerService.createEmployer(employerCreateDto);
    }
    async update(id, employerDto) {
        return await this.employerService.updateEmployer(id, employerDto);
    }
    async destory(id) {
        return await this.employerService.destoryEmployer(id);
    }
};
__decorate([
    (0, common_1.Get)("list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("detail/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [employer_create_dto_1.EmployerCreateDto]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update/:id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employer_dto_1.EmployerDto]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)("delete/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployerController.prototype, "destory", null);
EmployerController = __decorate([
    (0, common_1.Controller)('employer'),
    __metadata("design:paramtypes", [employer_service_1.EmployerService])
], EmployerController);
exports.EmployerController = EmployerController;
//# sourceMappingURL=employer.controller.js.map