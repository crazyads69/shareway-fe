/* eslint-disable no-useless-catch */
/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
import { AxiosRequestConfig } from "axios";

// Import axios client
import axiosClient from "../axios-client/axios-client";

// Define types for query parameters and body
interface QueryParams {
    [key: string]: string | number | boolean | null | undefined;
}

interface RequestBody {
    [key: string]: unknown;
}

// Define a type for the request options
interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    params?: QueryParams;
    body?: RequestBody;
}

// Create a key factory for SWR keys
const createKey = (url: string, params?: QueryParams) => JSON.stringify({ url, params });

// Custom fetcher function using axios client
const fetcher = async <T>(url: string, options: RequestOptions = {}): Promise<T> => {
    try {
        const { method = "GET", params, body } = options;

        const config: AxiosRequestConfig = {
            method,
            params,
            data: body,
        };

        const response = await axiosClient(url, config);

        return response.data as T;
    } catch (error) {
        throw error;
    }
};

// Additional type for API response
export interface APIResponse<T> {
    data: T | undefined;
    isLoading: boolean;
    isError: any;
    isValidating: boolean;
    mutate: (key?: any, data?: any, shouldRevalidate?: boolean) => Promise<T | undefined>;
}

// Custom hook to use SWR with axios client
function useAPI<T = unknown>(url: string, options: RequestOptions = {}): APIResponse<T> {
    const key = createKey(url, options.params);
    const { data, error, mutate, isValidating } = useSWR<T>([key, options], ([, opts]) =>
        fetcher<T>(url, opts as RequestOptions),
    );

    return {
        data,
        isLoading: !error && !data && !isValidating,
        isError: error,
        isValidating,
        mutate,
    };
}

// Helper function to update request options
export const updateRequest = async <T>(
    url: string,
    newOptions: RequestOptions,
    mutate: (key?: any, data?: any, shouldRevalidate?: boolean) => Promise<T>,
) => {
    const key = createKey(url, newOptions.params);

    return mutate([key, newOptions]);
};

// Helper function for optimistic updates
export const optimisticUpdate = async <T>(
    url: string,
    options: RequestOptions,
    updateData: (data: T) => T,
    mutate: (key?: any, data?: any, shouldRevalidate?: boolean) => Promise<T>,
    currentData?: T,
) => {
    const key = createKey(url, options.params);

    return mutate(key, currentData ? updateData(currentData) : undefined, false).then(() =>
        mutate(key),
    );
};

// Export types for external use
export type { QueryParams, RequestBody, RequestOptions };

export default useAPI;
