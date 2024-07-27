// Comment.tsx
import React, { useEffect, useRef, useState } from 'react';

interface CommentProps {
    comment: CommentType;
    replies: CommentType[];
    addReply: (parentId: string, message: string) => void;
}

interface CommentType {
    _id: string;
    message: string;
    parentId: string | null;
    createAt: string;
    user: User;
    replies?: CommentType[];
}
interface User {
    _id: string;
    name: string;
}

const Comment: React.FC<CommentProps> = ({ comment, replies, addReply }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [replyText, setReplyText] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [showReplies, setShowReplies] = useState(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleReply = () => {
        if (replyText.trim()) {
            addReply(comment._id, replyText);
            setReplyText('');
            setIsReplying(false);
            setShowReplies(true);
        }
    };

    const toggleReplies = () => {
        setShowReplies(!showReplies);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    useEffect(() => {
        if (isReplying && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [isReplying]);

    return (
        <div className={`mb-4 ${comment.parentId ? 'ml-8' : ''}`}>
            <div className="rounded-lg bg-bgCustomCardItem p-4 shadow">
                {/* Avatar */}
                <div className="mb-2 flex items-center">
                    <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                        {comment.user.name[0].toUpperCase()}
                    </div>
                    <span className="font-semibold text-textCustom">{comment.user.name}</span>
                </div>

                {/* Comment */}
                <p className="mb-2 text-textCustom">{comment.message}</p>

                {/* reply and show || hide reply comments */}
                <div className="flex space-x-4">
                    <button onClick={() => setIsReplying(true)} className="text-blue-500 hover:text-blue-600">
                        Trả lời
                    </button>
                    {replies.length > 0 && (
                        <button onClick={toggleReplies} className="text-blue-500 hover:text-blue-600">
                            {showReplies ? 'Ẩn' : 'Xem'} ({replies.length}) câu trả lời
                        </button>
                    )}
                </div>

                {/* Rich text */}
                {isReplying && (
                    <div className="mt-2">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Viết trả lời..."
                            className="mb-2 w-full rounded-md border p-2"
                            rows={3}
                            ref={textareaRef}
                        />
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setIsReplying(false)}
                                className="rounded bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300"
                            >
                                Hủy
                            </button>
                            <button onClick={handleReply} className="rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600">
                                Gửi
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Nested comment */}
            {showReplies && replies.length > 0 && (
                <div className="mt-2 border-l-4 border-green-400">
                    {replies.map((reply: CommentType) => (
                        <Comment key={reply._id} comment={reply} replies={reply.replies || []} addReply={addReply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Comment;
