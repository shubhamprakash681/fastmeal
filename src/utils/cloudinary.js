import axios from "axios";
import imageCompression from "browser-image-compression";

export const getCloudImgURI = async (file, maxWidthOrHeight = 720, folder='') => {
  const uploadPreset = process.env.REACT_APP_URI_CLOUDINARY_UPLOAD_PRESET;
  const cloudName = process.env.REACT_APP_URI_CLOUDINARY_CLOUD_NAME;

  console.log("originalFile instanceof Blob", file instanceof Blob); // true
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: maxWidthOrHeight,
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    console.log(
      "compressedFile instanceof Blob",
      compressedFile instanceof Blob
    ); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB

    const formData = new FormData();
    formData.append("file", compressedFile);
    formData.append("upload_preset", uploadPreset);
    if (folder.length > 1) {
      console.log('satisfied');
      formData.append('folder', folder)
    }

    const data = axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
