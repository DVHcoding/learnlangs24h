import { PencilLine } from 'lucide-react';
import { IoPlayCircleSharp } from 'react-icons/io5';
import { FaRegFileAlt } from 'react-icons/fa';
import { MdOutlineHeadphones } from 'react-icons/md';
//@ts-ignore
import { IconType } from '@types/types';

const RenderIcon = (unitLessonIcon: string) => {
    switch (unitLessonIcon) {
        case IconType.VideoLecture:
            return <IoPlayCircleSharp className="text-sm text-orange-400" />;
        case IconType.Exercise:
            return <PencilLine className="text-orange-400" size={13} />;
        case IconType.Test:
            return <FaRegFileAlt className="text-orange-400" size={13} />;
        case IconType.ListenExercise:
            return <MdOutlineHeadphones className="text-orange-400" size={13} />;

        default:
            break;
    }
};

export default RenderIcon;
