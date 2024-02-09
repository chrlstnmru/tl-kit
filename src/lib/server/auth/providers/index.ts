import githubAuthProvider from './github';
import googleAuthProvider from './google';

const authProviders = {
	github: githubAuthProvider(),
	google: googleAuthProvider()
};
export type AuthProvider = keyof typeof authProviders;
export const authProviderList = Object.keys(authProviders) as AuthProvider[];

export default authProviders;
