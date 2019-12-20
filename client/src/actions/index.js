import AuthService from "../AuthService";
import { navigate } from "@reach/router"

const API_URL = process.env.REACT_APP_API_URL;
const Auth = new AuthService(`${API_URL}/users/authenticate`);

/******************************************************
  Actions for Notifications
 ******************************************************/
export const showAlert = (title, text, level) => ({
    type: 'SHOW_ALERT',
    title: title,
    text: text,
    level: level
});

export const showAndHideAlert = (title, text, level, delay = 10000) => async function (dispatch) {
    console.log("Delay of " + delay);
    dispatch(showAlert(title, text, level));
    setTimeout(_ => dispatch(hideAlert()), delay);
};

export const hideAlert = (title, text) => ({
    type: 'HIDE_ALERT',
});


/******************************************************
  Actions for User credentials and Login / logout
 ******************************************************/
export const addUserCredentials = (username) => ({
    type: 'ADD_USER_CRED',
    username: username
});

export const removeUserCredentials = (username) => ({
    type: 'REMOVE_USER_CRED'
});

export const login = (username, password) => async function (dispatch) {
    try {
        await Auth.login(username, password);
        dispatch(addUserCredentials(username));
        navigate("/"); // Front page
    } catch(e) {
        dispatch(showAndHideAlert("Login Failed", e.message, "error"));
    }
};

export const logout = _ => async function (dispatch) {
    Auth.logout();
    dispatch(removeUserCredentials());
};


/******************************************************
  Actions for handling questions and answers.
 ******************************************************/
export const replaceBooks = books => ({
    type: 'ADD_BOOKS',
    books: books
});

export const replaceCategories = categories => ({
    type: 'ADD_CATEGORIES',
    categories: categories
})

export const loadBooks = _ => async function (dispatch) {
    try {
        const url = `${API_URL}/books`;
        const response = await Auth.fetch(url);
        const data = await response.json();
        dispatch(replaceBooks(data));
    } catch (e) {
        console.error(e);
        dispatch(showAndHideAlert("Error loading questions", e.message, "error"));
    }
};

export const loadCategories = _ => async function (dispatch) {
    try {
        const url = `${API_URL}/categories`;
        const response = await Auth.fetch(url);
        const data = await response.json();
        dispatch(replaceCategories(data));
    } catch (e) {
        console.error(e);
        dispatch(showAndHideAlert("Error loading categories", e.message, "error"));
    }
};

export const postBook = text => async function(dispatch) {
    if (text === "") return;
    try {
        const newQuestion = { text: text };
        const response = await Auth.fetch(`${API_URL}/books`, {
            method: "POST",
            body: JSON.stringify(newQuestion)
        });
        if (response.status === 401) {
            alert("Please login before posting a new booksale");
            navigate("/login");
        } else {
            await response.json();
            dispatch(loadBooks());
            dispatch(loadCategories());
        }
    } catch (e) {
        dispatch(showAndHideAlert("Send question error", e.message, "error"));
        console.error(e);
    }
};
