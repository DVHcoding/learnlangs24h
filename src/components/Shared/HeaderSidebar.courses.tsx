import { HeaderSidebarProps } from '@components/Courses/Listening/Listening.types';

const headerSidebar: React.FC<HeaderSidebarProps> = ({ title, process, totalTime }) => {
    return (
        <div>
            <h4 className="font-sans text-base font-medium tracking-tight text-textCustom">{title}</h4>

            <div className="flex items-center gap-2">
                <span className="font-sans text-xs font-normal text-textCustom">{process}</span>
                <p className="mb-[1px] font-sans text-xs font-light text-textCustom">|</p>
                <span className="font-sans text-xs font-normal text-textCustom">{totalTime}</span>
            </div>
        </div>
    );
};

export default headerSidebar;
