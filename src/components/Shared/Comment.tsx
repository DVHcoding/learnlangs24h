// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { CommentType } from 'types/comment.types';
import { useLazyGetRepliesByIdQuery } from '@store/api/comment.api';
import { AppDispatch, RootState } from '@store/store';
import { addComments } from '@store/reducer/comment.reducer';
import { formatTimeAgo } from '@utils/formatTimeAgo';

interface CommentProps {
    comment: CommentType;
    replies: CommentType[];
    addReply: (parentId: string, message: string) => Promise<void>;
}

const Comment: React.FC<CommentProps> = ({ comment, replies, addReply }) => {
    const dispatch: AppDispatch = useDispatch();
    const { comments } = useSelector((state: RootState) => state.comments);

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
    const [replyText, setReplyText] = useState<string>('');
    const [isReplying, setIsReplying] = useState<boolean>(false);
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const [repliesLoaded, setRepliesLoaded] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const [getReplies] = useLazyGetRepliesByIdQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleReply = (): void => {
        if (replyText.trim()) {
            addReply(comment._id, replyText);
            setReplyText('');
            setIsReplying(false);
            setShowReplies(true);
        }
    };

    const toggleReplies = (parentId: string): void => {
        setShowReplies(!showReplies);

        if (!repliesLoaded) {
            // Chỉ gọi API nếu chưa tải dữ liệu
            getReplies(parentId).then(({ data }) => {
                if (data?.success) {
                    const { replies } = data;
                    dispatch(addComments([...comments, ...replies]));
                    setRepliesLoaded(true); // Đánh dấu dữ liệu đã được tải
                }
            });
        }
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
                <div className="flex items-center justify-between">
                    <div className="mb-2 flex items-center gap-2">
                        <Avatar src={comment?.user?.photo?.url} className="min-h-8 min-w-8 object-cover" />

                        <span className="font-be font-normal text-textCustom">{comment.user.username}</span>
                    </div>

                    <p className="font-be text-xs text-textCustom">{formatTimeAgo(comment.createdAt)}</p>
                </div>

                {/* Comment */}
                <p className="mb-2 font-be text-textCustom">{comment.message}</p>

                {/* reply and show || hide reply comments */}
                <div className="flex space-x-4">
                    <button onClick={() => setIsReplying(true)} className="text-blue-500 hover:text-blue-600">
                        Trả lời
                    </button>

                    {!comment.parentId && comment.replyCount! > 0 && (
                        <button onClick={() => toggleReplies(comment._id)} className="text-blue-500 hover:text-blue-600">
                            {showReplies ? 'Ẩn' : 'Xem'} ({comment.replyCount}) câu trả lời
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
                            className="mb-2 w-full rounded-md border border-bdCustom bg-bgCustom p-2 font-be
                            text-textCustom outline-none"
                            rows={3}
                            ref={textareaRef}
                            spellCheck={false}
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
