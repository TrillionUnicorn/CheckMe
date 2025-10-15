import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CheckMe - Universal Identity Verification",
  description: "70-90% cheaper identity verification platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}

