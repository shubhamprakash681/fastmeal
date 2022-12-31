import { City } from "country-state-city";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";

// firestore
import { firebaseApp } from "../firebase/firebase";
import { currentTimeGenerator } from "../utils/dayjs";
const db = getFirestore(firebaseApp);

export const fetchAllCityList = (countryCode) => (dispatch) => {
  const fetchedData = City.getCitiesOfCountry(countryCode);

  // console.log(fetchedData)
  let ls = [];

  fetchedData.forEach((item) => {
    ls.push({
      label: item.name + ", " + item.stateCode + ", " + item.countryCode,
      value: item.name + "_" + item.stateCode,
    });
  });
  // console.log('ls: ', ls);

  dispatch({
    type: "FETCH_CITY_LIST",
    payload: ls,
  });
};

export const addFoodToDb = async (
  title,
  image,
  calorieCount,
  price,
  selectedCategory,
  selectedCity,
  stock
) => {
  try {
    await addDoc(collection(db, "foodItems"), {
      title,
      image,
      calorieCount,
      price,
      selectedCategory,
      selectedCity,
      stock,
      timeStamp: currentTimeGenerator(),
    });

    console.log("Food item added to db successfully");
  } catch (err) {
    console.log(err);
    alert(err);
  }
};

export const fetchAllUsersDataFromDb = () => async (dispatch) => {
  const collectionRef = collection(db, "users");
  const querySnapshot = await getDocs(collectionRef);

  let ls = [];
  querySnapshot.forEach((doc) => {
    ls.push(doc.data());
  });

  dispatch({
    type: "GET_ALL_USERS_DATA",
    payload: ls,
  });
};

export const updateUserDataInDb_Admin =
  (allUser, currUser, updatedUser) => async (dispatch) => {
    const docRef = doc(db, "users", currUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const usersRef = collection(db, "users");

      try {
        await setDoc(doc(usersRef, currUser.uid), updatedUser);
        console.log("USER MODIFIED SUCCESSFULY");

        let ls = [];
        allUser.forEach((user) => {
          if (user.uid === currUser.uid) {
            ls.push(updatedUser);
          } else {
            ls.push(user);
          }
        });

        dispatch({
          type: "GET_ALL_USERS_DATA",
          payload: ls,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log(`No user with UID: ${currUser.uid} exists`);
    }
  };
