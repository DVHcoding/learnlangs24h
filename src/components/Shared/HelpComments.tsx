// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment, useMemo, useState } from 'react';
import { IoIosHelpCircle } from 'react-icons/io';
import { Avatar, Button, Drawer } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { APIResponse } from 'types/api-types';
import CommentSection from './CommentSection';
import { useLazyGetParentCommentsQuery, useNewCommentMutation } from '@store/api/comment.api';
import DotLoader from '@pages/Loader/DotLoader';
import { AppDispatch, RootState } from '@store/store';
import { addComments } from '@store/reducer/comment.reducer';
import { toastError } from '@components/Toast/Toasts';

const HelpComments: React.FC<{ userDetailsData: APIResponse | undefined }> = ({ userDetailsData }) => {
    const dispatch: AppDispatch = useDispatch();
    const { comments } = useSelector((state: RootState) => state.comments);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);
    const [commentValue, setCommentValue] = useState<string>('');
    const [fetching, setFetching] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const userId = useMemo(() => userDetailsData?.user?._id, [userDetailsData?.user]);
    const [getAllComments, { isLoading }] = useLazyGetParentCommentsQuery();
    const [newCommentQuery] = useNewCommentMutation();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const headerDrawerStyles = {
        header: { padding: '8px', border: 'none' },
    };

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showDrawer = () => {
        setOpen(true);

        if (comments.length === 0 && !fetching) {
            setFetching(true);
            getAllComments().then(({ data }) => {
                if (data?.success) {
                    const { comments } = data;
                    dispatch(addComments(comments));
                }
                setFetching(false);
            });
        }
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleNewComment = async () => {
        if (commentValue.trim() === '' || !userId) {
            return;
        }

        const { data }: any = await newCommentQuery({ message: commentValue, parentId: null, userId });

        if (data.success === false) {
            toastError(`có lỗi xảy ra!`);
        } else {
            dispatch(addComments([...comments, data.newComment]));
            setCommentValue('');
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <div
                className="sticky bottom-4 ml-auto mr-2 flex max-w-max cursor-pointer items-center 
                gap-2 rounded-lg bg-slate-100 p-2 shadow-md"
                onClick={showDrawer}
            >
                <IoIosHelpCircle className="text-orange-400" size={20} />
                <p className="text-title select-none text-nowrap font-bold">Hỏi đáp</p>
            </div>

            <Drawer onClose={onClose} open={open} width={600} styles={headerDrawerStyles}>
                <div className="px-2">
                    <div className="flex items-center gap-2">
                        <Avatar src={userDetailsData?.user?.photo?.url} className="min-h-10 min-w-10 object-cover" />

                        <input
                            type="text"
                            className="w-full rounded-md bg-[#f6f7fb] p-2"
                            placeholder="Nhập bình luận tại đây"
                            value={commentValue}
                            onChange={(e) => setCommentValue(e.target.value)}
                        />

                        <Button type="primary" onClick={handleNewComment}>
                            Gửi
                        </Button>
                    </div>

                    <div className="flex items-center justify-between">
                        <h3 className="font-be font-medium text-textCustom">{comments.length} bình luận</h3>

                        <p className="font-be text-xs font-normal text-textCustomGray">
                            Nếu thấy bình luận spam, các bạn bấm report giúp admin nhé
                        </p>
                    </div>

                    <div className="mt-2" style={{ transform: 'translate3d(0,0,0)' }}>
                        {!isLoading ? (
                            <CommentSection initialComments={comments} />
                        ) : (
                            <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <DotLoader />
                            </div>
                        )}
                    </div>
                </div>
            </Drawer>
        </Fragment>
    );
};

export default HelpComments;
