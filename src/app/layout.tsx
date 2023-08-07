"use client";
import Nav from "@/layout/Nav/Nav";
import "./globals.css";
import styles from "./styles.module.css";
import { Inter } from "next/font/google";
import Footer from "@/layout/Footer/Footer";
import { AuthProvider } from "@/hooks/auth";
import AuthStateChanged from "@/hooks/authStateChanged";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AuthStateChanged>
            <div className={styles.containerLayout}>
              <Nav />
              <div className="pseudoNav"></div>
              <div className={styles.containerPage}>{children}</div>
              <Footer />
            </div>
          </AuthStateChanged>
        </AuthProvider>
      </body>
    </html>
  );
}
