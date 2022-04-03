export const isAdmin = (req: any) => {
    if (req && req.user.data.role == "admin") {
        return true;
    }
    else {
        return false;
    }
}

export const isEmployer = (req: any) => {
    if (req && req.user.data.role == "employer") {
        return true;
    }
    else {
        return false;
    }
}

export const isEmployee = (req: any) => {
    if (req && req.user.data.role == "employee") {
        return true;
    }
    else {
        return false;
    }
}

export const notAuthorize = () => {
    let status = {
        success: false,
        message: "You are not authorized to access this request."
    };
    return status;
}

export const responseWithData = (success: any, message: any, data: any) => {
    let status = {
        success: success,
        message: message,
        data: data
    };
    return status;
}

export const responseWithoutData = (success: any, message: any) => {
    let status = {
        success: success,
        message: message
    };
    return status;
}

export const checkLoginValidation = (email: any, password: any) => {
    if (!email || email == "") {
        return responseWithoutData(false, "Email is required.");
    }
    else if (!password || password == "") {
        return responseWithoutData(false, "Password is required.");
    }
    else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return responseWithoutData(false, "Email is not valid.");
    }
    else if (password.length < 8) {
        return responseWithoutData(false, "Password length should be atleast 8.");
    }
    else {
        return responseWithoutData(true, "Data Validated");
    }
}

export const checkRegistrationValidation = (user: any) => {
    const { name, company_name, email, address, password, country } = user;
    if (!name || name == "") {
        return responseWithoutData(true, "Data Validated");
    }
    else if (!company_name || company_name == "") {
        return responseWithoutData(false, "Company Name is required.");
    }
    else if (!email || email == "") {
        return responseWithoutData(false, "Email is required.");
    }
    else if (!address || address == "") {
        return responseWithoutData(false, "Address is required.");
    }
    else if (!password || password == "") {
        return responseWithoutData(false, "Password is required.");
    }
    else if (!country || country == "") {
        return responseWithoutData(false, "Country is required.");
    }
    else if (!email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        return responseWithoutData(false, "Email is not valid.");
    }
    else if (password.length < 8) {
        return responseWithoutData(false, "Password length should be atleast 8.");
    }
    else {
        return responseWithoutData(true, "Data Validated");
    }
}

export const checkUpdateEmployeeValidation = (id: any, employer: any) => {
    const { name, address, country } = employer;
    if (!id || id == "") {
        return responseWithoutData(false, "ID is missing");
    }
    else if (!name || name == "") {
        return responseWithoutData(false, "Name is required.");
    }
    else if (!address || address == "") {
        return responseWithoutData(false, "Address is required.");
    }
    else if (!country || country == "") {
        return responseWithoutData(false, "Country is required.");
    }
    else{
        return responseWithoutData(true, "Data Validated");
    }
}