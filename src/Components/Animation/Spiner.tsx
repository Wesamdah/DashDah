import { useLoading } from "../../Context/LoadingContext";

export default function Spiner() {
  const { loading } = useLoading();

  if (!loading) return;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
    </div>
  );
}
