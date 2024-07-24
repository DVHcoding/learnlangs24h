/* -------------------------------------------------------------------------- */
/*                                   SHARED                                   */
/* -------------------------------------------------------------------------- */
interface UnitLessonTypes {
    title: string;
    time: string;
    icon: string;
    lectureType: string;
    exerciseType: string;
    lesson: string;
    course: string;
}

/* -------------------------------------------------------------------------- */
/*                       New UnitLesson And VocaExercise                      */
/* -------------------------------------------------------------------------- */
export interface NewUnitLessonAndVocaExercisePayload extends UnitLessonTypes {
    vocabularies: Vocabulary[];
    sentences: Sentence[];
    audio: IAudio;
    audioFile: File[];
}

interface IAudio {
    answer: string;
    otherAnswer: string;
}

export interface Vocabulary {
    english: string;
    vietnamese: string;
}

type Sentence = Vocabulary;

/* -------------------------------------------------------------------------- */
/*                      New UnitLesson And ListenExercise                     */
/* -------------------------------------------------------------------------- */

export interface NewUnitLessonAndListenExercisePayload extends UnitLessonTypes {
    questionLabel: string;
    questions: Question;
    transcript: string;
    audioFile: File;
}

export interface Question {
    questionTitle: string;
    options: string[];
    answer: string;
}
