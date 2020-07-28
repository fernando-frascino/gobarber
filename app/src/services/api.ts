import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;

// must run "adb reverse tcp:LOCAL_PORT tcp:EMULATOR_PORT" on console to enable
// android emulator use localhost api
