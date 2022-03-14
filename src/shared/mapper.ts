import { UserDto } from "src/user/dto/user.dto";
import { UserModel } from "src/user/user.model";

export const toUserDto = (data: UserModel): UserDto => {  
    const { id, username, email } = data;
    let userDto: UserDto = { id, username, email,  };
    return userDto;
};