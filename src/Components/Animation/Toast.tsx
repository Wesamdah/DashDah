import { useEffect } from "react";
import { useError } from "../../Context/ErrorContext";
export default function Toast() {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(clearError, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  if (!error) return;

  return (
    <div className="fixed right-4 bottom-4 z-[9999] rounded-lg bg-red-500 px-6 py-3 text-white shadow-md">
      {error}
    </div>
  );
}
