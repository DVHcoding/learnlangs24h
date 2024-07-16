import { Sentence } from 'types/api-types';

export interface GameStateType {
    answer: string;
    correctWord: CorrectWordType[];
    wordToShow: Sentence[];
    activeCard: number;
    remainWord: Sentence[];
    inCorrectWord: IncorrectWordType[];
    isWaiting: boolean;
}

export interface IncorrectWordType {
    _id: string;
    english: string;
    vietnamese: string;
    count: number;
}

export type CorrectWordType = Omit<IncorrectWordType, 'count'>;

export type VocabularyStarsType = CorrectWordType;

export interface SettingTypes {
    learnAll: boolean;
    learnStar: boolean;
    displayFirstEnglish: boolean;
    textToSpeech: boolean;
    hideWord: boolean;
}
