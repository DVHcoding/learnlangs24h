// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useState, useEffect, useMemo } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import Comment from './Comment';
import { CommentType } from 'types/comment.types';
import { useNewCommentMutation } from '@store/api/comment.api';
import { useUserDetailsQuery } from '@store/api/userApi';
import { toastError } from '@components/Toast/Toasts';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useSocket } from '@utils/socket';
import { NOTIFICATION } from '@constants/events';
interface CommentSectionProps {
    initialComments: CommentType[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
    const socket = useSocket();
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const location = useLocation();
    const [searchParams] = useSearchParams();
    let unitId = searchParams.get('id');

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [comments, setComments] = useState<CommentType[]>([]);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetailsData } = useUserDetailsQuery();
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);
    const [newRepliesQuery] = useNewCommentMutation();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const addReply = async (parentId: string, message: string, receiverId: string) => {
        if (!parentId || !userId || !message || !unitId || !receiverId) {
            return;
        }

        const { data }: any = await newRepliesQuery({ message, parentId, userId, unitLesson: unitId });

        let newComment: CommentType;

        if (data.success === false) {
            toastError(`có lỗi xảy ra!`);
        } else {
            newComment = data.newComment;

            const relatedId = `${location.pathname}?id=${unitId}`;
            socket.emit(NOTIFICATION, {
                senderId: newComment?.user._id,
                receiverId,
                content: `<b>${newComment.user.username}</b> đã trả lời bình luận của bạn!`,
                type: 'new_reply',
                relatedId,
            });
        }

        setComments((prevComments) => {
            // Tạo một bản sao của mảng comments cũ
            const updatedComments = [...prevComments];

            // Tìm comment cha
            const parent = updatedComments.find((comment) => comment._id === parentId);

            if (parent && parent.replies) {
                // Nếu tìm thấy comment cha và có mảng replies
                parent.replies.push(newComment); // Thêm comment mới vào mảng replies
            } else {
                // Nếu không tìm thấy comment cha trực tiếp
                for (let comment of updatedComments) {
                    // Duyệt qua từng comment để tìm comment cha trong các comment con
                    const nestedParent = comment.replies?.find((reply) => reply._id === parentId);
                    if (nestedParent) {
                        // Thêm comment mới vào mảng replies của comment cha
                        comment.replies?.push(newComment);
                        break;
                    }
                }
            }
            // Trả về mảng comments đã cập nhật
            return updatedComments;
        });
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        const nestedComments = initialComments.reduce<CommentType[]>((acc, comment: CommentType) => {
            // Nếu comment không có cha
            if (!comment.parentId) {
                // Thêm comment vào mảng acc và khởi tạo mảng replies trống
                acc.push({ ...comment, replies: [] });
            } else {
                // Nếu comment có cha
                const parent =
                    // Tìm comment cha trong mảng acc
                    acc.find((c) => c._id === comment.parentId) ||
                    // Tìm comment cha trong mảng replies của các comment
                    acc.flatMap((c) => c.replies || []).find((c) => c._id === comment.parentId);
                if (parent) {
                    // Nếu comment cha cũng có cha (comment ông bà)
                    if (parent.parentId) {
                        // Tìm comment ông bà
                        const grandParent = acc.find((c) => c._id === parent.parentId);

                        if (grandParent && grandParent.replies) {
                            // Thêm comment vào mảng replies của comment ông bà
                            grandParent.replies.push(comment);
                        }
                        // Nếu chỉ có comment cha
                    } else if (parent.replies) {
                        // Thêm comment vào mảng replies của comment cha
                        parent.replies.push(comment);
                    }
                }
            }

            // Trả về mảng acc đã cập nhật
            return acc;
        }, []);

        setComments(nestedComments);
    }, [initialComments]);

    return (
        <div className="rounded-md bg-bgCustomCard p-2">
            {comments.map((comment) => (
                <Comment key={comment._id} comment={comment} replies={comment.replies || []} addReply={addReply} />
            ))}
        </div>
    );
};

export default CommentSection;
