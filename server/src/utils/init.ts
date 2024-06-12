import {userService,roomService} from '../services'

const checkAndCreateTableWithDefaultData = async () => {
  if (await userService.init()){
    console.log('正在创建其他表...');
    roomService.init()
    console.log('room表完成');
  }

};

async function init() {
  await checkAndCreateTableWithDefaultData();
}

export default init;
