import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "./Image";
import { format } from "timeago.js";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";

const Comment = ({ comment }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async () => {
      return newRequest.delete(`/comments/${comment._id}`);
    },
    onSuccess: () => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment?.user?.img && (
          <Image
            src={comment?.user?.img}
            className="w-10 h-10 rounded-full object-cover"
            w="40"
          />
        )}
        <span className="font-medium">{comment?.user?.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user && comment?.user?.username === user?.username && (
          <span
            className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
            onClick={() => deleteMutation.mutate()}
          >
            delete
            {deleteMutation.isPending && <span>(in progress)</span>}
          </span>
        )}
      </div>
      <div className="mt-4">
        <p>{comment?.desc}</p>
      </div>
    </div>
  );
};

export default Comment;
