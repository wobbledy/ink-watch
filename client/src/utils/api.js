import axios from "axios";
import { useMutation } from "@apollo/client";
import { MUTATION_MATCHUPS } from '../utils/mutations';

const API = axios.create({
    baseURL: "http://localhost:3000/api/v1",
});

export const postImage = (data) =>
    API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },

    });

// export const postImage = () => {
//     const { loading, data } = useMutation(MUTATION_MATCHUPS, {
//         fetchPolicy: "no-cache",

//     });
// }
