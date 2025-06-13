import { Link } from "react-router-dom";
import "./unauthorized.css";

export default function Unauthorized() {
  return (
    <div className="not-found-container flex h-screen w-screen justify-between overflow-hidden">
      <div className="relative flex h-full w-[40%] items-center justify-center">
        <div className="absolute top-1/3 -left-1/4 -translate-y-1/3">
          <img
            src="/assets/images/backgrounds/404_circle.png"
            alt="orange_circle"
          />
        </div>
        <div className="z-10 flex flex-col gap-10">
          <h1 className="text-9xl font-bold text-[#FC692D]">404</h1>
          <h3 className="text-5xl font-light">
            OOOps! <br />
            Page Not Found
          </h3>
          <p className="text-2xl font-semibold text-[#B0B0B0]">
            This page doesn’t exist or was removed! <br />
            We suggest you back to home
          </p>
          <Link to={"/auth/login"}>
            <button className="w-fit cursor-pointer self-start rounded-4xl bg-[#008055] px-10 py-5 text-sm font-semibold text-white hover:opacity-80">
              Back to homepage
            </button>
          </Link>
        </div>
      </div>
      <div className="flex h-full w-[60%] items-end justify-center">
        <div>
          <img src="/assets/images/backgrounds/404_image.png" alt="404_image" />
        </div>
      </div>
    </div>
  );
}
