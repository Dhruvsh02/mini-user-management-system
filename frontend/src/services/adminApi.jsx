// import API from "./api";

// export const getAllUsers = async () => API.get("/admin/users/");

// export const activateUser = async (id) => 
//     API.patch(`/admin/users/${id}/activate/`);

// export const deactivateUser = async (id) => 
//     API.patch(`/admin/users/${id}/deactivate/`);

import API from "./api";

export const getAllUsers = (page = 1, all = false) => {
  let url = `/admin/users/?page=${page}`;
  if (all) url += "&all=true";
  return API.get(url);
};

export const activateUser = (id) => {
  return API.patch(`/api/users/${id}/activate/`);
};

export const deactivateUser = (id) => {
  return API.patch(`/api/users/${id}/deactivate/`);
};
