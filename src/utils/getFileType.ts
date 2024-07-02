import { FileType } from 'types/types';

export const getFileType = (file: File): FileType => {
    if (file.type.startsWith('image/')) {
        return 'image';
    } else if (file.type.startsWith('video/')) {
        return 'video';
    } else if (file.type.startsWith('audio/')) {
        return 'audio';
    } else {
        return 'file';
    }
};
