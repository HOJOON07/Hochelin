import "@/styles/globals.css";

import { NextLayout, NextProvider } from "./provider";
import { Metadata } from "next";

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
        <NextProvider>
          <NextLayout>{children}</NextLayout>
        </NextProvider>
      </body>
    </html>
  );
}
