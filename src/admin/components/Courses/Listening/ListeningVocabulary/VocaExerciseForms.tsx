// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button, Tabs } from 'antd';
import { Fragment, useState } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import ListCard from '@admin/components/Courses/Listening/ListeningVocabulary/SingleWord/ListCard';
import ImportCard from '@admin/components/Courses/Listening/ListeningVocabulary/SingleWord/ImportCard';

const VocaExerciseForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showDrawer = (): void => {
        setOpen(true);
    };

    const onClose = (): void => {
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
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Vocabulary',
                        key: '1',
                        children: (
                            <div className="rounded-md bg-bgCustomCard p-4">
                                <Button type="dashed" onClick={showDrawer}>
                                    + Nhập
                                </Button>

                                <ListCard />

                                {/* Import List words with files */}
                                <ImportCard onClose={onClose} open={open} />
                            </div>
                        ),
                    },
                    {
                        label: 'Sentence',
                        key: '2',
                        children: <div>tab2</div>,
                    },
                    {
                        label: 'Quiz',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </Fragment>
    );
};

export default VocaExerciseForms;
