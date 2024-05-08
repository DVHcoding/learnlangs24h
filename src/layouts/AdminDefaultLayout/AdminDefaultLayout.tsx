// ##################################
// #       IMPORT Npm
// ##################################
import loadable from '@loadable/component';
import { Spin } from 'antd';
import { ReactNode } from 'react';

// ##################################
// #       IMPORT Components
// ##################################
const Navbar = loadable(() => import('@pages/Header/Navbar'));
const Sidebar = loadable(() => import('@admin/AdminPages/AdminSidebar'), {
    fallback: <Spin className="max-w-max translate-x-[50%] translate-y-[50%]" />,
});

// ##################################
const AdminDefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const expanded: boolean = window.innerWidth > 390;

    return (
        <div>
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
                        <Navbar />

                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDefaultLayout;
