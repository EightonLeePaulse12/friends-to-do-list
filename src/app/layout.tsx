import "~/styles/globals.css";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "To-Do List",
  description: "Manage your tasks professionally",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <SessionProvider>
      <body className={`font-sans`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
      </SessionProvider>
    </html>
  );
}
