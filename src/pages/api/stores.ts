import { PrismaClient } from "@prisma/client";
import { StoreApiResonpse, StoreType } from "./../../interface/index";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResonpse>
) {
  const prisma = new PrismaClient();

  const count = await prisma.store.count();
  const { page = "1" }: { page?: string } = req.query;
  const skipPage = parseInt(page) - 1;
  const stores = await prisma.store.findMany({
    orderBy: { id: "asc" },
    take: 10,
    skip: skipPage * 10,
  });

  // totalpage, data, page, totalCount

  res.status(200).json({
    page: parseInt(page),
    data: stores,
    totalCount: count,
    totalPage: Math.ceil(count / 10),
  });
}
