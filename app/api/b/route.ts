import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { messageSchema } from "../apiSchema";

export async function POST(req: NextRequest) {
  const content = await req.json();
  console.log(content);

  if (Math.random() < 0.2) {
    console.log("failing in purpose");
    return new NextResponse(JSON.stringify({ error: "elol" }), {
      status: 500,
    });
  }

  const message = await messageSchema.safeParseAsync(content);
  if (!message.success) {
    return new NextResponse(JSON.stringify({ error: "invalid request" }), {
      status: 400,
    });
  }

  const { amount } = message.data;

  const result = await prisma.counter.update({
    where: { counterId: "b" },
    data: { amount: { increment: amount } },
  });

  console.log(`[B] add ${amount}: ${result.amount}`);

  return new NextResponse(JSON.stringify({ amount: result.amount }));
}
