import {userService} from '../services'

const checkAndCreateTableWithDefaultData = async () => {
  userService.init();
};

function init() {
  checkAndCreateTableWithDefaultData();
}

export default init;
