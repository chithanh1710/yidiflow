import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeProvider";
import { MenuProvider } from "@/components/shared/ToggleMenu";

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
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>
            <MenuProvider>{children}</MenuProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
