// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useState } from 'react';
import { Breadcrumb, Button, ConfigProvider, DatePicker } from 'antd';
import { Link } from 'react-router-dom';
import { DatePickerProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { hasEmptyFields } from '@utils/Helpers';

const Gift: React.FC = () => {
    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [name, setName] = useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    const [expiryType, setExpiryType] = useState<'permanent' | 'temporary'>('permanent');
    const [expiryDate, setExpiryDate] = useState<string | null>(null);
    const [ownerId, setOwnerId] = useState<string>('');

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleDateOnChange: DatePickerProps['onChange'] = (_, dateStr) => {
        if (typeof dateStr === 'string' || dateStr === null) {
            setExpiryDate(dateStr);
        } else {
            console.warn('Unexpected date string array received.');
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (hasEmptyFields([name, ownerId]) || (expiryType === 'temporary' && !expiryDate) || !file) {
            alert('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('gift', file);
        formData.append('expiryType', expiryType);
        if (expiryDate && expiryType === 'temporary') formData.append('expiryDate', expiryDate);
        formData.append('userId', ownerId);

        window.location.reload();
    };

    console.log(expiryDate);

    return (
        <div className="h-full px-4">
            <div className="mb-4">
                <Breadcrumb items={[{ title: <Link to="/admin">Dashboard</Link> }, { title: 'Gift' }, { title: 'Tặng quà' }]} />
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Button type="primary" className="max-w-max" htmlType="submit">
                    Tặng quà
                </Button>

                <div>
                    <span className="font-body font-bold text-textCustom">Tên (*)</span>
                    <input
                        name="name"
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nhập tên của món quà"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Hình ảnh (*)</span>
                    <input
                        name="file"
                        required
                        type="file"
                        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Loại thời hạn (*)</span>
                    <select
                        name="expiryType"
                        required
                        value={expiryType}
                        onChange={(e) => setExpiryType(e.target.value as 'permanent' | 'temporary')}
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option value="permanent">Vĩnh viễn</option>
                        <option value="temporary">Có thời hạn</option>
                    </select>
                </div>

                {expiryType === 'temporary' && (
                    <div>
                        <span className="font-body font-bold text-textCustom">Thời gian (*)</span>
                        <ConfigProvider>
                            <DatePicker
                                showTime
                                className="mt-1 block w-[21.8rem] rounded-[3px] bg-bgCustom p-2 text-textCustom hover:bg-bgCustom"
                                onChange={handleDateOnChange}
                            />
                        </ConfigProvider>
                    </div>
                )}

                <div>
                    <span className="font-body font-bold text-textCustom">Id người nhận (*)</span>
                    <input
                        name="ownerId"
                        required
                        type="text"
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}
                        placeholder="Nhập id của người nhận"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom p-2 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>
            </form>
        </div>
    );
};

export default Gift;
