import { useState } from 'react';
import MyWorker from '@components/Workers/myWorker?worker';
import { Input } from 'antd';

const TestWorker: React.FC = () => {
    const [result, setResult] = useState<number | null>(null);
    const [inputValue, setInputValue] = useState<number>(0);
    const [inputTwo, setInputTwo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleClick = () => {
        setLoading(true);
        const worker = new MyWorker();

        worker.postMessage(inputValue); // Gửi yêu cầu tính toán tới worker

        worker.addEventListener('message', (event: MessageEvent<number>) => {
            setResult(event.data); // Lấy kết quả từ worker
            setLoading(false);
            worker.terminate(); // Dọn dẹp worker sau khi nhận được kết quả
        });
    };

    return (
        <div>
            <h1>Web Worker Test</h1>
            <div className="flex items-center gap-2">
                <Input
                    type="number"
                    onChange={(e) => setInputValue(Number(e.target.value))}
                    className="w-1/3 border-2"
                    placeholder="Enter Number "
                />
                <button onClick={handleClick} className="btn-primary">
                    Tính toán
                </button>
            </div>
            {loading ? <p>Đang tính toán...</p> : result !== null ? <p>Kết quả: {result}</p> : <p>Nhấn nút để bắt đầu tính toán...</p>}

            <Input className="mt-4 w-[15rem]" onChange={(e) => setInputTwo(e.target.value)} placeholder="Nhập text cần render" />
            {inputTwo !== '' ? <p>Kết quả: {inputTwo}</p> : <p>Nhấn nút để bắt đầu tính toán...</p>}
        </div>
    );
};

export default TestWorker;
