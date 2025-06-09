import { useState } from "react";
import { Link } from "react-router-dom";
import type { InputType, SiginData } from "../../types/type";
import FormAuth from "../../Components/FormAuth/FormAuth";
// assets
import backgroud from "../../assets/images/form_background_2.png";
import line from "../../assets/images/distract_line.png";
import { Icon } from "@iconify/react/dist/iconify.js";

const mini_avatars = [
  "/assets/images/mini_avatar/avatar_1.png",
  "/assets/images/mini_avatar/avatar_2.png",
  "/assets/images/mini_avatar/avatar_3.png",
  "/assets/images/mini_avatar/avatar_4.png",
  "/assets/images/mini_avatar/avatar_5.png",
  "/assets/images/mini_avatar/avatar_6.png",
  "/assets/images/mini_avatar/avatar_7.png",
  "/assets/images/mini_avatar/avatar_8.png",
];

const firstForm: Array<InputType> = [
  {
    label: "Email ",
    type: "email",
    placeholder: "example@gmail.com",
    id: "email",
  },
  {
    label: "Full Name ",
    type: "text",
    placeholder: "Example Name",
    id: "fullName",
  },
  {
    label: "Password (6 or more characters) ",
    type: "password",
    placeholder: "********",
    id: "password",
  },
  {
    label: "Confirm Password ",
    type: "password",
    placeholder: "********",
    id: "ConfirmPassword",
  },
];

const secondForm: Array<InputType> = [
  {
    label: [
      "/assets/images/mini_avatar/default_avatar.png",
      "/assets/images/mini_avatar/camer_icon.png",
    ],
    type: "file",
    id: "profile",
  },
  {
    label: "UserName ",
    type: "text",
    placeholder: "Example Name",
    id: "userName",
  },
];

export default function Login() {
  const [data, setData] = useState<SiginData>({
    email: "",
    fullName: "",
    password: "",
    ConfirmPassword: "",
    userName: "",
    profile: null,
  });

  const [count, setCount] = useState<number>(0);

  const formInputs = count === 0 ? firstForm : secondForm;

  const btnContent = count === 0 ? "Join" : "Set up profile";

  console.log(data);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <div
        className="animate-swipe-up flex h-screen w-[40%] flex-col items-center gap-8 p-8"
        key={count}
      >
        {
          count === 0 ? (
            <>
              {/* the first form */}
              <h1 className="text-[#6F4D58]">DashDah.</h1>
              <div className="flex w-full grow-1 flex-col items-center space-y-2">
                <h2 className="heading">Join DashDah.</h2>
                <div className="flex space-x-[-12px]">
                  {mini_avatars.map((avatar, index) => (
                    <img key={index} src={avatar} className={`z-[${index}]`} />
                  ))}
                </div>
                <p className="text_para">Join these and 5005 other traders</p>
                <FormAuth<SiginData>
                  inputs={formInputs}
                  btn={btnContent}
                  setData={setData}
                  setCount={setCount}
                  counter={1}
                />

                <p className="text-sm text-[#5C5C5C] select-none">
                  Joined Already?
                  <span className="cursor-pointer text-[#B87E8E] underline">
                    <Link to={"/auth/login"}> Sign in</Link>
                  </span>
                </p>
              </div>
            </>
          ) : (
            /* end the first form */
            /* the second form */
            <>
              <div className="flex cursor-pointer items-center justify-center self-start rounded-full bg-[#F6F6F6]">
                <Icon
                  icon="material-symbols-light:keyboard-arrow-left"
                  onClick={() => setCount((prev) => prev - 1)}
                  className="text-5xl"
                />
              </div>
              <h1 className="heading self-start">Set up your profile</h1>
              <p className="text_para self-start">
                Add a nice headshot of you and a name to blend in!
              </p>
              <FormAuth<SiginData>
                inputs={formInputs}
                btn={btnContent}
                setData={setData}
                setCount={setCount}
                counter={1}
              >
                <p className="text_para">
                  Name should not be more than 15 characters
                </p>
              </FormAuth>
            </>
          )
          /* end the second form */
        }
      </div>

      <div className="relative flex h-screen w-[60%] flex-col rounded-r-2xl bg-[#fff2f2] p-8">
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
        <div className="absolute right-0 rotate-180">
          <img src={line} alt="" />
        </div>
      </div>
    </div>
  );
}
