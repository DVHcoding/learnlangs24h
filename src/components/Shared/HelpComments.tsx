// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment, useState } from 'react';
import { IoIosHelpCircle } from 'react-icons/io';
import { Avatar, Drawer } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { APIResponse } from 'types/api-types';

const HelpComments: React.FC<{ userDetailsData: APIResponse | undefined }> = ({ userDetailsData }) => {
    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const headerDrawerStyles = {
        header: { padding: '8px', border: 'none' },
    };

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <div
                className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center 
                gap-2 rounded-lg bg-slate-100 p-2 shadow-md"
                onClick={showDrawer}
            >
                <IoIosHelpCircle className="text-orange-400" size={20} />
                <p className="text-title select-none text-nowrap font-bold">Hỏi đáp</p>
            </div>

            <Drawer onClose={onClose} open={open} width={600} styles={headerDrawerStyles}>
                <div className="flex items-center gap-2">
                    <Avatar src={userDetailsData?.user?.photo?.url} className="min-h-10 min-w-10 object-cover" />
                    <input type="text" className="w-full rounded-md bg-[#f6f7fb] p-2" placeholder="Nhập bình luận tại đây" />
                </div>
            </Drawer>
        </Fragment>
    );
};

export default HelpComments;
