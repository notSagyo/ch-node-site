import minimist from 'minimist';
import runAxiosClient from './client-axios';

const args = minimist(process.argv.slice(2));
const doTestAxios = args?.axios;

if (doTestAxios) runAxiosClient();
