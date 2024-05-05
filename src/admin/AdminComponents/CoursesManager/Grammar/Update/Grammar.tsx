// ##########################
// #      IMPORT NPM        #
// ##########################
import { Avatar, Tabs, Radio } from 'antd';
import ReactPlayer from 'react-player';
import { Editor } from '@tinymce/tinymce-react';
import { AlignLeft } from 'lucide-react';
import { useState } from 'react';

// ##########################
// #    IMPORT Components   #
// ##########################
import Logo from '@assets/logo.png';
import Sidebar from './Sidebar';

const Grammar = () => {
    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [open, setOpen] = useState<boolean>(false);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */

    return (
        <div className="h-screen">
            {/* overlay */}
            <div
                onClick={() => setOpen(!open)}
                className={`fixed z-10 mt-12 h-full w-full ${open ? 'block' : 'hidden'}`}
                style={{ backgroundColor: 'rgb(11 11 11 / 41%)' }}
            ></div>

            {/* header */}
            <div className="z-50 flex items-center bg-blue-400 px-2 shadow phone:py-2">
                <div className="flex w-[18.5rem] items-center gap-2 phone:hidden">
                    <img src={Logo} alt="Logo" className="w-20 object-cover" />
                    <h3 className="font-body text-lg font-bold text-white">Admin</h3>
                </div>

                <div className="flex w-full items-center justify-between">
                    <AlignLeft color="white" className="hidden cursor-pointer border phone:block pm:block" onClick={() => setOpen(!open)} />

                    <h3 className="font-segoe text-lg text-white phone:text-base pm:text-base">Sửa bài học video</h3>

                    <div className="flex items-center gap-1">
                        <Avatar />
                        <p className="font-segoe text-white">Đỗ Hùng</p>
                    </div>
                </div>
            </div>

            <div className="flex" style={{ height: 'calc(100% - 3.2rem)' }}>
                {/*sidebar  */}
                <Sidebar />

                {/* content */}
                <div className="h-full flex-1 overflow-auto px-3">
                    <div className="pb-2">
                        <Tabs
                            defaultActiveKey="1"
                            items={[
                                {
                                    label: 'Thông tin chung',
                                    key: '1',
                                    children: (
                                        <div>
                                            <form className="flex flex-col gap-4">
                                                <button className="btn-primary max-w-max">Cập nhật</button>
                                                <div>
                                                    <span className="font-body font-bold">Ten (*)</span>
                                                    <input
                                                        type="text"
                                                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                        sm:w-full"
                                                    />
                                                </div>

                                                <div>
                                                    <span className="font-body font-bold">Chương học (*)</span>
                                                    <select
                                                        id="small"
                                                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                                      p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                                    >
                                                        <option className="hidden"> --- Chọn chương --- </option>
                                                        <option value="US">United States</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="FR">France</option>
                                                        <option value="DE">Germany</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <span className="font-body font-bold">Bài học video (*)</span>

                                                    <div className="mt-2">
                                                        <Radio.Group>
                                                            <Radio value={1}>Tải lên</Radio>
                                                            <Radio value={2}>Youtube</Radio>
                                                        </Radio.Group>
                                                    </div>

                                                    <input
                                                        type="text"
                                                        className="text-segoe mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1
                                                      focus:border-blue-400 sm:w-full"
                                                        placeholder="https://www.youtube.com"
                                                    />

                                                    <div className="mt-4 max-w-max overflow-hidden rounded-[3px]">
                                                        <ReactPlayer url="https://www.youtube.com/watch?v=LXb3EKWsInQ" />
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    ),
                                },
                                {
                                    label: 'Mô tả thêm',
                                    key: '2',
                                    children: (
                                        <div>
                                            <div>
                                                <span className="font-body font-bold">Mô tả (*)</span>

                                                <div className="mt-4">
                                                    <Editor
                                                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                                                        initialValue=""
                                                        value="<h2>1. Thì hi&ecirc;̣n tại đơn&nbsp;</h2>"
                                                        init={{
                                                            height: 700,
                                                            menubar: true,
                                                            plugins: [
                                                                'advlist',
                                                                'autolink',
                                                                'lists',
                                                                'link',
                                                                'image',
                                                                'charmap',
                                                                'preview',
                                                                'anchor',
                                                                'searchreplace',
                                                                'visualblocks',
                                                                'code',
                                                                'fullscreen',
                                                                'insertdatetime',
                                                                'media',
                                                                'table',
                                                                'code',
                                                                'help',
                                                                'wordcount',
                                                                'blockquote',
                                                                'fontsize',
                                                                'lineheight',
                                                            ],

                                                            toolbar:
                                                                'undo redo | blocks | ' +
                                                                'bold italic forecolor | alignleft aligncenter' +
                                                                'alignright alignjustify | bullist numlist outdent indent blockquote | ' +
                                                                'removeformat | fontsize | lineheight | help |',
                                                            content_style:
                                                                'body { font-family:QuickSand,Arial,sans-serif; font-size:14px; font-weight: 500; line-height: 1.5;}',
                                                            font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                },
                                {
                                    label: 'Bình luận',
                                    key: '3',
                                    children: 'Tab 3',
                                },
                            ]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
