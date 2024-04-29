// ##########################
// #      IMPORT NPM        #
// ##########################
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
// import { Avatar } from 'rsuite';
import { Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ##########################
// #    IMPORT Components   #
// ##########################
import DefaultAvatar from '@assets/profiles/defautlAvatar.png';
import { useUserDetailsQuery, useLogoutUserMutation } from '@store/api/userApi';
import { toastError, toastSuccess } from '@components/Toast/Toasts';

// ##########################
const TippyProfile: React.FC = () => {
    const { data } = useUserDetailsQuery();
    const [logoutUser, { isLoading }] = useLogoutUserMutation();

    const logoutHandler = async (): Promise<void> => {
        try {
            const { data: dataLogoutResponse }: any = await logoutUser();

            if (dataLogoutResponse?.success) {
                toastSuccess(`${dataLogoutResponse.message}`);
            } else {
                toastError(`${dataLogoutResponse?.message}`);
            }
        } catch (error) {
            toastError('Có lỗi xảy ra. Vui lòng thử lại!');
        }
    };

    return (
        <>
            <Tippy
                appendTo={document.body}
                interactive={true}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        <div className="min-w-44 rounded-md border border-bdCustom bg-bgCustom p-4 shadow">
                            <div className="flex items-center gap-2">
                                <Avatar src={<img src={data?.success ? `${data.user?.photo?.url}` : DefaultAvatar} alt="avatar" />} />
                                <div>
                                    <p className="font-body font-bold text-textCustom">
                                        {data?.user?.username}

                                        {!data?.success && 'Anonymous'}
                                    </p>
                                    <p className="m-0 font-body text-xs text-textCustom">{data?.user?.email}</p>
                                </div>
                            </div>

                            <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>

                            {data?.success && (
                                <div>
                                    <Link
                                        to="/profile"
                                        className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <button aria-label="btn_profile" className="font-body">
                                            Trang cá nhân
                                        </button>
                                    </Link>

                                    <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>

                                    <Link
                                        to="/blog"
                                        className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <button aria-label="btn_writeBlog" className="font-body">
                                            Viết blog
                                        </button>
                                    </Link>

                                    <Link
                                        to="/myPost"
                                        className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <button aria-label="btn_myBlog" className="mt-2 font-body">
                                            Bài viết của tôi
                                        </button>
                                    </Link>

                                    <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>
                                </div>
                            )}

                            {data?.success ? (
                                <button
                                    disabled={isLoading}
                                    onClick={logoutHandler}
                                    aria-label="btn_logout"
                                    className="font-body font-normal text-textCustom 
                                    transition-all duration-200 hover:text-red-500"
                                >
                                    Đăng xuất
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="font-body font-normal text-textCustom 
                                    transition-all duration-200 hover:text-green-500"
                                    style={{ textDecoration: 'none' }}
                                >
                                    Đăng nhập
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            >
                <Avatar size={35} src={<img src={data?.success ? `${data.user?.photo?.url}` : DefaultAvatar} alt="avatar" />} />
            </Tippy>

            <ToastContainer />
        </>
    );
};

export default TippyProfile;
