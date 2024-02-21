import { PrismaClient } from "@prisma/client";
import { StoreApiResonpse, StoreType } from "./../../interface/index";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResonpse | StoreType[] | StoreType>
) {
  const { page = "", limit = "", q, district }: ResponseType = req.query;
  // const prisma = new PrismaClient();

  if (page) {
    const count = await prisma.store.count();
    const skipPage = parseInt(page) - 1;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      take: 10,
      skip: skipPage * 10,
      where: {
        name: q ? { contains: q } : {},
        address: district ? { contains: district } : {},
      },
    });

    res.status(200).json({
      page: parseInt(page),
      data: stores,
      totalCount: count,
      totalPage: Math.ceil(count / 10),
    });
  } else {
    const { id }: { id?: string } = req.query;
    const stores = await prisma.store.findMany({
      orderBy: { id: "asc" },
      where: {
        id: id ? parseInt(id) : {},
      },
    });

    return res.status(200).json(id ? stores[0] : stores);
  }

  // totalpage, data, page, totalCount
}
