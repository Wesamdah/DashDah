import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
} from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  email: string;
  setCount: Dispatch<SetStateAction<number>>;
  // counter?: number;
  handleOtp: (dataToSend: { email: string; otp: string }) => void;
}

export default function FormOtp({ email, setCount, handleOtp }: Props) {
  const otpInputs = Array(4)
    .fill(null)
    .map(() => useRef<HTMLInputElement>(null));

  const [otpValues, setOtpValues] = useState<string[]>(["", "", "", ""]);

  const focusInput: (index: number) => void = (index) => {
    otpInputs[index]?.current?.focus();
  };

  const handleInputChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
  ) => void = (index, event) => {
    const value = event.target.value.slice(0, 1); // Only one letter/digit

    const updatedOtp = [...otpValues];
    updatedOtp[index] = value;
    setOtpValues(updatedOtp);
    if (value && index < otpInputs.length - 1) {
      focusInput(index + 1);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < otpInputs.length - 1) {
      focusInput(index + 1);
    } else if (e.key === "Backspace" && index > 0) {
      e.preventDefault();

      const updatedOtp = [...otpValues];
      updatedOtp[index] = "";
      setOtpValues(updatedOtp);
      otpInputs[index].current!.value = "";

      focusInput(index > 0 ? index - 1 : 0);
    }
  };

  const handlePaste: (e: React.ClipboardEvent<HTMLInputElement>) => void = (
    e,
  ) => {
    e.preventDefault();

    const PasteData = e.clipboardData.getData("text").slice(0, 4);

    const updatedData = [...otpValues];

    for (let i = 0; i < PasteData.length; i++) {
      updatedData[i] = PasteData[i];

      if (otpInputs[i].current) {
        otpInputs[i].current!.value = updatedData[i];
      }
    }
    setOtpValues(updatedData);
  };

  const handleSubmit: (event: FormEvent) => void = (event) => {
    event.preventDefault();

    const dataToSend = {
      otp: otpValues.join().replace(/,/g, ""),
      email,
    };

    handleOtp(dataToSend);
    console.log(dataToSend);
  };

  useEffect(() => {
    const isComplete = otpValues.every((digit) => digit.length === 1);

    if (isComplete) {
      otpInputs[3].current?.blur();
    }
  }, [otpValues]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative h-[55%] w-full overflow-hidden">
        <div className="absolute top-6 left-6 z-10 flex cursor-pointer rounded-full bg-[#F6F6F6]">
          <Icon
            icon="material-symbols-light:keyboard-arrow-left"
            onClick={() => setCount((prev) => prev - 1)}
            className="text-5xl"
          />
        </div>
        <div
          id="circle_one"
          className="absolute -top-1/2 left-1/2 h-170 w-170 -translate-x-1/2 rounded-full bg-[#B87E8E] opacity-35"
        ></div>
        <div
          id="circle_two"
          className="absolute -top-10 -right-30 h-70 w-70 rounded-full bg-[#fff1f5] opacity-45"
        ></div>
        <div className="absolute bottom-0 left-1/2 h-62 w-82 -translate-x-1/2 overflow-hidden border-b p-12">
          <div
            id="circle_three"
            className="absolute left-1/2 -z-1 h-82 w-82 -translate-x-1/2 rounded-full bg-[#fff6eb]"
          ></div>
          <div
            id="circles_container"
            className="absolute top-0 right-0 flex h-10 w-41 items-center justify-start gap-4 overflow-hidden rounded-3xl border border-[#eee] bg-white p-3"
          >
            {otpValues.map((value, index) =>
              value !== "" ? (
                <div
                  key={index}
                  id={`${index}-number`}
                  className={`animate-otp-swipe-up h-6 w-6 rounded-full bg-[#B87E8E]`}
                  style={{ animationDuration: `${index * 100}ms` }}
                ></div>
              ) : null,
            )}
          </div>
          <div id="avatar" className="absolute bottom-0 left-5">
            <img
              src="/assets/images/backgrounds/otp_image.png"
              alt="orange_circle"
            />
          </div>
        </div>
      </div>
      <div className="flex h-[45%] w-full flex-col items-center p-4">
        <h1 className="text-2xl font-semibold">OTP Verification</h1>
        <p className="text-center text-lg">
          We Will send you a one time password <br /> on this{" "}
          <span className="font-bold">Email :</span>
        </p>
        <p className="text-lg font-semibold text-[#777]">{email}</p>

        <form
          onSubmit={handleSubmit}
          className="my-4 flex flex-col gap-5"
          id="otp"
        >
          <div className="flex items-center justify-evenly gap-4">
            {otpInputs.map((inputRef, index) => (
              <input
                key={index}
                type="text"
                ref={inputRef}
                maxLength={1}
                onChange={(e) => handleInputChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onClick={() => focusInput(index)}
                onPaste={(e) => handlePaste(e)}
                className="h-10 w-10 rounded-full border border-[#B87E8E] bg-[#F6F6F6] text-center text-xl focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="cursor-pointer rounded-2xl bg-[#B87E8E] p-3 text-lg font-semibold text-white hover:opacity-80"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
