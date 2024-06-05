import {userService} from '../services'
import {UserInstance} from "../models/User";

const checkAndCreateTableWithDefaultData = async () => {
  userService.init();
};

async function init() {
  await checkAndCreateTableWithDefaultData();


}

export default init;
