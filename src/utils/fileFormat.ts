import { FileType } from 'types/types';

/////////////////////////////////////////////////////////////////
const isValidFileType = (fileType: FileType): boolean => {
    const allowedTypes: FileType[] = ['image', 'video', 'audio'];
    return allowedTypes.includes(fileType);
};
/////////////////////////////////////////////////////////////////
const fileFormat = (url = '') => {
    const fileExt = url.split('.').pop();

    if (fileExt === 'mp4' || fileExt === 'webm' || fileExt === 'ogg') return 'video';

    if (fileExt === 'mp3' || fileExt === 'wav') return 'audio';
    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif' || fileExt === 'webp') return 'image';

    return 'file';
};
/////////////////////////////////////////////////////////////////

export { fileFormat, isValidFileType };
