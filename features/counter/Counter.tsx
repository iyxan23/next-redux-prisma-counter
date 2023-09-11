import { useAppDispatch, useAppSelector } from "@/app/hooks";

export default function Counter({
  increment,
  decrement,
  count,
  status = "loaded",
}: {
  increment: () => void;
  decrement: () => void;
  count: number;
  status: "pending" | "loaded";
}) {
  return (
    <div
      className={`shadow-lg rounded-lg bg-white h-1/3 transition-all ${
        "" // status == "pending" ? "scale-90 opacity-75" : ""
      }`}
    >
      <div className="flex flex-row gap-8 justify-between items-center h-full w-full">
        <button
          className="px-4 py-1 rounded-s-lg bg-red-400 text-white hover:bg-red-300 transition-colors text-2xl w-full"
          aria-label="Decrement value"
          onClick={decrement}
        >
          -
        </button>
        <span>{count}</span>
        <button
          className="px-4 py-1 rounded-e-lg bg-blue-400 text-white hover:bg-blue-300 transition-colors text-2xl w-full"
          aria-label="Increment value"
          onClick={increment}
        >
          +
        </button>
      </div>
    </div>
  );
}
