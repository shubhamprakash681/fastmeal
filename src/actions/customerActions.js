import { City, State } from "country-state-city";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { firebaseApp } from "../firebase/firebase";
import { currentTimeGenerator } from "../utils/dayjs";

const db = getFirestore(firebaseApp);

export const testAdd = async () => {
  const citiesRef = collection(db, "cities");

  await setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco",
    state: "CA",
    country: "USA",
    capital: false,
    population: 860000,
    regions: ["west_coast", "norcal"],
  });
  await setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles",
    state: "CA",
    country: "USA",
    capital: false,
    population: 3900000,
    regions: ["west_coast", "socal"],
  });
  await setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.",
    state: null,
    country: "USA",
    capital: true,
    population: 680000,
    regions: ["east_coast"],
  });
  await setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo",
    state: null,
    country: "Japan",
    capital: true,
    population: 9000000,
    regions: ["kanto", "honshu"],
  });
  await setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing",
    state: null,
    country: "China",
    capital: true,
    population: 21500000,
    regions: ["jingjinji", "hebei"],
  });

  console.log("TEst uploaded");
};

export const testRead = async () => {
  const docRef = doc(db, "cities", "jku");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

export const fetchCurrentUserDataFromDB = (user) => async (dispatch) => {
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let userData = docSnap.data();
    console.log("Users Document data:", userData);

    userData.lastLogin = currentTimeGenerator();

    const usersRef = collection(db, "users");

    try {
      await setDoc(doc(usersRef, user.uid), userData);
      console.log("USER MODIFIED SUCCESSFULY");
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: "GET_CURRENT_USER_DATA",
      payload: userData,
    });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document, CREATING NEW USER!");

    const usersRef = collection(db, "users");

    console.log("here, user is:", user);

    const newDocObj = {
      uid: user.uid,
      role: "customer",
      joiningDate: currentTimeGenerator(),
      profile: {
        name: user.displayName,
        email: user.email,
        avtar: user.photoURL,
        gender: "",
        phoneNumber: user.phoneNumber,
        address: {},
      },
      cart: [],
      orders: [],
      wishlist: [],
      lastLogin: currentTimeGenerator(),
    };

    try {
      await setDoc(doc(usersRef, user.uid), newDocObj);
      console.log("USER CREATED SUCCESSFULY");

      dispatch({
        type: "GET_CURRENT_USER_DATA",
        payload: newDocObj,
      });
    } catch (err) {
      console.log(err);
    }
  }
};

export const updateUserDataInDb = (user, updatedUser) => async (dispatch) => {
  console.log("executing here");
  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const usersRef = collection(db, "users");

    try {
      await setDoc(doc(usersRef, user.uid), updatedUser);
      console.log("USER MODIFIED SUCCESSFULY");
    } catch (err) {
      console.log(err);
    }

    dispatch({
      type: "GET_CURRENT_USER_DATA",
      payload: updatedUser,
    });
  } else {
    console.log(`No user with UID: ${user.uid} exists`);
  }
};

export const fetchAllStateList = (countryCode) => (dispatch) => {
  const fetchedData = State.getStatesOfCountry(countryCode);
  // console.log("fetchedData", fetchedData);

  let ls = [];
  fetchedData.forEach((item) => {
    ls.push({
      label: item.name,
      value: item.isoCode,
      countryCode: item.countryCode,
    });
  });

  dispatch({
    type: "FETCH_STATE_LIST",
    payload: ls,
  });
};

export const fetchAllCityList_User = (countryCode, stateCode) => (dispatch) => {
  const fetchedData = City.getCitiesOfState(countryCode, stateCode);
  // console.log(fetchedData);

  let ls = [];
  fetchedData.forEach((item) => {
    ls.push({
      label: item.name,
      value: item.name,
      stateCode: item.stateCode,
      countryCode: item.countryCode,
    });
  });

  dispatch({
    type: "FETCH_CITY_LIST_USER",
    payload: ls,
  });
};

export const getAllProductsFromDb = () => async (dispatch) => {
  const collectionRef = collection(db, "foodItems");
  const querySnapshot = await getDocs(collectionRef);

  let ls = [];

  querySnapshot.forEach((doc) => {
    ls.push(doc.data());
  });

  dispatch({
    type: "FETCH_ALL_PRODUCTS",
    payload: ls,
  });
};
