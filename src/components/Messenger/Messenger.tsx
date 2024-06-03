// ##########################
// #      IMPORT NPM        #
// ##########################
import { Avatar } from 'antd';
import { IoMdSend } from 'react-icons/io';

// ##########################
// #    IMPORT Components   #
// ##########################

const Messenger = () => {
    return (
        <div className="flex overflow-hidden" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Sidebar */}
            <div className="w-[22rem] overflow-auto border-r border-t border-[#e5e5e5]">
                <ul>
                    {[...Array(3)].map((_, index) => (
                        <li className="flex cursor-pointer items-center gap-3 rounded-md hover:bg-bgHoverGrayDark" key={index}>
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                                size={45}
                            />
                            <div className="flex-1 select-none py-2">
                                <h3 className="font-semibold leading-tight text-textCustom">Đỗ Hùng</h3>
                                <p className="text-textBlackGray">This is a example text</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Content  */}
            <div className="w-full">
                {/* Header */}
                <div className="flex items-center gap-2 border-t px-2 shadow">
                    <div className="relative">
                        <Avatar
                            src={
                                <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                            }
                            size={45}
                        />
                        <div className="absolute bottom-0.5 right-0 h-3 w-3 rounded-full bg-green-400 outline outline-white"></div>
                    </div>
                    <div className="flex-1 select-none py-2">
                        <h3 className="font-semibold leading-tight text-textCustom">Đỗ Hùng</h3>
                        <p className="text-[0.8rem] font-normal text-textBlackGray">Đang hoạt động</p>
                    </div>
                </div>

                {/* Body */}
                <div className="overflow-auto" style={{ height: 'calc(100% - 3.3rem)' }}>
                    <ul className="mx-2 mb-14 mt-2 flex flex-col gap-2">
                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">Day la tin nhan dau tien</p>
                        </li>

                        <li className="flex gap-2">
                            <p className="ml-auto max-w-[33rem] rounded-2xl bg-blue-500 p-2 text-white"> Tin nhan cua toi</p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">Day la tin nhan thu 2</p>
                        </li>

                        <li className="flex gap-2">
                            <p className="ml-auto max-w-[33rem] rounded-2xl bg-blue-500 p-2 text-white">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias unde commodi illum laboriosam corporis
                                iure eum voluptatibus eveniet, nesciunt ipsam voluptates nisi sequi fugit, dicta neque voluptas inventore?
                                Blanditiis, doloribus?
                            </p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, fugit. Quos non unde omnis porro
                                praesentium rerum voluptates autem? Accusamus explicabo ad quas. Veniam voluptate in eligendi et perferendis
                                deleniti?
                            </p>
                        </li>

                        <li className="flex max-w-max gap-2">
                            <Avatar
                                src={
                                    <img src="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/244973891_417649256379152_4439076445066100352_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=U5vLLmMfJkkQ7kNvgEzlYAc&_nc_ht=scontent.fhan9-1.fna&oh=00_AYAMOIcI4lAoI6LHgXms9eqNqF_qOmQA88RX8lEuPwlc9w&oe=6660EA3F" />
                                }
                            />
                            <p className="max-w-[33rem] rounded-2xl bg-bgHoverGrayDark p-2 text-textCustom">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, fugit. Quos non unde omnis porro
                                praesentium rerum voluptates autem? Accusamus explicabo ad quas. Veniam voluptate in eligendi et perferendis
                                deleniti?
                            </p>
                        </li>
                    </ul>
                </div>

                {/* Chat bar */}
                <div className="fixed bottom-[1.15rem] flex gap-2 bg-bgCustom pb-1" style={{ width: '62%' }}>
                    <input type="text" className="w-full rounded-full bg-bgHoverGrayDark p-2 text-textCustom" placeholder="Aa" />
                    <button>
                        <IoMdSend size={25} color="#3798f2" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Messenger;
