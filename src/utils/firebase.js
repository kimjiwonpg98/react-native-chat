import * as firebase from "firebase";
import config from "../../firebase.json";

const app = firebase.initalizeApp(config);

const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};
