import axios from "axios";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import CommentForm from "./CommentForm";

import { CommentApiResponse } from "@/interface";
import { useQuery } from "@tanstack/react-query";

import CommentList from "./CommentList";
import Pagination from "../Pagination";

interface CommentProps {
  storeId: number;
  params?: {
    page?: string;
  };
}
export default function Comments({ storeId, params }: CommentProps) {
  const { status } = useSession();
  const page = params?.page || "1";
  const propsPage = page as string;

  const fetchCommnets = async () => {
    const { data } = await axios(`/api/comments`, {
      params: {
        storeId,
        page,
      },
    });
    return data as CommentApiResponse;
  };

  const { data: comments, refetch } = useQuery({
    queryKey: ["comments", storeId, propsPage],
    queryFn: fetchCommnets,
  });

  // console.log(comments);
  return (
    <div className="md:max-w-2xl py8 px-2 mb-20 mx-auto">
      {status === "authenticated" && (
        <CommentForm storeId={storeId} refetch={refetch} />
      )}
      <CommentList comments={comments} refetch={refetch} />
      <Pagination
        total={comments?.totalPage}
        page={propsPage}
        pathname={`/stores/${storeId}`}
      />
    </div>
  );
}
