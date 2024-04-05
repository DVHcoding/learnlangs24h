// ##########################
// #      IMPORT NPM        #
// ##########################
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import { Avatar } from 'rsuite';
import { Link } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################

const TippyProfile: React.FC = () => {
    return (
        <>
            <Tippy
                interactive={true}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        <div className="rounded-md border border-bdCustom bg-bgCustom p-4 shadow">
                            <div className="flex items-center gap-2">
                                <Avatar
                                    size="sm"
                                    circle
                                    src="https://avatars.githubusercontent.com/u/12592949"
                                    alt="@superman66"
                                />
                                <div>
                                    <p className="font-body font-bold text-textCustom">Do Hung</p>
                                    <p className="m-0 font-body text-xs text-textCustom">
                                        dohung@gmail.com
                                    </p>
                                </div>
                            </div>

                            <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>

                            <Link
                                to="/profile"
                                className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="font-body">Trang cá nhân</button>
                            </Link>

                            <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>

                            <Link
                                to="/blog"
                                className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="font-body">Viết blog</button>
                            </Link>

                            <Link
                                to="/myPost"
                                className="text-textCustom transition-all 
                                    duration-200 hover:text-orange-400 hover:text-textCustom"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="mt-2 font-body">Bài viết của tôi</button>
                            </Link>

                            <div className="my-2 h-[0.5px] w-full bg-slate-200"></div>

                            <button
                                className="font-body font-normal text-textCustom 
                                transition-all duration-200 hover:text-red-500"
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                )}
            >
                <Avatar
                    className="singleElement h-10 w-10 cursor-pointer select-none sm:h-8 sm:w-8"
                    circle
                    src="https://avatars.githubusercontent.com/u/12592949"
                    alt="@superman66"
                />
            </Tippy>
        </>
    );
};

export default TippyProfile;
