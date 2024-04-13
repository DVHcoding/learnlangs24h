// ##################################
// #       IMPORT Npm
// ##################################
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@admin/AdminPages/AdminSidebar';
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import CreateUnit from '@admin/AdminComponents/CoursesManager/Grammar/CreateUnit';
import UpdateUnit from '@admin/AdminComponents/CoursesManager/Grammar/UpdateUnit';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

// ##################################
const GrammarItem: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    // ##########################
    // #      STATE MANAGER     #
    // ##########################

    // ##########################
    // #     FUNCTION HANDLER   #
    // ##########################

    const [value, setValue] = useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div>
            <HelmetWrapper title="Admin Page" description="Admin Page" canonical="/admin" />

            {/* CONTAINER */}
            <div
                className="scrollbar h-screen overflow-auto bg-bgCustom sm:px-0 sm:py-0 md:p-0 
                xl:px-8 xl:py-4"
            >
                {/* BOX */}
                <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div className={`scrollbar w-full overflow-auto bg-bgCustom `}>
                        {/* Navbar */}
                        <Navbar toggleTheme={toggleTheme} />

                        {/* Body */}
                        <div className="h-full px-4">
                            {/* BreadCrumbs */}
                            <div>
                                <AdminBreadcrumbs
                                    pathNext="Courses Manager"
                                    pathEnd="Unit lesson "
                                />
                            </div>

                            <div className="h-full w-full">
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs
                                            value={value}
                                            onChange={handleChange}
                                            aria-label="Tab unit"
                                        >
                                            <Tab
                                                label="Update Unit"
                                                {...a11yProps(0)}
                                                className="text-textCustom"
                                            />
                                            <Tab
                                                label="Create Unit"
                                                {...a11yProps(1)}
                                                className="text-textCustom"
                                            />
                                            <Tab
                                                label="Delete Unit"
                                                {...a11yProps(2)}
                                                className="text-textCustom"
                                            />
                                        </Tabs>
                                    </Box>

                                    <CustomTabPanel value={value} index={0}>
                                        <UpdateUnit />
                                    </CustomTabPanel>

                                    <CustomTabPanel value={value} index={1}>
                                        <CreateUnit />
                                    </CustomTabPanel>

                                    <CustomTabPanel value={value} index={2}>
                                        Delete Unit
                                    </CustomTabPanel>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default GrammarItem;
