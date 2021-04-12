import axios from 'axios';
import store from '../store';
import { toast } from 'react-toastify';
const api = axios.create({
    baseURL: 'https://hipstagram-api.herokuapp.com',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': '',
    }
})

api.interceptors.request.use(config => {
    config.headers['Authorization'] = store.getState().user.token;
    console.log(config)
    return config
})

api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  }, function (error) {
    toast.error(error.response.data,
        {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            })
      if(error.response.status === 401) {
          console.log(error.response)
          store.dispatch({type: 'LOGGOUT'})
      }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });

export const getCurrentUser = () => {
    return api.get('/users/current'); 
}

