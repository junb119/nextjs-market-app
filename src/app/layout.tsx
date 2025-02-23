import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import getCurrentUser from "./actions/getCurrentUser";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <Navbar currentUser={currentUser} />
        {children}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&libraries=services,clusterer&autoload=false`}
        />
      </body>
    </html>
  );
}
