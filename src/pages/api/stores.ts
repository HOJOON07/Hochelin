import { PrismaClient } from "@prisma/client";
import { StoreApiResonpse, StoreType } from "./../../interface/index";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/db";
import axios from "axios";

interface ResponseType {
  page?: string;
  limit?: string;
  q?: string;
  district?: string;
  id?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StoreApiResonpse | StoreType[] | StoreType | null>
) {
  const { page = "", limit = "", q, district, id }: ResponseType = req.query;

  // const prisma = new PrismaClient();

  if (req.method === "POST") {
    const formData = req.body;
    const header = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers: header }
    );

    const result = await prisma.store.create({
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });

    return res.status(200).json(result);

    //데이터 수정 처리
  } else if (req.method === "PATCH") {
    const formData = req.body;
    const header = {
      Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    };

    const { data } = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURI(
        formData.address
      )}`,
      { headers: header }
    );

    const result = await prisma.store.update({
      where: {
        id: formData.id,
      },
      data: { ...formData, lat: data.documents[0].y, lng: data.documents[0].x },
    });
    return res.status(200).json(result);
  } else if (req.method === "DELETE") {
    // 삭제 요청
    if (id) {
      const result = await prisma.store.delete({
        where: {
          id: parseInt(id),
        },
      });
      return res.status(200).json(result);
    }
    return res.status(500).json(null);
  }
  // 무한 스크롤을 구현할 때 쿼리스트링으로 page가 들어올 때,
  else {
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
  }
  // totalpage, data, page, totalCount
}
