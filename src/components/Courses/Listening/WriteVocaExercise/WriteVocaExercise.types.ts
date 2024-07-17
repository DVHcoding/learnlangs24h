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

export interface SettingsModelProps {
    isModalOpen: boolean;
    settings: SettingTypes;
    setSettings: (value: React.SetStateAction<SettingTypes>) => void;
    handleChangeSettings: () => void;
    handleCancelSettings: () => void;
}

export interface TopbarProgressProps {
    courseId: string | undefined;
    id: string | null;
    gameState: GameStateType;
    settings: SettingTypes;
    vocabularies: Sentence[];
    vocabularyStars: CorrectWordType[];

    textAreaRef: React.RefObject<HTMLTextAreaElement>;
    rating: {
        [key: string]: number;
    };
    showModal: () => void;
    handleStartAgain: () => void;
    cancelAllStars: () => void;
    handleSpeakText: (value: string, _id: string) => void;
    handleRatingChange: (vocabulary: VocabularyStarsType, newValue: number | null) => void;
    handleKeyDown: (
        event: React.KeyboardEvent<HTMLTextAreaElement>,
        _id: string,
        english: string,
        vietnamese: string,
        indexAnswer: number
    ) => void;
    handleSubmit: (_id: string, english: string, vietnamese: string, indexAnswer: number) => void;
    textToSpeech: () => void;
    speaking: boolean;
    handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    activeSpeak: string | null;
}
