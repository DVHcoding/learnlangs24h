// ##################################
// #       IMPORT Components
// ##################################
import PracticeQuestion from './PracticeQuestion.json';
import { LectureVideoType } from 'types/types';

// ##################################
// #       IMPORT Npm
// ##################################
import ReactPlayer from 'react-player';
import { useSearchParams } from 'react-router-dom';

const LectureVideoCard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const videoUrl = PracticeQuestion.lectureVideo.find((lesson: LectureVideoType) => {
        return lesson.lessonId === id;
    })?.videoUrl;

    return (
        <div
            className="h-[60%] rounded-lg xl:h-[70%] xl:w-[100%] 
            phone:h-[50%] phone:w-full phone:overflow-hidden pm:h-[40%]"
        >
            <ReactPlayer width="100%" height="100%" controls={true} url={videoUrl} />
        </div>
    );
};

export default LectureVideoCard;
