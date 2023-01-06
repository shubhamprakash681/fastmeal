import { City } from "country-state-city";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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

export const addFoodToDb =
  (
    title,
    image,
    calorieCount,
    price,
    selectedCategory,
    selectedCity,
    isUpdating = false
  ) =>
  async (dispatch) => {
    const foodItemsRef = collection(db, "foodItems");
    try {
      const time = currentTimeGenerator();
      await setDoc(doc(foodItemsRef, image.asset_id), {
        title,
        image,
        calorieCount,
        price,
        selectedCategory,
        selectedCity,
        timeStamp: time,
      });

      dispatch({
        type: "ADD_FOOD",
        payload: [
          {
            title,
            image,
            calorieCount,
            price,
            selectedCategory,
            selectedCity,
            timeStamp: time,
          },
          isUpdating,
        ],
      });

      console.log("Food item added to db successfully");
      toast.success("Food item added to db successfully", {
        toastId: "food-added",
      });
    } catch (err) {
      console.log(err);
      // alert(err);
      toast.error(err, {
        toastId: "food-add-failed",
      });
    }
  };
export const deleteFoodInDb =
  (foodDocUID, currAllProduts) => async (dispatch) => {
    console.log("called, foodDocUID: ", foodDocUID);

    try {
      await deleteDoc(doc(db, "foodItems", foodDocUID));

      let ls = [];
      currAllProduts.forEach((product) => {
        if (product.image.asset_id !== foodDocUID) {
          ls.push(product);
        }
      });

      dispatch({
        type: "FETCH_ALL_PRODUCTS",
        payload: ls,
      });

      toast.success("Food Item Deleted Successfully", {
        toastId: "food-del-passed",
      });
    } catch (err) {
      console.log(err);
      toast.error(err, {
        toastId: "food-del-failed",
      });
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
        toast.success("Success");

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
        toast.error(err, {
          toastId: "user-update-err",
        });
      }
    } else {
      console.log(`No user with UID: ${currUser.uid} exists`);
      toast.warn(`No user with UID: ${currUser.uid} exists`, {
        toastId: "user-not-found",
      });
    }
  };
