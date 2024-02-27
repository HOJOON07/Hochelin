import { stat } from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/db";
import { CommentApiResponse, CommentInterface } from "@/interface";

interface ResponseType {
  page?: string;
  limit?: number;
  storeId?: string;
  id?: string;
  user?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CommentApiResponse | CommentInterface>
) {
  const session = await getServerSession(req, res, authOptions);
  const {
    id = "",
    page = "1",
    limit = 10,
    storeId = "",
    user = false,
  }: ResponseType = req.query;

  if (req.method === "POST") {
    if (!session?.user) {
      return res.status(401);
    }
    const { storeId, body }: { storeId: number; body: string } = req.body;
    const comment = await prisma.comment.create({
      data: {
        storeId,
        body,
        userId: parseInt(session?.user.id),
      },
    });
    // console.log("생성되었습니다.");
    // console.log(comment);
    return res.status(200).json(comment);
  } else if (req.method === "DELETE") {
    if (!session?.user) {
      return res.status(401);
    }
    const result = await prisma.comment.delete({
      where: {
        id: parseInt(id),
      },
    });
    return res.status(200).json(result);
  } else if (req.method === "GET") {
    // 댓글 가져오기

    const skipPage = parseInt(page) - 1;

    const count = await prisma.comment.count({
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user && session?.user ? parseInt(session?.user.id) : {},
      },
    });
    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: storeId ? parseInt(storeId) : {},
        userId: user && session?.user ? parseInt(session?.user.id) : {},
      },
      skip: skipPage * limit,
      take: limit,
      include: {
        user: true,
        store: true,
      },
    });
    // console.log(comments);
    return res.status(200).json({
      data: comments,
      page: parseInt(page),
      totalPage: Math.ceil(count / limit),
    });
  }
}
