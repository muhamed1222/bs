import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiError extends Error {
  constructor(
    public status: number,
    public data: any,
    message?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          // Попытка обновить токен
          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const { data } = await this.post('/auth/refresh', { refreshToken });
              localStorage.setItem('token', data.token);
              // Повторяем оригинальный запрос
              return this.instance(error.config);
            }
          } catch (refreshError) {
            // Если не удалось обновить токен, очищаем хранилище
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth';
          }
        }
        return Promise.reject(
          new ApiError(
            error.response?.status || 500,
            error.response?.data,
            error.message
          )
        );
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

export const api = new ApiClient(); 