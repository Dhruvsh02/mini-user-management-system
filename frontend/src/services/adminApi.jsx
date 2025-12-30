import API from "./api";

export const getAllUsers = async () => API.get("/admin/users/");

export const activateUser = async (id) => 
    API.post(`/admin/users/${id}/activate/`);

export const deactivateUser = async (id) => 
    API.post(`/admin/users/${id}/deactivate/`);