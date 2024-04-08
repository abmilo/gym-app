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