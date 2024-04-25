// ##################################
// #       IMPORT Npm
// ##################################

// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@admin/AdminPages/AdminSidebar';
import AdminBreadcrumbs from './AdminBreadcrumbs/AdminBreadcrumbs';

// ##################################
const DashBoard: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const expanded: boolean = window.innerWidth > 390;

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
                    <div
                        className={`scrollbar w-full overflow-auto bg-bgCustom 
                        ${expanded ? 'phone:z-0' : ''} `}
                    >
                        {/* Navbar */}
                        <Navbar toggleTheme={toggleTheme} />

                        {/* Body */}
                        <div className="h-full px-4">
                            {/* BreadCrumbs */}
                            <div>
                                <AdminBreadcrumbs pathNext="Admin" pathEnd="Dashboard" />
                            </div>

                            <div className="grid auto-rows-[200px] gap-4 xl:grid-cols-3 tablet:grid-cols-2 ">
                                <div
                                    className="mx-auto w-full bg-slate-400 md:col-span-2 xl:col-span-2 xl:row-span-2 
                                tablet:col-span-2 tablet:row-span-2"
                                >
                                    Item 1
                                </div>
                                <div className="mx-auto w-full bg-slate-400 ">Item 2</div>
                                <div className="mx-auto w-full bg-slate-400 md:col-start-1 xl:col-auto">
                                    Item 3
                                </div>
                                <div
                                    className="mx-auto w-full bg-slate-400 md:col-start-2 md:row-span-2 md:row-start-2 
                                    xl:col-auto xl:row-auto tablet:col-span-2 tablet:row-span-2"
                                >
                                    Item 4
                                </div>
                                <div className="mx-auto w-full bg-slate-400">Item 5</div>
                                <div className="mx-auto w-full bg-slate-400">Item 6</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
