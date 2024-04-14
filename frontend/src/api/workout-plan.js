import { AxioPrivate } from "./axios";

export const getWorkoutPlan = async (auth) => {
    const axiosPrivate = AxioPrivate(auth);
    try {
        const response = await axiosPrivate.get("/workout/getPlan", {
            withCredentials: true,
        });
        return response;
    } catch (err) {
        console.log("Failed to fetch workout plan:", err);
        return err;
    }
};
