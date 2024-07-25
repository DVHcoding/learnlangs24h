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
