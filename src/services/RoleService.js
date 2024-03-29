import axios from "axios";
import { apiUrl } from "../config";

export async function getRoleList() {
  try {
    return await axios.get(apiUrl + "/role/list").then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export async function searchRole(roleName) {
  try {
    return await axios.get(apiUrl + "/role/search?RoleName=" + roleName).then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export function addEditRole(roleName) {
  var details = {
    'roleName': roleName,
  };
  try {
    return axios.post("http://192.168.1.106:8080/hrm/role/save",
      details,
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    ).then((res) => res.data);
  }
  catch (error) {
    return error;
  }
}

export async function deleteRoleById(roleId) {
  try {
    return axios.delete(apiUrl + "/role/delete?roleId=" + roleId).then((res) => res.data);
  } catch (error) {
    return error;
  }
}

export async function getRoleRightsByRoleId(roleId) {
  debugger;
  return axios.get(apiUrl + "/role/rights/get?roleId=" + roleId).then((response) => response.data);
}

export function updateRoleRights(RoleRightsList) {
  try {
    return axios.post("http://192.168.1.106:8080/hrm/role/rights/save",
    RoleRightsList,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.data);
  } 
  catch (error) {
    return error;
  }
}


