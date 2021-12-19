import { atom } from 'recoil';

const userState = atom({
    key: 'userState',
    default: null as any
  });

export default userState