import { Link } from "react-router-dom";
import type { SigupData } from "../../types/auth";
import type { InputType } from "../../types/form";
import FormAuth from "../../Components/FormAuth/FormAuth";
import type { Dispatch, SetStateAction } from "react";

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

const inputs: Array<InputType> = [
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
    id: "confirmPassword",
  },
];

interface Props {
  setData: Dispatch<SetStateAction<SigupData>>;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function JoinForm({ setData, setCount }: Props) {
  return (
    <>
      <h1 className="text-[#6F4D58]">DashDah.</h1>
      <div className="flex w-full grow-1 flex-col items-center space-y-2">
        <h2 className="heading">Join DashDah.</h2>
        <div className="flex space-x-[-12px]">
          {mini_avatars.map((avatar, index) => (
            <img key={index} src={avatar} className={`z-[${index}]`} />
          ))}
        </div>
        <p className="text_para">Join these and 5005 other traders</p>
        <FormAuth<SigupData>
          inputs={inputs}
          btn="Join"
          setData={setData}
          setCount={setCount}
          counter={2}
        />

        <p className="text-sm text-[#5C5C5C] select-none">
          Joined Already?
          <span className="cursor-pointer text-[#B87E8E] underline">
            <Link to={"/auth/login"}> Sign in</Link>
          </span>
        </p>
      </div>
    </>
  );
}
