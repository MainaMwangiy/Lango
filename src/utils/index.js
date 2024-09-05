import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { actions } from "../redux/actions";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_GITHUB_SSO_API_KEY,
    authDomain: process.env.REACT_APP_GITHUB_SSO_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_GITHUB_SSO_PROJECT_ID,
    storageBucket: process.env.REACT_APP_GITHUB_SSO_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_GITHUB_SSO_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_GITHUB_SSO_APP_ID,
    measurementId: process.env.REACT_APP_GITHUB_SSO_MEASUREMENT_ID
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const gitHubProvider = new GithubAuthProvider();
const googleProvider = new GoogleAuthProvider();
const utils = {
    distances: [
        '0 - 50m',
        '50 - 100m',
        '100 - 150m',
        '150 - 200m'
    ],
    firebaseConfig: firebaseConfig,
    app: app,
    auth: auth,
    gitHubProvider: gitHubProvider,
    googleProvider: googleProvider,
    gitHubSignIn: ({ navigate, dispatch }) => {
        const token = localStorage.getItem('token');
        const isToken = token === null || token === '';
        if (auth.currentUser && !isToken) {
            navigate('/Main')
            return;
        }
        try {
            signInWithPopup(auth, gitHubProvider)
                .then((result) => {
                    const credential = GithubAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    localStorage.setItem('token', token)
                    const user = result.user;
                    dispatch({ type: actions.LOAD_USER, payload: user })
                    navigate('/Main')
                })
                .catch((error) => {
                    console.error('Error during GitHub login:', error.message);
                });
        } catch (error) {
            console.error('GitHub sign-in failed:', error);
        }
    },
    googleSignIn: ({ navigate, dispatch }) => {
        const token = localStorage.getItem('token');
        const isToken = token === null || token === '';
        if (auth.currentUser && !isToken) {
            navigate('/Main')
            return;
        }
        try {
            signInWithPopup(auth, googleProvider)
                .then((result) => {
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    localStorage.setItem('token', token)
                    const user = result.user;
                    dispatch({ type: actions.LOAD_USER, payload: user })
                    navigate('/Main')
                })
                .catch((error) => {
                    console.error('Error during Google login:', error.message);
                });
        } catch (error) {
            console.error('Google sign-in failed:', error);
        }
    }
};

export default utils;