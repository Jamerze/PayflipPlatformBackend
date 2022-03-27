"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toEmployerDto = exports.toUserDto = void 0;
const toUserDto = (data) => {
    const { id, name, email, country, role } = data;
    let userDto = { id, name, email, country, role };
    return userDto;
};
exports.toUserDto = toUserDto;
const toEmployerDto = (data) => {
    const { id, user_id, name, address, country } = data;
    let employerDto = { id, user_id, name, address, country };
    return employerDto;
};
exports.toEmployerDto = toEmployerDto;
//# sourceMappingURL=mapper.js.map