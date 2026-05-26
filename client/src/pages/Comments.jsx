import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../api";

function Comments({ ticketId, darkMode }) {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/get_comments.php?ticket_id=${ticketId}`,
            );

            setComments(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const addComment = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/add_comment.php`,
                {
                    ticket_id: ticketId,
                    user_id: user.id,
                    comment: text,
                },
            );

            alert(response.data.message);

            setText("");

            fetchComments();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="mt-6">
            <h3 className="text-lg font-bold mb-4 text-green-700">
                Comments & Work Notes
            </h3>

            <div className="space-y-3 mb-4">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className={`p-4 rounded-xl
                        ${
                            darkMode
                                ? "bg-slate-800 text-white"
                                : "bg-stone-100 text-slate-800"
                        }`}>
                        <div className="flex justify-between mb-2">
                            <span className="font-semibold">
                                {comment.name}
                            </span>

                            <span className="text-sm text-gray-500">
                                {comment.created_at}
                            </span>
                        </div>

                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>

            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a comment..."
                rows="3"
                className="w-full border p-3 rounded-lg mb-4"
            />

            <button
                onClick={addComment}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl transition duration-300
                        hover:scale-105
                        active:scale-95
                        shadow-sm hover:shadow-md">
                Add Comment
            </button>
        </div>
    );
}

export default Comments;
