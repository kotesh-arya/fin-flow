import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Auth({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // Redirect to the login page if the user is not authenticated
      router.push("/login");
    }
  }, [status, router]);

  // Show a loading state while the session is being fetched
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Once authenticated, render the children components
  if (status === "authenticated") {
    return <>{children}</>;
  }

  return null; // This prevents rendering anything before authentication is determined
}
