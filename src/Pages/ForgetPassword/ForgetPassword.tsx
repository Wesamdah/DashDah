import FormAuth from "../../Components/FormAuth/FormAuth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { ForgetPasswordData } from "../../types/auth";
import type { InputType } from "../../types/form";
import FormOtp from "../../Components/FormOtp/FormOtp";
import { instance } from "../../api/axiosInstance";
import { useLoading } from "../../Context/LoadingContext";
// assets
import backgroud_1 from "../../assets/images/form_background.png";
import backgroud_2 from "../../assets/images/form_background_2.png";
import line from "../../assets/images/distract_line.png";

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
    id: "newPassword",
  },
  {
    label: "Confirm New Password ",
    type: "password",
    placeholder: "********",
    id: "confirmPassword",
  },
];

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [data, setData] = useState<ForgetPasswordData>({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [count, setCount] = useState<number>(0);
  const { setLoading } = useLoading();

  const containerRef = useRef<HTMLDivElement>(null);

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

  const handleEmail: () => void = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/auth/forget-password", {
        email: data.email,
      });
      setCount(count + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleOtp = async (dataToSend: { email: string; otp: string }) => {
    setLoading(true);
    try {
      const response = await instance.post("/auth/verify-otp", dataToSend);
      setCount((prev) => prev + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePassword: () => void = async () => {
    setLoading(true);
    try {
      const response = await instance.patch("/auth/reset-password", data);
      setLoading(false);
      navigate("/auth/login");
    } catch (error) {
      setLoading(false);
    }
  };

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
      <FormOtp email={data.email} setCount={setCount} handleOtp={handleOtp} />
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
          counter={2}
          sendData={count === 0 ? handleEmail : handlePassword}
        />

        <p className="text-sm text-[#5C5C5C] select-none">
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/login"}>Back to sign in</Link>
          </span>
        </p>
      </>
    );

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    container.classList.remove("animate-swipe-up");

    // recalculate the pixels of the div ,
    // so that will tell the dom we created a new div cuz you calcalt the width and highet and the pixles
    // so when i add the animation to the new div it gonna run
    void container.offsetWidth;

    container.classList.add("animate-swipe-up");
  }, [count]);

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
        <div className="absolute left-0 hidden xl:block">
          <img src={line} alt="" />
        </div>
      </div>
      {/* // re-trigger animation on count change */}
      <div
        ref={containerRef}
        className={`animate-swipe-up h-screen w-full lg:w-[40%] ${count !== 1 && "flex flex-col items-center gap-8 p-8"} `}
      >
        {content}
      </div>
    </div>
  );
}
