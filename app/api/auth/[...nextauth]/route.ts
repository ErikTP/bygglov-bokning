import NextAuth, { type NextAuthOptions } from "next-auth";
import User from "@/models/user";
import connectToDatabase from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    },
    providers: [

        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password:{},
            },
            async authorize(credentials) {
                try {
                    await connectToDatabase();
                    const user = await User.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error("")
                    }
                    const isValidPassword = await bcrypt.compare(
                        credentials?.password ?? "", user.password as string
                    ); 
                    if (!isValidPassword) {
                        throw new Error ("")
                    }
                    return user;
                }
                catch {
                    return null
                }
            }
        })

    ],
    callbacks: {
        async signIn({ account, profile }) {
            if (account?.provider === "github") {
                await connectToDatabase();
                const existingUser = await User.findOne({ email: profile?.email });
                if (!existingUser) {
                    await User.create({
                        name: profile?.name,
                        email: profile?.email,
                        role: "user",
                    })
                }
            }
            return true;
              },

        async jwt({ token }) {

            await connectToDatabase();

            const dbUser = await User.findOne({
                email: token.email
            });

            if (dbUser) {
                token.role = dbUser.role;
            }

            return token;
            },

        async session({ session, token }) {
            if (token) {
                session.user = {
                    email: token.email,
                    name: token.name,
                    image: token.picture,
                    role: token.role,
                } as typeof session.user & {
                    role: string;
                };
            };
            return session;
        }
        
    },
    pages: {
       signIn: "/inloggning",
    },
    secret: process.env.NEXTAUTH_SECRET
    

  
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };