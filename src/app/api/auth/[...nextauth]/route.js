import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: "IamTheHero",
  session: {
    strategy: "jwt", // Make sure this is set to "jwt"
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Log when the user signs in
      // console.log("User signed in:", user);
      return true; // Return true to allow the sign-in
    },
    async session({ session, token }) {
      // Log each time the session is checked or created
      // console.log("Session callback: ", session);
      return session; // Return the session object as-is
    },
    async jwt({ token, user }) {
      
      // Log the JWT token and user information
      // console.log("JWT callback: ", token, user);
      return token; // Return the token object as-is
    },
  },
};
const handler = NextAuth(authOptions);
// Export GET and POST methods
export { handler as GET, handler as POST };
