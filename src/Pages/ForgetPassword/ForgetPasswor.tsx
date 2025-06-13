import FormAuth from "../../Components/FormAuth/FormAuth";
import { Link } from "react-router-dom";
import type { InputType, ForgetPasswordData } from "../../types/type";
import FormOtp from "../../Components/FormOtp/FormOtp";
// assets
import backgroud_1 from "../../assets/images/form_background.png";
import backgroud_2 from "../../assets/images/form_background_2.png";
import line from "../../assets/images/distract_line.png";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const firstForm: Array<InputType> = [
  {
    label: "Email ",
    type: "email",
    placeholder: "example@gmail.com",
    id: "email",
  },
];

const secondForm: Array<InputType> = [
  {
    label: "New Password (6 or more characters) ",
    type: "password",
    placeholder: "********",
    id: "password",
  },
  {
    label: "Confirm New Password ",
    type: "password",
    placeholder: "********",
    id: "ConfirmNewPassword",
  },
];

export default function ForgetPasswor() {
  const [data, setData] = useState<ForgetPasswordData>({
    email: "",
    otp: [],
    password: "",
    ConfirmNewPassword: "",
  });

  const [count, setCount] = useState<number>(0);

  const formInputs = count === 0 ? firstForm : secondForm;

  const description =
    count === 0 ? (
      <>
        Enter your email address and we will send you <br />a link to create a
        new password
      </>
    ) : (
      <>
        Enter and confirm your new password <br /> to reset your credentials
      </>
    );

  const btnContent =
    count === 0 ? (
      <div className="flex items-center justify-center gap-3">
        <Icon icon="cil:send" /> Send
      </div>
    ) : (
      <div className="flex items-center justify-center gap-3">
        <Icon icon="tabler:lock-check" /> Reset Password
      </div>
    );

  const background = count === 1 ? backgroud_2 : backgroud_1;

  const content =
    count === 1 ? (
      <FormOtp<ForgetPasswordData>
        email={data.email}
        setData={setData}
        setCount={setCount}
        counter={2}
      />
    ) : (
      <>
        <h1 className="text-[#6F4D58]">DashDah.</h1>

        <div className="space-y-6 text-center">
          <h2 className="heading">Forgot your password</h2>
          <p className="text_para">{description}</p>
        </div>

        <FormAuth<ForgetPasswordData>
          inputs={formInputs}
          btn={btnContent}
          setData={setData}
          setCount={setCount}
          counter={2}
        />

        <p className="text-sm text-[#5C5C5C] select-none">
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/login"}>Back to sign in</Link>
          </span>
        </p>
      </>
    );

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      <div className="relative hidden h-screen w-[60%] flex-col rounded-r-2xl bg-[#fff2f2] p-8 lg:flex">
        <h1 className="heading">
          Share <br /> valuable resources
        </h1>
        <p className="text_para">
          Now you can connect with fellow <br />
          traders around the world.
        </p>
        <div className="scale-125 self-end p-10">
          <img src={background} alt="" />
        </div>
        <div className="absolute left-0">
          <img src={line} alt="" />
        </div>
      </div>
      {/* // re-trigger animation on count change */}
      <div
        className={`animate-swipe-up h-screen w-full lg:w-[40%] ${count !== 1 && "flex flex-col items-center gap-8 p-8"} `}
        key={count}
      >
        {content}
      </div>
    </div>
  );
}
