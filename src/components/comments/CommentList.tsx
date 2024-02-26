import { CommentApiResponse } from "@/interface";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "react-toastify";

interface CommentListProps {
  comments?: CommentApiResponse;
  refetch: () => void;
  displayStore?: boolean;
}
export default function CommentList({
  comments,
  refetch,
  displayStore,
}: CommentListProps) {
  const { data: session } = useSession();
  const handleDelete = async (id: number) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm) {
      try {
        const result = await axios.delete(`/api/comments`, {
          params: {
            id: id,
          },
        });
        if (result.status === 200) {
          toast.success("댓글을 삭제했습니다.");
          refetch?.();
        } else {
          toast.error("다시 시도해주세요");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="my-10">
      {comments?.data && comments?.data.length > 0 ? (
        comments?.data.map((comment) => (
          <div
            key={comment.id}
            className="flex space-x-4 text-sm text-gray-500 mb-8 item-center border-b border-gray-100 pb-8"
          >
            <div>
              <img
                className="rounde-full bg-gray-10"
                src={comment.user?.image || "/images/markers/default.png"}
                alt="유저 이미지"
                width={40}
                height={40}
              />
            </div>
            <div className="flex flex-col space-y-1 flex-1">
              <div>
                {comment.user?.name ?? "사용자"} | {comment.user?.email}
              </div>
              <div className="text-xs">
                {new Date(comment?.createdAt)?.toLocaleDateString()}
              </div>
              <div className="text-black mt-1 text-base">{comment.body}</div>
              {displayStore && (
                <div className="mt-2">
                  <Link
                    href={`/stores/${comment.store?.id}`}
                    className="text-blue-700 font-medium hover:text-gray-400"
                  >
                    {comment.store?.name}
                  </Link>
                </div>
              )}
            </div>
            <div>
              {session?.user &&
                comment.userId === parseInt(session?.user.id) && (
                  <button
                    type="button"
                    className="underline text-gray-500 hover:text-gray-400"
                    onClick={() => handleDelete(comment.id)}
                  >
                    삭제
                  </button>
                )}
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 border border-gray-200 rounded-md text-gray-400">
          댓글이 없습니다.
        </div>
      )}
    </div>
  );
}
