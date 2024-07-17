import { Modal, Switch } from 'antd';
import { SettingsModelProps } from './WriteVocaExercise.types';

const SettingsModel: React.FC<SettingsModelProps> = ({
    isModalOpen,
    settings,
    setSettings,
    handleChangeSettings,
    handleCancelSettings,
}) => {
    return (
        <Modal title="Settings" open={isModalOpen} onOk={handleChangeSettings} onCancel={handleCancelSettings}>
            <div className="grid grid-cols-2 gap-1">
                <button
                    className={`rounded-md p-2 ${settings.learnAll ? 'bg-blue-500 text-white' : 'bg-gray-200'} text-nowrap phone:text-xs`}
                    onClick={() => setSettings((preState) => ({ ...preState, learnAll: true, learnStar: false }))}
                >
                    Học tất cả
                </button>

                <button
                    className={`rounded-md p-2 ${settings.learnStar ? 'bg-blue-500 text-white' : 'bg-gray-200'} text-nowrap phone:text-xs`}
                    onClick={() => setSettings((preState) => ({ ...preState, learnStar: true, learnAll: false }))}
                >
                    Học các thuật ngữ có dấu sao
                </button>
            </div>

            <ul className="mt-2">
                <li className="flex items-center justify-between">
                    <h3>Hiển thị tiếng anh đầu tiên</h3>
                    <Switch
                        size="small"
                        checked={settings.displayFirstEnglish}
                        onChange={(checked) => setSettings((preState) => ({ ...preState, displayFirstEnglish: checked }))}
                    />
                </li>

                <li className="flex items-center justify-between">
                    <h3>Đọc nội dung</h3>
                    <Switch
                        size="small"
                        checked={settings.textToSpeech}
                        onChange={(checked) => setSettings((preState) => ({ ...preState, textToSpeech: checked }))}
                    />
                </li>

                <li className="flex items-center justify-between">
                    <h3>Ẩn nội dung </h3>
                    <Switch
                        size="small"
                        checked={settings.hideWord}
                        onChange={(checked) => setSettings((preState) => ({ ...preState, hideWord: checked }))}
                    />
                </li>
            </ul>
        </Modal>
    );
};

export default SettingsModel;
