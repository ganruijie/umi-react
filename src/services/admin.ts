import request from "@/api";
export interface IAdminLogin {
  adminname: string,
  password: string
};
export function login(params:IAdminLogin) {
  return request({
    url: '/admin/login',
    method: 'POST',
    data: params
  })
}
