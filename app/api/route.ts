import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

export const responseSchema = z.record(z.number());
export type ResponseType = z.infer<typeof responseSchema>;

export async function GET() {
  const counters = await prisma.counter.findMany();

  return new NextResponse(
    JSON.stringify(
      counters.reduce((result, cur) => {
        result[cur.counterId] = cur.amount;
        return result;
      }, {} as ResponseType)
    )
  );
}
