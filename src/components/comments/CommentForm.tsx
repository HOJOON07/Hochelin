import axios from "axios";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

interface CommentFormProps {
  storeId: number;
  refetch?: () => void;
}

export default function CommentForm({ storeId, refetch }: CommentFormProps) {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();
  return (
    <form
      className="flex flex-col space-y-2₩"
      onSubmit={handleSubmit(async (data) => {
        const result = await axios.post("/api/comments", {
          ...data,
          storeId,
        });
        // console.log(result);
        if (result.status === 200) {
          toast.success("댓글이 작성되었습니다.");
          resetField("body");
          refetch?.();
        } else {
          toast.error("다시 시도해주세요");
        }
      })}
    >
      {/* 에러 박스 */}
      {errors?.body?.type === "required" && (
        <div className="text-x text-red-600">필수 입력사항입니다.</div>
      )}
      <textarea
        rows={3}
        className="block w-full min-h-[120px] resize-none border rounded-md bg-transparent py-2.5 px-4 text-black placeholder:text-gray-400 text-sm leading-6"
        placeholder="댓글을 작성해주세요.."
        {...register("body", { required: true })}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-600 hover:bg:blue-500 text-white px-4 py-2 text-sm font-semibold shadow-sm float-right mt-2 rounded-md"
      >
        작성하기
      </button>
    </form>
  );
}
