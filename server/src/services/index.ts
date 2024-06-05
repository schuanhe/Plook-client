import config from "../config";
import {IUserService} from "./user/iUserService";
import { userService as aUserService } from "./user/userService";
import { userService as bUserService } from "./user/userServiceNoDB";



let userService: IUserService;

console.log(config.database.dialect)

if (config.database.dialect === 'noDB'){
  userService = bUserService
}else {
  userService = aUserService
}


export {
  userService
}

