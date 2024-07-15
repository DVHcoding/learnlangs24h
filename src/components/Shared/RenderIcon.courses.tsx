import { PencilLine } from 'lucide-react';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { FaRegFileAlt } from 'react-icons/fa';
import { MdOutlineHeadphones } from 'react-icons/md';

const RenderIcon = (unitLessonIcon: string) => {
    switch (unitLessonIcon) {
        case 'videoLecture':
            return <IoPlayCircleSharp className="text-sm text-orange-400" />;
        case 'exercise':
            return <PencilLine className="text-orange-400" size={13} />;
        case 'test':
            return <FaRegFileAlt className="text-orange-400" size={13} />;
        case 'listen':
            return <MdOutlineHeadphones className="text-orange-400" size={13} />;

        default:
            break;
    }
};

export default RenderIcon;
