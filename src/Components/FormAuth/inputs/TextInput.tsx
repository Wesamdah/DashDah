import { useState, type ChangeEvent } from "react";
import type { InputType } from "../../../types/form";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  input: Extract<InputType, { type: "text" | "password" | "email" }>;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function TextInput({ input, handleChange }: Props) {
  const [typo, setTypo] = useState(input.type);
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={input.id} className="font-semibold">
        {input.label}
      </label>

      <div className="relative">
        <input
          type={typo}
          placeholder={input.placeholder}
          id={input.id}
          onChange={handleChange}
          className="block w-full rounded-lg border border-[#ddd] p-2 focus:outline-none"
          required
        />
        {input.type === "password" && (
          <Icon
            icon={typo === "password" ? "mdi:eye" : "iconamoon:eye-off-fill"}
            onClick={() => setTypo(typo === "password" ? "text" : "password")}
            className="absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer text-[#B87E8E] hover:opacity-80"
          />
        )}
      </div>
    </div>
  );
}
