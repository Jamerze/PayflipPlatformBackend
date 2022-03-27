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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async register(userDto) {
        let status = {
            success: true,
            message: 'user registered',
        };
        try {
            await this.userService.create(userDto);
        }
        catch (err) {
            status = {
                success: false,
                message: err,
            };
        }
        return status;
    }
    async login(loginUserDto) {
        const user = await this.userService.findByLogin(loginUserDto);
        const token = this._createToken(user);
        const userDetail = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            country: user.country,
        };
        return Object.assign({ user: userDetail }, token);
    }
    async validateUser(payload) {
        const user = await this.userService.findByPayload(payload);
        if (!user) {
            throw new common_1.HttpException('Invalid token', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    _createToken({ email }) {
        const expiresIn = process.env.EXPIRESIN;
        const user = { email };
        const accessToken = this.jwtService.sign(user);
        const type = "Bearer";
        return {
            type,
            expiresIn,
            accessToken,
        };
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map