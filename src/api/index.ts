import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  AxiosError,
} from 'axios';
import qs from 'qs';
import fetchJsonp from 'fetch-jsonp';
import { message } from 'antd';
import { history } from 'umi';
import { getItem } from '@/utils/cookie';
let errorHandler: any = {};
const isDev: boolean = process.env.NODE_ENV === 'development';
const baseURL = isDev
  ? 'http://121.89.205.189/admin'
  : 'http://121.89.205.189/admin';
const ins: AxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 6000,
});

// 存储所有的请求标致和拒绝请求的方法
const pending: Array<any> = [];
// 这个是控制取消请求的
const CancelToken = axios.CancelToken;
// 检查且删掉同样的请求
const removePending = (config: AxiosRequestConfig) => {
  for (const p in pending) {
    if (pending[p].u === config.url + '&' + config.method) {
      // 当前请求在数组中存在时，执行函数体
      // 执行取消操作
      pending[p].f();
      // 把这条记录从数组中移除
      pending.splice(Number(p), 1);
    }
  }
};
// 请求拦截器
ins.interceptors.request.use(
  function (config: AxiosRequestConfig): AxiosRequestConfig {
    // 在一个ajax发送前执行一下取消操作
    removePending(config);
    config.cancelToken = new CancelToken((c) => {
      pending.push({ u: config.url + '&' + config.method, f: c });
    });
    const token = getItem('token');
    config.headers.common['token'] = token;
    return config;
  },
  function (error: any): Promise<never> {
    return Promise.reject(error);
  },
);
// 添加响应拦截器
ins.interceptors.response.use(
  function (response: AxiosResponse<any>): AxiosResponse<any> {
    // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中删除
    removePending(response.config);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    if (response.data.code !== '200') {
      if (response.data.code === '4' || response.data.code === '10005') {
        if (
          errorHandler[response.data.code as keyof typeof errorHandler] &&
          response.data.code === '10005'
        ) {
          return new Promise(() => {});
        }
        history.replace('/login');
      }
      errorHandler[response.data.code as keyof typerof] = (msg: any) => {
        message.error(msg);
      };
      errorHandler[response.data.code](response.data.message);
      return Promise.reject(response);
    } else {
      return response;
    }
  },
  function (error: any): Promise<any> {
    const { status } = error.response;
    // 错误提醒
    switch (status) {
      case 500:
        message.error('服务器异常');
        break;
      case 401:
        message.error('没有访问权限');
        break;
      case 404:
        message.error('请求路径不存在！');
        break;
      default:
        message.error(error.response.data);
        break;
    }
    return Promise.reject(error);
  },
);

export default function request(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  let {
    url = '',
    method = 'GET',
    params = {},
    data = {},
    headers = '',
  } = config;
  switch (method.toUpperCase()) {
    case 'GET':
      return new Promise((resolve, reject) => {
        ins({
          method: 'get',
          url: url,
          params,
        })
          .then(
            (response) => {
              resolve(response.data);
            },
            (error) => {
              reject(error.data);
            },
          )
          .catch((error) => {
            reject(error.data);
          });
      });
    case 'POST':
      headers = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      };
      return new Promise((resolve, reject) => {
        ins({
          method: 'post',
          url: url,
          // 将请求数据转为json
          data: qs.stringify(data),
          // 设置请求头
          headers: headers,
        })
          .then(
            (response) => {
              resolve(response.data);
            },
            (error) => {
              reject(error.data);
            },
          )
          .catch((error) => {
            reject(error.data);
          });
      });
    case 'Form':
      return new Promise((resolve, reject) => {
        ins({
          method: 'post',
          url: url,
          data: data,
        })
          .then(
            (response) => {
              resolve(response.data);
            },
            (error) => {
              reject(error.data);
            },
          )
          .catch((error) => {
            reject(error.data);
          });
      });
    case 'JSONP':
      return new Promise((resolve, reject) => {
        fetchJsonp(url, params)
          .then((response) => {
            resolve(response.json());
          })
          .catch((error) => {
            reject(error);
          });
      });
    case 'PUT': // 修改数据 --- 所有的数据的更新
      return ins.put(url, data);
    case 'DELETE': // 删除数据
      return ins.delete(url, { data });
    case 'PATCH': // 更新局部资源
      return ins.patch(url, data);
    default:
      return ins(config);
  }
}
