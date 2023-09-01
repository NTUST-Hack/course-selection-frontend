import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "./api";
import axios from "axios";

const NTUST_ACCOUNTS_PATH: string = "/ntust_accounts";

export interface Account {
  id?: number;
  account: string;
  password?: string;
  secret: string;
  autoLogin: boolean;
}

export interface AccountInfoCache {
  realName: string;
  major: string;
  cookies: string;
  status: string;
  lastUpdated: Date;
}

const getAccountPath = (id: number): string => {
  return `${NTUST_ACCOUNTS_PATH}/${id}`;
};

const getAccountInfoCachePath = (id: number): string => {
  return `${getAccountPath(id)}/info_cache`;
};

export const useQueryAccounts = (
  offset: number,
  limit: number,
  account?: string
) => {
  const params: { offset: number; limit: number; account?: string } = {
    offset,
    limit,
  };

  if (account) params.account = account;

  return useQuery({
    queryKey: ["accounts", offset, limit, account],
    queryFn: async () => {
      const { data, headers } = await axios.get<Account[]>(
        API_URL + NTUST_ACCOUNTS_PATH,
        {
          params: params,
        }
      );
      const count: number = headers && parseInt(headers["x-total-count"]);
      return { data: data, count: count };
    },
  });
};

export const useQueryAccount = (id: number) => {
  return useQuery({
    queryKey: ["account", id],
    queryFn: async () => {
      const { data } = await axios.get<Account>(API_URL + getAccountPath(id));
      return data;
    },
  });
};

export const useUpdateAccount = (id: number) => {
  return useMutation({
    mutationFn: (data: Account) => {
      return axios.put<Account>(API_URL + getAccountPath(id), data);
    },
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: (data: Account) => {
      return axios.post<Account>(API_URL + NTUST_ACCOUNTS_PATH, data);
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: (id: number) => {
      return axios.delete(API_URL + getAccountPath(id));
    },
  });
};

export const useQueryAccountInfoCache = (
  id: number,
  refetchInterval?: number
) => {
  return useQuery({
    queryKey: ["account_info_cache", id],
    queryFn: async () => {
      const { data } = await axios.get<AccountInfoCache>(
        API_URL + getAccountInfoCachePath(id)
      );
      return data;
    },
    refetchInterval: refetchInterval,
  });
};
