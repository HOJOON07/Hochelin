import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export default function Like() {
  const toggleLike = () => {
    // 찜하기/찜취소 로직
  };
  return (
    <button type="button" onClick={toggleLike}>
      {true ? (
        <AiFillHeart className="hover:text-red-600 focus:text-red-600 text-red-500" />
      ) : (
        <AiOutlineHeart className="hover:text-red-600 focus:text-red-600" />
      )}
    </button>
  );
}
