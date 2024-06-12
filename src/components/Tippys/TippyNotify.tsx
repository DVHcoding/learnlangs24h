// ##########################
// #      IMPORT NPM        #
// ##########################
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Badge } from 'rsuite';
import { BellRing } from 'lucide-react';

// ##########################
// #    IMPORT Components   #
// ##########################
import TippyProvider from '@components/Tippys/TippyProvider';

const TippyNotify: React.FC = () => {
    // Open & Close Tippy
    const [visible, setVisible] = useState<boolean>(false);
    const hide = () => setVisible(false);

    return (
        <div>
            <TippyProvider
                visible={visible}
                placement="bottom-end"
                onClickOutside={hide}
                content={
                    <div className="rounded-md border border-bdCustom bg-bgCustom shadow">
                        <div className="flex items-center justify-between gap-2 p-4">
                            <h3 className="font-body font-bold text-textCustom lg:text-lg">Thông báo</h3>

                            <button
                                className="rounded-md p-1 font-body font-semibold text-orange-600
                                        transition-all duration-200 hover:bg-bgHoverGrayDark"
                            >
                                Đánh dấu đã đọc
                            </button>
                        </div>

                        <ul className="scrollbar flex h-96 flex-col gap-4 overflow-auto px-2">
                            {Array.from(new Array(7)).map((_, index) => (
                                <Link to={`/${index}`} key={index} style={{ textDecoration: 'none' }}>
                                    <li
                                        className="flex cursor-pointer items-center justify-between gap-2 rounded-lg
                                                p-2 transition-all duration-100 hover:bg-bgHoverGrayDark"
                                    >
                                        <Avatar size="md" circle src="https://avatars.githubusercontent.com/u/12592949" alt="@superman66" />

                                        <div>
                                            <h4 className="font-body leading-6 text-textCustom">
                                                <span className="font-semibold">Hoang anh</span> đã thích bình luận của bạn
                                            </h4>
                                            <p className="font-body font-semibold text-lime-600">4 tháng trước</p>
                                        </div>
                                    </li>
                                </Link>
                            ))}
                        </ul>

                        <div className="py-3 transition-all duration-200 hover:bg-bgHoverGrayDark">
                            <Link
                                to="/notification"
                                className="font-body font-bold text-orange-600 hover:text-orange-600"
                                style={{ textDecoration: 'none' }}
                            >
                                <button className="mx-auto">Xem tất cả thông báo</button>
                            </Link>
                        </div>
                    </div>
                }
            >
                <Badge
                    onClick={() => setVisible(!visible)}
                    content={5}
                    role="button" // Adding role attribute to indicate clickable element
                    aria-label="Toggle visibility" // Adding aria-label for accessibility
                    className="cursor-pointer select-none"
                >
                    <BellRing
                        size={22}
                        strokeWidth={1.6}
                        className="text-textCustom"
                        aria-hidden="true" // Adding aria-hidden to hide from accessibility tree as it's decorative
                    />
                </Badge>
            </TippyProvider>
        </div>
    );
};

export default TippyNotify;
