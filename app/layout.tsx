import type { Metadata } from "next";
import "./globals.css";
import { Geologica } from "next/font/google";
import Decor from "@/components/Decor";

export const metadata: Metadata = {
  title: "Shikigami",
  description: "Shikigami",
  icons: {
    icon: "/meow.png",
  },
};

const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased ${geologica.variable}`}>
        <Decor />
        {children}
      </body>
    </html>
  );
}
