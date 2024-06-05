import {userService} from '../services'

const checkAndCreateTableWithDefaultData = async () => {
  userService.init();
};

async function init() {
  await checkAndCreateTableWithDefaultData();
}

export default init;
