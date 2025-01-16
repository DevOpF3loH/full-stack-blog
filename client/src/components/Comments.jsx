import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../utils/newRequest";
import { toast } from "react-toastify";

const Comments = ({ postId }) => {
  const fetchComments = async (postId) => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/comments/${postId}`
    );
    return res.data;
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newComment) => {
      return newRequest.post(`/comments/${postId}`, newComment);
    },
    onSuccess: () => {
      toast.success("Comment Added!!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      toast.error(error.response.data);
    },
  });

  if (isPending) return "loading...";
  
  if (error) return "Something went wrong!" + error.message;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const newComment = {
      desc: formData.get("desc"),
    };

    mutation.mutate(newComment);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-gray-500 underline">Comments</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          placeholder="Write a comment..."
          className="w-full p-4 rounded-xl"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Post
        </button>
      </form>
      {data.map((comment) => (
        <Comment key={comment._id} comment={comment} postId={postId} />
      ))}
    </div>
  );
};

export default Comments;
