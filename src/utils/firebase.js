import * as firebase from "firebase";
import config from "../../firebase.json";

if (!firebase.apps.length) firebase.initializeApp(config);
const app = firebase.app();
const Auth = app.auth();

export const login = async ({ email, password }) => {
  const { user } = await Auth.signInWithEmailAndPassword(email, password);
  return user;
};

export const signup = async ({ email, password, name, photoUrl }) => {
  const { user } = await Auth.createUserWithEmailAndPassword(email, password);
  const storageUrl = photoUrl.startsWith("https")
    ? photoUrl
    : await uploadImage(photoUrl);

  await user.updateProfile({
    displayName: name,
    photoURL: storageUrl,
  });

  return user;
};

const uploadImage = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = (e) => {
      reject(new TypeError("Network request failed"));
    };

    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const user = Auth.currentUser();
  const ref = app.storage().ref(`/profile/${user.id}/photo.jpg`);
  const snapshot = await ref.put(blob, { contentType: "image/png" });

  blob.close();
  return await snapshot.ref.getDownloadURL();
};
