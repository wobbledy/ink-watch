import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8000/api/v1",
});

export const postImage = (data) =>
    API.post("/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });