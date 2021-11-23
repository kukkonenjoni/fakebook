import {
    atom,
  } from 'recoil';

const userState = atom({
    key: 'textState',
    default: null
  });

export default userState