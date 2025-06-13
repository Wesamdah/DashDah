import {
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type JSX,
  type ReactNode,
  type SetStateAction,
} from "react";
import { useRef } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import type { InputType } from "../../types/type";

interface Props<T> {
  inputs: Array<InputType>;
  btn: string | JSX.Element;
  children?: ReactNode;
  setData: Dispatch<SetStateAction<T>>;
  setCount?: Dispatch<SetStateAction<number>>;
  counter?: number;
}

export default function FormAuth<T>({
  inputs,
  btn,
  children,
  setData,
  setCount,
  counter,
}: Props<T>) {
  const [typo, setTypo] = useState<string>("password");
  const [userImage, setUserImage] = useState<string | null>(null);

  let userData = useRef<T>({} as T);
  const handleChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event,
  ) => {
    const { value, id, files } = event.target;
    if (userData.current != null) {
      userData.current = {
        ...userData.current,
        [id]: files ? files[0] : value,
      };
    }
    if (files && files[0]) {
      setUserImage(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (userData.current) {
      // Merge with previous data if counter is set, else replace entirely
      if (setCount) {
        setData((prev) => ({ ...prev, ...userData.current }));
      } else {
        setData(userData.current);
      }

      // Increment count if setCount and counter are available
      if (setCount && typeof counter === "number") {
        setCount((prev) => (prev < counter ? prev + 1 : prev));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full grow-1 flex-col gap-5">
      {inputs.map((input, index) => (
        <div
          key={index}
          className={` ${input.type === "file" && "items-center"} flex flex-col gap-2`}
        >
          <label
            htmlFor={input.id}
            className={`font-semibold ${input.type === "file" && "w-fit"}`}
          >
            {input.type === "file" ? (
              <div className="relative h-25 w-25 justify-self-center rounded-full">
                <img
                  src={userImage ? userImage : input.label[0]}
                  alt="default_avatar"
                  className="h-full w-full rounded-full"
                />
                <img
                  src={input.label[1]}
                  alt="icon"
                  className="absolute right-0 bottom-0 h-12 w-12 rounded-full"
                />
              </div>
            ) : (
              input.label
            )}
          </label>
          <div className="relative">
            <input
              type={input.type === "password" ? typo : input.type}
              placeholder={input.placeholder}
              id={input.id}
              onChange={handleChange}
              className={` ${input.type === "file" ? "hidden" : "block"} w-full rounded-lg border border-[#ddd] p-2 focus:outline-none`}
              required={input.type === "file" ? false : true}
            />
            {input.type === "password" && (
              <Icon
                icon={
                  typo === "password" ? "mdi:eye" : "iconamoon:eye-off-fill"
                }
                onClick={() =>
                  setTypo(typo === "password" ? "text" : "password")
                }
                className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-[#B87E8E] hover:opacity-80"
              />
            )}
          </div>
        </div>
      ))}

      {children}
      <button
        type="submit"
        className="cursor-pointer rounded-lg bg-[#B87E8E] p-4 text-lg text-white hover:opacity-80"
      >
        {btn}
      </button>
    </form>
  );
}
