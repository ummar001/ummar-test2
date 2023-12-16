import { environment } from "@/common/environment";
import { store } from "@/common/store";
import { resetUser } from "@/modules/auth/store";
import axios, { InternalAxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  headers: {
    Authorization: "",
  },
});

const publicAxiosInstance = axios.create({
  baseURL: environment.CLIENT_API_URL,
  headers: {
    Authorization: "",
  },
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<unknown>) => {
    const token = store.getState().user.user?.token.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
      staleTime: 1000 * 60 * 60 * 24,
    },
  },
});

export const getFromApi = async (
  url: string,
  params?: Record<string, string>
) => {
  try {
    const { data } = await axiosInstance.get(url, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      store.dispatch(resetUser());
    }
    throw new Error(error.response.data.message);
  }
};

export const getFromClientApi = async (
  url: string,
  params?: Record<string, string>
) => {
  try {
    const { data } = await publicAxiosInstance.get(url, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export const putFromClientApi = async <T>(
  url: string,
  body?: T,
  params?: Record<string, string>
) => {
  try {
    const { data } = await publicAxiosInstance.put(url, body, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
};

export async function deleteFromApi(
  url: string,
  params?: Record<string, string>
) {
  try {
    const { data } = await axiosInstance.delete(url, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data.message === "Unauthorized") {
      store.dispatch(resetUser());
    }
    throw new Error(error.response.data.message);
  }
}

export async function postFromApi<T>(
  url: string,
  body: T,
  params?: Record<string, string>
) {
  try {
    const { data } = await axiosInstance.post(url, body, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response.data.message === "Unauthorized") {
      store.dispatch(resetUser());
    }
    throw new Error(error.response.data.message);
  }
}

export async function putFromApi<T>(
  url: string,
  body?: T,
  params?: Record<string, string>
) {
  try {
    const { data } = await axiosInstance.put(url, body, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      store.dispatch(resetUser());
    }
    throw new Error(error.response.data.message);
  }
}

export async function patchFromApi<T>(
  url: string,
  body?: T,
  params?: Record<string, string>
) {
  try {
    const { data } = await axiosInstance.patch(url, body, {
      headers: params ? params : {},
    });
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      store.dispatch(resetUser());
    }
    throw new Error(error.response.data.message);
  }
}
