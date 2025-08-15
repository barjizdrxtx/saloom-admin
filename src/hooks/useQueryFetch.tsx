import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useQueryFetch = (url: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery(
    [url],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { fetchedData: fetchedData?.result, refetch, isLoading, error };
};

export const useQueryFetch2 = (url: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery(
    [url],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    {
      refetchOnWindowFocus: false,
    }
  );

  return { fetchedData: fetchedData, refetch, isLoading, error };
};

export const useQueryFetchEnabled = (url: any, enabled: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery(
    [url],
    () =>
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // <-- Added here
      }).then((res) => res.json()),
    {
      enabled: enabled,
      refetchOnWindowFocus: true, // Disable refetching when the window focus changes
    }
  );

  return { fetchedData: fetchedData?.result, refetch, isLoading, error };
};

export const useQueryFetchRaw = (url: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery([url], () =>
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // <-- Added here
    }).then((res) => res.json())
  );

  return { fetchedData: fetchedData?.result, refetch, isLoading, error };
};

export const useQueryFetchTable = (url: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery([url], () =>
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", // <-- Added here
    }).then((res) => res.json())
  );

  return { fetchedData: fetchedData, refetch, isLoading };
};

export const useQueryFetchTable2 = (url: any, enabled: any) => {
  const token = Cookies.get("saloom_access_token");

  const {
    isLoading,
    error,
    data: fetchedData,
    refetch,
  } = useQuery(
    [url],
    () =>
      fetch(process.env.NEXT_PUBLIC_API_BASE_URL + url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        credentials: "include", // <-- Added here
      }).then((res) => res.json()),
    {
      enabled: enabled,
      refetchOnWindowFocus: true, // Disable refetching when the window focus changes
    }
  );

  return { fetchedData: fetchedData, refetch, isLoading };
};
