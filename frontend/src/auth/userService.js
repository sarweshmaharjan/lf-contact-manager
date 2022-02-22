// import http from '../services/httpService';
import axios from "axios";
import apiUrl from "../config.json";

const apiEndPoint = apiUrl + "/auth/signup";

export function register(user){
   return axios.post(apiEndPoint,{
        email:user.email,
        password:user.password,
        name:user.name,
    })
}