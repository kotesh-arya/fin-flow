"use client";
import { SessionProvider } from "next-auth/react";

export function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      {Component.auth ? (
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export function AuthProvider({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
