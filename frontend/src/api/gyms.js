import axios from "./axios";
// import useAxioPrivate from "@/hooks/useAxiosPrivate";
import { AxioPrivate } from "./axios";
// import { xios } from "./axios";


export const GetGym = async (data) => {
    try {
        const response = await axios.get(
            `/gyms/getGym/${data}`,
        );
        return response;

    } catch (err) {
        console.log(err)
        return err;
    }

};

export const PostScore = async (data) => {
    try {
        const response = await axios.post(
            "/gyms/postScore",
            JSON.stringify(data),
            {
                withCredentials: true,
            }
        );
        return response;

    } catch (err) {
        console.log(err)
        return err;
    }

};