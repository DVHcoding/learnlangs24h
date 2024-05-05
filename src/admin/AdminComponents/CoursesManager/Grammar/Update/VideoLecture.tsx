// ##########################
// #      IMPORT NPM        #
// ##########################
import { Tabs, Radio } from 'antd';
import ReactPlayer from 'react-player';
import { Editor } from '@tinymce/tinymce-react';

// ##########################
// #    IMPORT Components   #
// ##########################

const VideoLecture:React.FC = () => {
    return (
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
    );
};

export default VideoLecture;
