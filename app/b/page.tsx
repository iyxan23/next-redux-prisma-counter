import CounterB from "@/features/counter/CounterB";
import Links from "@/app/Links";
import { Suspense } from "react";

export default function CounterBPage() {
  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-xl font-bold">Counter B</h1>
      <Suspense
        fallback={
          <div className="shadow-lg rounded-lg p-8 bg-white h-1/3">
            Loading counter..
          </div>
        }
      >
        <CounterB />
      </Suspense>
      <Links />
    </div>
  );
}
