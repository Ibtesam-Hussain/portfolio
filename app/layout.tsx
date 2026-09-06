import type { Metadata } from "next";
import "./globals.css";
import Nav from "./components/Nav";

export const metadata: Metadata = {
  title: "Ibtesam Hussain",
  description: "Full-stack AI engineer building production systems. Depth estimation, retrieval-augmented generation, autonomous agents.",
  keywords: ["AI", "ML", "depth estimation", "RAG", "TypeScript", "Python"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col bg-paper text-ink antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}
