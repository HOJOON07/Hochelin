"use client";

import Layout from "@/components/Layout";
// import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import Navbar from "@/components/Navbar";

interface Props {
  children: React.ReactNode;
}

export const NextProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      })
  );

  // const { session } = pageProps;

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          {children}
          <ToastContainer
            autoClose={1000}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
          />
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
};

export const NextLayout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Navbar />
      {children}
    </div>
  );
};

// const [globalState, setGlobalState] = useState("first");

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       queryKeyHashFn(queryKey) {
//         const result =
//           typeof queryKey === "string"
//             ? hashKey([globalState, queryKey])
//             : hashKey([globalState, ...queryKey]);

//         return result;
//       },
//     },
//   },
// });

// const [queryClient] = React.useState(
//   () =>
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           // With SSR, we usually want to set some default staleTime
//           // above 0 to avoid refetching immediately on the client
//           staleTime: 60 * 1000,
//         },
//       },
//     }),
// )
