"use client";
import Auth from "@/app/components/Auth";
import { SessionProvider } from "next-auth/react";

export function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <Auth>
          <Component {...pageProps} />
        </Auth>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
