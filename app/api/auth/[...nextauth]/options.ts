import type { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

interface ExtendedUser extends User {
    authToken: string;
}

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith"},
                password: { label: "Password", type: "password"}
            },
            async authorize(credentials, req) {

                const url = 'http://localhost:4000/api/v1/auth/login';
                const payload = {
                    username: credentials?.username,
                    password: credentials?.password,
                };

                const data = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                }

                try {
                    const response = await fetch(url, data)
                    if (response.ok) {
                        const responseBody = await response.json();
                        console.log("Login info: ",responseBody);
                        const output = {
                            name: responseBody.username,
                            email: responseBody.email,
                            accessToken: responseBody.accesstoken,
                            useruid: responseBody.useruid
                        }
                        return output;
                    } else {
                        const errorResponse = await response.json();
                        return null;
                    }
                } catch (error) {
                    console.error('Error: ', error);
                }
                
            }
        })

    ],
}