const Exam: React.FC = () => {
    return (
        <ul
            className="grid auto-rows-[7rem] grid-cols-2 gap-2 rounded-lg sm:col-span-12 
                            md:col-span-6 xl:col-span-5"
        >
            {[...Array(4)].map((_, index) => (
                <li key={index} className="grid content-center justify-items-center gap-2 rounded-lg bg-bgHoverGrayDark">
                    <h3 className="max-w-max rounded-lg font-segoe text-lg leading-tight text-textCustom">Số đề đã làm</h3>
                    <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom">12</h3>
                    <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom">Đề thi</h3>
                </li>
            ))}
        </ul>
    );
};

export default Exam;
