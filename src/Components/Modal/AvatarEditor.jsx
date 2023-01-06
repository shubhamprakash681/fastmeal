import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateUserDataInDb } from "../../actions/customerActions";
import { getCloudImgURI } from "../../utils/cloudinary";

const AvatarEditor = ({ setOpenAvtarEditor = true }) => {
  const [selectedImage, setSelectedImage] = useState(false);
  const [imgURL, setImgURL] = useState("");
  const [imgCloudinaryURI, setImgCloudinarryURI] = useState("");

  const currentUserData = useSelector(
    (state) => state.userReducer.currentUserData
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (imgCloudinaryURI.asset_id) {
      // uploaded to cloudinary successfully

      // console.log("hjf, cud: ", currentUserData);
      let modData = JSON.parse(JSON.stringify(currentUserData));
      modData.profile.avtar = imgCloudinaryURI.secure_url;

      dispatch(updateUserDataInDb(currentUserData, modData));

      setSelectedImage(false);
      setImgURL("");
      setImgCloudinarryURI("");
      setOpenAvtarEditor(false);

      console.log("Profile pic updated successfully");
      toast.success("Profile pic updated successfully");
    }
  }, [imgCloudinaryURI]);

  return (
    <>
      <div className="dialog-box-cont">
        <div className="dialog-box">
          <div className="dialog-box-head">Change your profile pic</div>
          <div className="img-pic-space">
            <div className="avt-prev">
              {selectedImage ? (
                <>
                  <img
                    id="new-img"
                    src={imgURL}
                    onLoad={() => {
                      URL.revokeObjectURL(imgURL);
                    }}
                    alt="img"
                  />
                </>
              ) : (
                <>
                  <div>Enter a new image</div>
                </>
              )}
            </div>
            <input
              type="file"
              name=""
              id=""
              accept="image/*"
              onChange={(e) => {
                const imgFile = e.target.files[0];
                setImgURL(URL.createObjectURL(imgFile));

                setSelectedImage(imgFile);
              }}
            />
          </div>
          <div className="dialog-box-footer">
            <button className="btn" onClick={(e) => setOpenAvtarEditor(false)}>
              Close
            </button>
            <button
              className="btn"
              onClick={(e) => {
                if (selectedImage) {
                  getCloudImgURI(selectedImage, 1080, "asset").then((res) => {
                    //   console.log("fetchedData: ", res);

                    setImgCloudinarryURI({
                      asset_id: res.data.asset_id,
                      secure_url: res.data.secure_url,
                    });
                  });
                }
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvatarEditor;
