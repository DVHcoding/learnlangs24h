// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { FileOpen as FileOpenIcon } from '@mui/icons-material';
import { Image } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
type FileType = 'file' | 'image' | 'video' | 'audio';

const RenderAttachment = (file: FileType, url: string) => {
    switch (file) {
        case 'video':
            return <video src={url} preload="none" width={'200px'} controls />;

        case 'image':
            return <Image src={url} height={'100%'} alt="Photo" className="h-full w-full rounded-lg" />;

        case 'audio':
            return <audio src={url} preload="none" controls />;

        default:
            return <FileOpenIcon />;
    }
};

export default RenderAttachment;
