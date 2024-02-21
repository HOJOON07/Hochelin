import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";

import type { AppProps } from "next/app";

import { RecoilRoot } from "recoil";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { session } = pageProps;
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps}></Component>
            <ToastContainer />
          </Layout>
          <ReactQueryDevtools />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
