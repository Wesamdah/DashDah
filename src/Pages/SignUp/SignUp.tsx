import { useState } from "react";
import type { SigupData } from "../../types/auth";
import FormOtp from "../../Components/FormOtp/FormOtp";
import JoinForm from "./JoinForm";
import ProfileSetupForm from "./ProfileSetupForm";
import { instance } from "../../api/axiosInstance";
import { useLoading } from "../../Context/LoadingContext";
import { useNavigate } from "react-router-dom";
// assets
import backgroud from "../../assets/images/form_background_2.png";
import line from "../../assets/images/distract_line.png";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState<SigupData>({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    username: "",
    avatar: null,
  });

  const [count, setCount] = useState<number>(0);

  const { setLoading } = useLoading();

  // const handleSignUp: (dataToSend: SigupData) => void = async (dataToSend) => {
  const handleSignUp: () => void = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("fullName", data.fullName);
      formData.append("password", data.password);
      formData.append("confirmPassword", data.confirmPassword);
      formData.append("username", data.username);

      // فقط إذا كان هناك صورة مرفقة
      if (data.avatar) {
        formData.append("avatar", data.avatar);
      }

      const response = await instance.post("/auth/register", formData);
      console.log(response.data);
      setCount(count + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOtp = async (dataToSend: { email: string; otp: string }) => {
    setLoading(true);
    try {
      const response = await instance.post("/auth/verify-email", dataToSend);

      console.log(response.data);
      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className={`animate-swipe-up h-screen w-full lg:w-[40%] ${count !== 2 && "flex flex-col items-center gap-8 p-8"} no-scrollbar overflow-y-scroll`}
        key={count}
      >
        {count === 0 ? (
          <JoinForm setData={setData} setCount={setCount} />
        ) : count === 1 ? (
          <ProfileSetupForm
            setData={setData}
            setCount={setCount}
            sendData={handleSignUp}
          />
        ) : (
          <FormOtp
            email={data.email}
            setCount={setCount}
            handleOtp={handleOtp}
          />
        )}
      </div>

      <div className="relative hidden h-screen w-[60%] flex-col rounded-l-2xl bg-[#fff2f2] p-8 lg:flex">
        <h1 className="heading">
          Share <br /> valuable resources
        </h1>
        <p className="text_para">
          Now you can connect with fellow <br />
          traders around the world.
        </p>
        <div className="scale-125 self-start p-10">
          <img src={backgroud} alt="" />
        </div>
        <div className="absolute right-0 hidden rotate-180 xl:block">
          <img src={line} alt="" />
        </div>
      </div>
    </div>
  );
}
