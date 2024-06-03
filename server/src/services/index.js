const config = require("../config");

let userService;


if(config.database.dialect === 'noDB'){
    userService = require("./user/userServiceNoDB");
}else {
    userService = require("./user/userService");
}



module.exports = {
    userService,
};
