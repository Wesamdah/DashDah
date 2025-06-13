import { Icon } from "@iconify/react/dist/iconify.js";
import type { SigupData, InputType } from "../../types/type";
import FormAuth from "../../Components/FormAuth/FormAuth";
import type { Dispatch, SetStateAction } from "react";

const inputs: Array<InputType> = [
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

interface Props {
  setData: Dispatch<SetStateAction<SigupData>>;
  setCount: Dispatch<SetStateAction<number>>;
}

export default function ProfileSetupForm({ setData, setCount }: Props) {
  return (
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
      <FormAuth<SigupData>
        inputs={inputs}
        btn="Set up profile"
        setData={setData}
        setCount={setCount}
        counter={2}
      >
        <p className="text_para">Name should not be more than 15 characters</p>
      </FormAuth>
    </>
  );
}
