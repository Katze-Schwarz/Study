const { parentPort, workerData } = require('worker_threads');
const axios = require('axios');
const downloadContent = async (url) => {
    const response = await axios.get(url);
    return response.data;
};
const { url, threadCount } = workerData;
const download = async () => {
    try{
        const content = await downloadContent(url);
        parentPort.postMessage({ status: 'completed', content  });
    } catch (error) {
        parentPort.postMessage({ status: 'error', error: error.message});
    }
};
download();