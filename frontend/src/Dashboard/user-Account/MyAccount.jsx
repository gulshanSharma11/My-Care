import { useContext, useState , useEffect} from "react";
import userImg from "../../assets/images/doctor-img01.png";
import { authContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import useGetProfile from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import MyBookings from "./MyBookings";
import Profile from "./profile";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import ImageUploader from './uploadFiles';
const MyAccount = () => {
  const { dispatch } = useContext(authContext);
  const [tab, setTab] = useState("booking");
  const {
    data: userData,
    loading,
    error,
  } = useGetProfile(`${BASE_URL}/users/profile/me`);
  console.log(userData, "userdata");
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("Successfully Logout");
  };


  
  return (
    <>
      <section>
        <div className="max-w-[1170px] px-5 mx-auto">
          {loading && !error && <Loading />}
          {error && !loading && <Error errMessage={error} />}
          {!loading && !error && (
            <div className="grid md:grid-cols-3 gap-10">
              <div className="pb-[50px] px-[30px] rounded-md">
                <div className="flex items-center justify-center">
                  <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-primaryColor">
                    <img
                      src={userImg}
                      alt=""
                      className="w-full h-full rounded-full"
                    />
                  </figure>
                </div>

                <div className="text-center mt-4">
                  <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                    Gullu Pandit
                  </h3>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    pandit_ji@gmail.com
                  </p>
                  <p className="text-textColor text-[15px] leading-6 font-medium">
                    Blood Group:{" "}
                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                      AB+
                    </span>
                  </p>
                </div>
                <div className="mt-[50px] md:mt-[100px]">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white"
                  >
                    Logout
                  </button>
                  <button className="w-full bg-red-600 mt-4 p-3 text-[16px] leading-7 rounded-md text-white">
                    Delete Account
                  </button>
                </div>
              </div>
              <div className="md:col-span-2 md:px-[30px]">
                <div>
                  <button
                    onClick={() => setTab("bookings")}
                    className={`${
                      tab === "bookings" &&
                      "bg-primaryColor text-white font-normal"
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                  >
                    My Booking
                  </button>

                  <button
                    onClick={() => setTab("settings")}
                    className={`${
                      tab === "settings" &&
                      "bg-primaryColor text-white font-normal"
                    } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
                  >
                    Profile Setting
                  </button>
                  <button
          onClick={() => setTab("upload")}
          className={`${
            tab === "upload" && "bg-primaryColor text-white font-normal"
          } p-2 mr-5 px-5 rounded-md text-headingColor font-semibold text-[16px] leading-7 border border-solid border-primaryColor`}
        >
          Upload Files
        </button>
                </div>
                {tab === "bookings" && <MyBookings />}
                {tab === "settings" && <Profile user={userData} />}
                {tab === "upload" && <ImageUploader />}
              </div>
            </div>
          )}
        </div>
      </section>
      
    </>
  );
};

export default MyAccount;
