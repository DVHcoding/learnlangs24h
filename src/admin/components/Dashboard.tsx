// ##################################
// #       IMPORT Npm
// ##################################

// ##################################
// #       IMPORT Components
// ##################################
import AdminBreadcrumbs from './AdminBreadcrumbs/AdminBreadcrumbs';

// ##################################
const DashBoard: React.FC = () => {
    return (
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
                <div className="mx-auto w-full bg-slate-400 md:col-start-1 xl:col-auto">Item 3</div>
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
    );
};

export default DashBoard;
