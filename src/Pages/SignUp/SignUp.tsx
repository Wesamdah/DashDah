import { useState } from "react";
import type { SigupData } from "../../types/type";
import FormOtp from "../../Components/FormOtp/FormOtp";
import JoinForm from "./JoinForm";
import ProfileSetupForm from "./ProfileSetupForm";
// assets
import backgroud from "../../assets/images/form_background_2.png";
import line from "../../assets/images/distract_line.png";

export default function Login() {
  const [data, setData] = useState<SigupData>({
    email: "",
    fullName: "",
    password: "",
    ConfirmPassword: "",
    userName: "",
    profile: null,
  });

  const [count, setCount] = useState<number>(0);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className={`animate-swipe-up h-screen w-full lg:w-[40%] ${count !== 2 && "flex flex-col items-center gap-8 p-8"} no-scrollbar overflow-y-scroll`}
        key={count}
      >
        {count === 0 ? (
          <JoinForm setData={setData} setCount={setCount} />
        ) : count === 1 ? (
          <ProfileSetupForm setData={setData} setCount={setCount} />
        ) : (
          <FormOtp<SigupData>
            email={data.email}
            setData={setData}
            setCount={setCount}
            counter={2}
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
