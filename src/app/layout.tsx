import "@/styles/globals.css";

import { NextLayout, NextProvider } from "./provider";
import { Metadata } from "next";
import GoogleAnalytics from "./googleAnalytics";

export const metadata: Metadata = {
  title: "Hochelin",
  description: "넥스트로 만든 맛집 앱",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
