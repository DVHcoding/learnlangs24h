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
