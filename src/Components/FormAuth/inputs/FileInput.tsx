import type { ChangeEvent } from "react";
import type { InputType } from "../../../types/form";

interface Props {
  userImage: string;
  input: Extract<InputType, { type: "file" }>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function FileInput({ userImage, input, handleChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      <label htmlFor={input.id} className="w-fit font-semibold">
        <div className="relative h-25 w-25 justify-self-center rounded-full">
          <img
            src={userImage}
            alt="default_avatar"
            className="h-full w-full rounded-full"
          />
          <img
            src={input.label[1]}
            alt="icon"
            className="absolute right-0 bottom-0 h-12 w-12 rounded-full"
          />
        </div>
      </label>
      <input
        type={input.type}
        id={input.id}
        onChange={handleChange}
        className="hidden w-full rounded-lg border border-[#ddd] p-2 focus:outline-none"
      />
    </div>
  );
}
