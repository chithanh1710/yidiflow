import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["vietnamese", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "YiDiFlow",
  description:
    "YiDiFlow is a collaborative platform for movie enthusiasts to share, discover, and discuss the best movies. Join our community to find answers, share your reviews, and connect with other cinephiles.",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: "primary-gradient !shadow-none",
          footerActionLink: "primary-text-gradient hover:text-primary-500",
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
          <h1 className={`h1-bold`}>inter</h1>
          <h1 className={`h1-bold`}>spaceGrotesk</h1>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
