import axiosInstance from '../../utils/axios/AxiosInstance'

export interface ApiResult<T> {
  code: number
  message: string
  data: T
}
export class HttpClient {
  static inst = new HttpClient()

  async get<T>(url: string, params?: any): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params })
    return response.data
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data)
    return response.data
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.put<T>(url, data)
    return response.data
  }

  async del<T>(url: string, params?: any): Promise<T> {
    const response = await axiosInstance.delete<T>(url, { params })
    return response.data
  }

  getBaseURL() {
    return axiosInstance.getUri()
  }
}
