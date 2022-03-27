"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployerModule = void 0;
const common_1 = require("@nestjs/common");
const employer_controller_1 = require("./employer.controller");
const employer_service_1 = require("./employer.service");
const mongoose_1 = require("@nestjs/mongoose");
const employer_model_1 = require("./employer.model");
let EmployerModule = class EmployerModule {
};
EmployerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: "Employer",
                    schema: employer_model_1.EmployerSchema
                }
            ])
        ],
        controllers: [employer_controller_1.EmployerController],
        providers: [employer_service_1.EmployerService]
    })
], EmployerModule);
exports.EmployerModule = EmployerModule;
//# sourceMappingURL=employer.module.js.map