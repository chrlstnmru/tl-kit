import githubAuthProvider from './github';
import googleAuthProvider from './google';

const authProviders = {
	github: githubAuthProvider(),
	google: googleAuthProvider()
};
export type AuthProvider = keyof typeof authProviders;

export default authProviders;
