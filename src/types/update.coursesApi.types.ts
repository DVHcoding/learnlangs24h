/* -------------------------------------------------------------------------- */
/*                                   SHARED                                   */
/* -------------------------------------------------------------------------- */
interface UnitLessonTypes {
    _id: string;
    title: string;
    time: string;
    icon: string;
    course: string;
    lesson: string;
    lectureType: string;
}

export interface Question {
    questionTitle: string;
    options: Option[] | string[];
    answer: string;
}

export interface Option {
    image: {
        public_id: string;
        url: string;
    };
    text: string;
}

/* -------------------------------------------------------------------------- */
/*                 update unitlesson and videolecture content                 */
/* -------------------------------------------------------------------------- */
export interface UpdateUnitLessonAndVideoLecturePayloadType {
    _id: string;
    title: string;
    time: string;
    lesson: string;
    videoUrl: string;
    totalTime: string;
    description: string;
}

/* -------------------------------------------------------------------------- */
/*                   update unitLesson and grammar exercise                   */
/* -------------------------------------------------------------------------- */
export interface UpdateUnitLessonAndGrammarExercisePayloadTypes {
    _id: string;
    title: string;
    time: string;
    lesson: string;
    questions?: QuestionType[];
}

interface QuestionType {
    sentence: string;
    correctAnswer: string[];
    otherAnswer: string[];
}

/* -------------------------------------------------------------------------- */
/*                     update unitLesson and vocaExercise                     */
/* -------------------------------------------------------------------------- */
export interface UpdateUnitLessonAndVocaExercisePayloadTypes {
    _id: string;
    title: string;
    time: string;
    icon: string;
    course: string;
    lesson: string;
    lectureType: string;
    vocabularies: Card[];
    sentences: Card[];
    audio: IAudio[];
}

interface Card {
    _id?: string;
    english: string;
    vietnamese: string;
}

interface IAudio {
    public_id?: string;
    url?: string;
    answer: string;
    otherAnswer: string;
}

/* -------------------------------------------------------------------------- */
/*                     update unitLesson and listenExercise                   */
/* -------------------------------------------------------------------------- */
export interface UpdateUnitLessonAndListenExercisePayloadTypes extends UnitLessonTypes {
    questions: Question;
    questionLabel: string;
    transcript: string;
}
