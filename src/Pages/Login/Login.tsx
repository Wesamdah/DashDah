import { useState } from "react";
import FormAuth from "../../Components/FormAuth/FormAuth";
import type { InputType, LoginData } from "../../types/type";
import { Link } from "react-router-dom";
// assets
import backgroud from "../../assets/images/form_background.png";
import line from "../../assets/images/distract_line.png";

const inputs: Array<InputType> = [
  {
    label: "Email ",
    type: "email",
    placeholder: "example@gmail.com",
    id: "email",
  },
  {
    label: "Password (6 or more characters) ",
    type: "password",
    placeholder: "********",
    id: "password",
  },
];

export default function Login() {
  const [data, setData] = useState<LoginData>({ email: "", password: "" });

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div className="relative hidden h-screen w-[60%] flex-col rounded-r-2xl bg-[#fff2f2] p-8 lg:flex">
        <h1 className="heading">
          Share <br /> valuable resources
        </h1>
        <p className="text_para">
          Now you can connect with fellow <br />
          traders around the world.
        </p>
        <div className="scale-125 self-end p-10">
          <img src={backgroud} alt="" />
        </div>
        <div className="absolute left-0 hidden xl:block">
          <img src={line} alt="" />
        </div>
      </div>

      <div className="animate-swipe-up flex h-screen w-full flex-col items-center gap-8 p-8 lg:w-[40%]">
        <h1 className="text-[#6F4D58]">DashDah.</h1>
        <div className="space-y-6 text-center">
          <h2 className="heading">Sign In</h2>
          <p className="text_para">Sign in to get started</p>
        </div>
        <FormAuth<LoginData> inputs={inputs} btn="Sign In" setData={setData}>
          <p className="self-end font-semibold text-[#6A3851]">
            <Link to={"/auth/forgetpassword"}>Forgot Password?</Link>
          </p>
        </FormAuth>
        <p className="text-sm text-[#5C5C5C] select-none">
          Don't have an account?{" "}
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/signup"}>join</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
