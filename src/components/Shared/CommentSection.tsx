// CommentSection.tsx
import React, { useState, useEffect } from 'react';
import Comment from './Comment';

interface CommentSectionProps {
    initialComments: CommentType[];
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

const CommentSection: React.FC<CommentSectionProps> = ({ initialComments }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [comments, setComments] = useState<CommentType[]>([]);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const addReply = (parentId: string, message: string) => {
        const newComment: CommentType = {
            _id: Date.now().toString(),
            message,
            parentId,
            createAt: new Date().toISOString(),
            user: { _id: 'current_user_id', name: 'Current User' },
        };

        setComments((prevComments) => {
            const updatedComments = [...prevComments];
            const parent = updatedComments.find((c) => c._id === parentId);
            if (parent && parent.replies) {
                parent.replies.push(newComment);
            } else {
                for (let comment of updatedComments) {
                    const nestedParent = comment.replies?.find((r) => r._id === parentId);
                    if (nestedParent) {
                        comment.replies?.push(newComment);
                        break;
                    }
                }
            }
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
        const nestedComments = initialComments.reduce<CommentType[]>((acc, comment) => {
            if (!comment.parentId) {
                acc.push({ ...comment, replies: [] });
            } else {
                const parent =
                    acc.find((c) => c._id === comment.parentId) ||
                    acc.flatMap((c) => c.replies || []).find((c) => c._id === comment.parentId);
                if (parent) {
                    if (parent.parentId) {
                        const grandParent = acc.find((c) => c._id === parent.parentId);
                        if (grandParent && grandParent.replies) {
                            grandParent.replies.push(comment);
                        }
                    } else if (parent.replies) {
                        parent.replies.push(comment);
                    }
                }
            }
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
