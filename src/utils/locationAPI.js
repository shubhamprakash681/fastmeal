// GeoApify

import axios from "axios";
import { toast } from "react-toastify";
const API_KEY = process.env.REACT_APP_URI_GEOAPIFY_APIKEY;
export const getLocationAutocompleteData = async (text = "Mosco") => {
  const config = {
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=${API_KEY}`,
    headers: {},
  };
  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    console.log(err);
    toast.error(err, {
      toastId: err,
    });
  }
};

export const getCurrentLocation = async (
  lat = "51.21709661403662",
  lon = "6.7782883744862374"
) => {
  // console.log("here, lat: ", lat, "lon: ", lon);
  const config = {
    method: "get",
    url: `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=7f07aee7f9ed44be8af331eb6c806790`,
    headers: {},
  };

  try {
    const res = await axios(config);
    return res;
  } catch (err) {
    console.log(err);
    toast.error(err, {
      toastId: err,
    });
  }
};
