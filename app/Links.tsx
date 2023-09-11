"use client";

import {
  selectCounterValueA,
  selectCounterValueB,
} from "@/features/counter/container";
import Link from "next/link";
import { useAppSelector } from "./hooks";

export default function Links() {
  const a = useAppSelector(selectCounterValueA);
  const b = useAppSelector(selectCounterValueB);

  return (
    <nav className="flex flex-col">
      <Link
        className={`px-4 py-2 hover:bg-slate-100 transition-colors border-b-2 border-b-slate-200`}
        href={"/"}
      >
        Main Page
      </Link>
      <Link
        className="px-4 py-2 hover:bg-slate-100 transition-colors border-b-2 border-b-slate-200"
        href={"/a"}
      >
        First counter ({a})
      </Link>
      <Link
        className="px-4 py-2 hover:bg-slate-100 transition-colors"
        href={"/b"}
      >
        Second counter ({b})
      </Link>
    </nav>
  );
}
