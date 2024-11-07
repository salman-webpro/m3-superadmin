import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Login || dashboard",
  description: "M3 Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <div className="h-screen w-full flex items-center justify-center">
          {children}
        </div>
      </body>
    </html>
  );
}
