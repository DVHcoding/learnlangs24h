// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { FileOpen as FileOpenIcon } from '@mui/icons-material';
import { getFileType } from '@utils/getFileType';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const RenderFile = (file: File, url: string) => {
    const fileType = getFileType(file);

    switch (fileType) {
        case 'video':
            return <video src={url} preload="none" className="h-full w-full" />;

        case 'image':
            return <img src={url} alt="Photo" className=" h-full w-full rounded-lg object-cover" />;

        case 'audio':
            return <audio src={url} preload="none" controls />;

        default:
            return <FileOpenIcon />;
    }
};

export default RenderFile;
