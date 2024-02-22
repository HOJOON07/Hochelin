import { LikeApiResonpse } from "@/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function LikesPage() {
  const fetchLikes = async () => {
    const { data } = await axios("/api/likes");
    return data as LikeApiResonpse;
  };

  const { data } = useQuery({ queryKey: ["likes"], queryFn: fetchLikes });
  return (
    <div>
      <h1>Likes Page</h1>
    </div>
  );
}
