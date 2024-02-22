import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import prisma from "@/db";
import { LikeApiResonpse, LikeInterface } from "@/interface";

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
    const likes = await prisma.like.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        userId: parseInt(session.user.id),
      },
      include: {
        store: true,
      },
    });
    return res.status(200).json({
      data: likes,
    });
  }
}
