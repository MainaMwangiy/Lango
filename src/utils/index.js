import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { actions } from "../redux/actions";
import { initializeApp } from "firebase/app";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
uuidv4();

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
const url =
    process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_PROD_BACKEND_URL
        : process.env.REACT_APP_DEV_BACKEND_URL;
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
    statusCode: 200 || 201,
    adminUser: ["Admin", "User"],
    normalUser: ["User"],
    gitHubSignIn: async ({ navigate, dispatch }) => {
        const token = localStorage.getItem('token');
        const isToken = token === null || token === '';
        if (auth.currentUser && !isToken) {
            navigate('/Main');
            return;
        }
        try {
            const result = await signInWithPopup(auth, gitHubProvider);
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            localStorage.setItem('token', token);
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                image_url: user.photoURL
            }
            const body = {
                user_id: uuidv4(),
                email: user.email,
                name: user.displayName,
                image_url: user.photoURL,
                provider: 'github',
                token: token,
            };
            const response = await axios.post(`${url}/auth/sso`, body, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response && response?.status === utils.statusCode) {
                const userData = await response.data;
                localStorage.setItem('user', JSON.stringify(newUser));
                localStorage.setItem('id', userData.user_id);
                dispatch({ type: actions.LOAD_USER, user: user })
                navigate('/Main');
                return (() => {
                    dispatch({ type: actions.LOAD_USER, user: {} })
                })
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('GitHub sign-in failed:', error.message);
            localStorage.removeItem('token');
            navigate('/login');
        }
    },
    googleSignIn: async ({ navigate, dispatch }) => {
        const token = localStorage.getItem('token');
        const isToken = token === null || token === '';
        if (auth.currentUser && !isToken) {
            navigate('/Main');
            return;
        }
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            localStorage.setItem('token', token);
            const user = result.user;
            const newUser = {
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber,
                image_url: user.photoURL
            }
            const body = {
                user_id: uuidv4(),
                email: user.email,
                name: user.displayName,
                image_url: user.photoURL,
                provider: 'google',
                token: token,
            };
            const response = await axios.post(`${url}/auth/sso`, body, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response && response?.status === utils.statusCode) {
                const userData = await response.data;
                localStorage.setItem('user', JSON.stringify(newUser));
                localStorage.setItem('id', userData.user_id);
                dispatch({ type: actions.LOAD_USER, user: user })
                navigate('/Main');
                return (() => {
                    dispatch({ type: actions.LOAD_USER, user: {} })
                })
            } else {
                throw new Error('Failed to fetch user data');
            }
        } catch (error) {
            console.error('Google sign-in failed:', error);
            localStorage.removeItem('token');
            navigate('/login');
        }
    },
    isValidJSONString: (value) => {
        try {
            JSON.parse(value);
            return true;
        } catch (error) {
            return false;
        }
    },
    getLocationFromIP: async () => {
        try {
            const response = await fetch('http://ip-api.com/json/');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching location from IP:', error);
        }
    }

};

export default utils;