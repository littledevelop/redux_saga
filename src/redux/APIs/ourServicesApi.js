import axios from "axios";

const token = localStorage.getItem("ADMIN");

const headersParam = {
    Authorization: `${token}`,
    Origin: "*",
};

const baseUrl = "http://192.168.1.16:3000/api/";
// const baseUrl = process.env.REACT_APP_BASE_URL;

export const loadOurServicesApi = async () => await axios.get(`${baseUrl}ourService/getAll-ourService/`, { headers: headersParam });

export const addOurServiceApi = async (newService) => await axios.post(`${baseUrl}ourService/create/`, newService, { headers: headersParam });

export const updateOurServiceApi = async (updateOurService) => await axios.put(`${baseUrl}ourService/${updateOurService.get("id")}`, updateOurService, { headers: headersParam });

export const deleteServiceApi = async (deleteService) => await axios.delete(`${baseUrl}ourService/${deleteService}/`, { headers: headersParam });

export const getSingleServiceApi = async (id) => await axios.get(`${baseUrl}ourService/${id}/`,  { headers: headersParam });

