import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://us-central1-clone-efe1a.cloudfunctions.net/api' // The API (cloud function) URL

    //http://localhost:5001/clone-efe1a/us-central1/api
    //https://us-central1-clone-efe1a.cloudfunctions.net/api
});

export default instance;