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
            return <video src={url} preload="none" controls className="h-full w-full" />;

        case 'image':
            return <Image src={url} height={'100%'} width={'100%'} alt="Photo" className="rounded-lg object-cover" />;

        case 'audio':
            return <audio src={url} preload="none" controls />;

        default:
            return <FileOpenIcon />;
    }
};

export default RenderAttachment;
