import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";
import prisma from "@/db";
import { LikeApiResonpse, LikeInterface } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LikeApiResonpse | LikeInterface>
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return res.status(401);
  }

  if (req.method === "POST") {
    const { storeId }: { storeId: number } = req.body;
    // 하트표시, 찜 데이터가 있는지 확인
    let like = await prisma.like.findFirst({
      where: {
        storeId,
        userId: parseInt(session?.user?.id),
      },
    });
    if (like) {
      like = await prisma.like.delete({
        where: {
          id: like.id,
        },
      });
      return res.status(204).json(like);
    } else {
      like = await prisma.like.create({
        data: {
          storeId,
          userId: parseInt(session?.user.id),
        },
      });
      return res.status(201).json(like);
    }
  } else if (req.method === "GET") {
    const count = await prisma.like.count({
      where: {
        userId: parseInt(session.user.id),
      },
    });
    const { page = "1", limit = 10 }: ResponseType = req.query;
    const skipPage = parseInt(page) - 1;
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: parseInt(session.user.id),
      },
      include: {
        store: true,
      },
      skip: skipPage * limit,
      take: limit,
    });
    // console.log(likes);
    return res.status(200).json({
      data: likes,
      page: parseInt(page),
      totalPage: Math.ceil(count / limit),
    });
  }
}
