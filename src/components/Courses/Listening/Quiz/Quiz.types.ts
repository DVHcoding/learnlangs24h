import { AudioType } from 'types/api-types';

export interface AudioProps {
    audio: AudioType;
    answers: {
        [key: string]: {
            value: string;
            border: string;
        };
    };

    setAnswers: React.Dispatch<
        React.SetStateAction<{
            [key: string]: {
                value: string;
                border: string;
            };
        }>
    >;
}
