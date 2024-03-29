"use client";

import Loading from "@/components/Loading";
import Pagination from "@/components/Pagination";
import StoreList from "@/components/StoreList";
import { LikeApiResonpse, LikeInterface } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function LikesPage({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  // const page = Array.isArray(router.query.page)
  //   ? router.query.page[0]
  //   : router.query.page || "1";
  const page = searchParams?.page || "1";

  const fetchLikes = async () => {
    const { data } = await axios(`/api/likes?page=${page}`);
    return data as LikeApiResonpse;
  };

  const {
    data: likes,
    isError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["likes", page],
    queryFn: fetchLikes,
  });
  return (
    <div className="px-4 md:max-w-4xl mx-auto py-8">
      <h3 className="text-lg font-semibold">찜한 맛집</h3>
      <div className="mt-1 text-gray-500 text-sm">찜한 가게 리스트입니다.</div>
      <ul role="list" className="divide-y divide-gray-100 mt-10">
        {isLoading ? (
          <Loading />
        ) : (
          likes?.data?.map((like: LikeInterface, index) => (
            <StoreList i={index} store={like.store} key={index} />
          ))
        )}
        {isSuccess && !!!likes.data.length && (
          <div className="p-4 border border-gray-200 rounded-md text-gray-400">
            찜한 가게가 없습니다.
          </div>
        )}
      </ul>
      <Pagination
        total={likes?.totalPage}
        page={page}
        pathname="/users/likes"
      />
    </div>
  );
}
