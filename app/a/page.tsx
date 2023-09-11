import CounterA from "@/features/counter/CounterA";
import Links from "@/app/Links";
import { Suspense } from "react";

export default function CounterAPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-xl font-bold">Counter A</h1>
      <Suspense
        fallback={
          <div className="shadow-lg rounded-lg p-8 bg-white h-1/3">
            Loading counter..
          </div>
        }
      >
        <CounterA />
      </Suspense>
      <Links />
    </div>
  );
}
