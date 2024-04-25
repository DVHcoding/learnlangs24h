import { useState, useEffect } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import Logo from '@assets/logo.png';
import { createNewCourse } from '@store/reducer/courseReducer';
import { RootState, AppDispatch } from '@store/store';
import { toastError } from '@components/Toast/Toasts';

// ##################################
// #       IMPORT Npm
// ##################################
import { Link } from 'react-router-dom';
import { Sidenav, Nav, Modal, Button, Input, Loader } from 'rsuite';
import { Home, FolderKanban, Blocks, MessageCirclePlus, Layers, SquareLibrary } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// ##################################
const AdminSidebar = () => {
    // Redirect with React Router Dom v6
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();

    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const { loading } = useSelector((state: RootState) => state.newCourse);

    // fixed when screen smaller 470px
    const [expanded, setExpanded] = useState<boolean>(() => window.innerWidth > 1000);
    // Set active page
    const [activePage, setActivePage] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [unitName, setUnitName] = useState<string>('');
    const [courseImage, setCourseImage] = useState<File | null>(null);

    // ##########################
    // #    FUNCTION MANAGER    #
    // ##########################
    // Navigation when clicking on link
    const redirect = (path: string) => {
        navigate(path);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmitNewCourse = async () => {
        if (unitName === '') {
            return toastError('Vui Lòng Nhập Unit Name!');
        }

        if (!courseImage) {
            return toastError('Vui lòng chọn ảnh!');
        }

        try {
            await dispatch(createNewCourse({ unitName, courseImage }));
            setUnitName('');
            setOpen(false);
        } catch (error) {
            toastError(`${error}`);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const fileName = e.target.files?.[0]?.name;
        const extension = fileName?.split('.').pop();

        if (file) {
            if (extension === 'png' || extension === 'jpg' || extension === 'jpeg') {
                setCourseImage(file);
            } else {
                alert('Vui lòng chọn ảnh!');
                setCourseImage(null);
            }
        } else {
            setCourseImage(null);
        }
    };

    // ##########################
    // #    HOOKS MANAGER    #
    // ##########################

    useEffect(() => {
        // Set active page based on pathname
        const pathname = location.pathname;
        setActivePage(pathname);

        // Handle resize when expanding the sidebar
        const handleResize = () => {
            setExpanded(window.innerWidth > 1000);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [location.pathname]);

    // Style sidebar
    const panelStyles: React.CSSProperties = {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginTop: '20px',
    };

    return (
        <div
            className={`scrollbar duration-50 h-full w-[350px] max-w-max 
            overflow-auto border-r-2 border-bdCustom transition-all sm:overflow-x-hidden
            ${expanded ? 'phone:fixed phone:z-10 pm:fixed pm:z-10 tablet:fixed tablet:z-10' : ''}`}
        >
            <Sidenav
                defaultOpenKeys={['3', '4']}
                expanded={expanded}
                className="h-full bg-bgCustom"
            >
                <Sidenav.Body>
                    <Nav activeKey="1">
                        <Link to="/">
                            <img
                                width={16}
                                height={16}
                                src={Logo}
                                alt="logo"
                                className={`mb-8 ml-4 mt-6 w-16 select-none ${
                                    !expanded ? 'sm:ml-1 sm:w-12 md:ml-1 md:w-12' : ''
                                } 
                                sm:mb-4 phone:mb-2 phone:ml-2 phone:w-10`}
                            />
                        </Link>

                        {/*=========================================*/}
                        <Nav.Item
                            eventKey="1"
                            panel
                            style={{
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                marginLeft: '20px',
                                marginTop: '20px',
                            }}
                            className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}
                        >
                            General
                        </Nav.Item>

                        {/*=========================================*/}

                        <Nav.Item
                            onClick={() => redirect('/admin')}
                            eventKey="2"
                            className={`bg-bgCustom before:absolute ${
                                activePage === '/admin' ? 'before:h-8' : 'before:h-0'
                            } before:bottom-2 
                            before:left-0 before:w-[3px] before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            icon={<Home className="absolute left-5" strokeWidth={1.5} size={17} />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Dashboard</span>
                        </Nav.Item>

                        {/*=========================================*/}

                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="3"
                            title="Widgets"
                            icon={
                                <Blocks className="absolute left-5" strokeWidth={1.5} size={17} />
                            }
                        >
                            <Nav.Item
                                onClick={() => redirect('/admin/general')}
                                eventKey="3-1"
                                className={`before:absolute ${
                                    activePage === '/admin/general' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    General
                                </span>
                            </Nav.Item>

                            <Nav.Item
                                onClick={() => redirect('/admin/chart')}
                                eventKey="3-2"
                                className={`before:absolute ${
                                    activePage === '/admin/chart' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Chart
                                </span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <div className="h-[1px] w-full bg-slate-200"></div>

                        {/*=========================================*/}
                        <Nav.Item
                            panel
                            style={panelStyles}
                            className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}
                        >
                            Application
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="4"
                            title="Courses"
                            icon={
                                <FolderKanban
                                    className="absolute left-5 text-textSidebar"
                                    strokeWidth={1.5}
                                    size={17}
                                />
                            }
                        >
                            <Nav.Item
                                onClick={() => redirect('/admin/courses')}
                                eventKey="4-1"
                                className={`before:absolute ${
                                    activePage === '/admin/courses' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Courses List
                                </span>
                            </Nav.Item>

                            <Nav.Item
                                onClick={handleOpen}
                                eventKey="4-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    New Course
                                </span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="5"
                            title="Chat"
                            icon={
                                <MessageCirclePlus
                                    className="absolute left-5 text-textSidebar"
                                    strokeWidth={1.5}
                                    size={17}
                                />
                            }
                        >
                            <Nav.Item
                                onClick={() => redirect('/admin/courses')}
                                eventKey="5-1"
                                className={`before:absolute ${
                                    activePage === '/admin/courses' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Private Chat
                                </span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="5-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Group Chat
                                </span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="6"
                            title="Card Manager"
                            icon={
                                <Layers
                                    className="absolute left-5 text-textSidebar"
                                    strokeWidth={1.5}
                                    size={17}
                                />
                            }
                        >
                            <Nav.Item
                                onClick={() => redirect('/admin/courses')}
                                eventKey="6-1"
                                className={`before:absolute ${
                                    activePage === '/admin/courses' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Card List
                                </span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="6-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    New Card
                                </span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="7"
                            title="Books"
                            icon={
                                <SquareLibrary
                                    className="absolute left-5 text-textSidebar"
                                    strokeWidth={1.5}
                                    size={17}
                                />
                            }
                        >
                            <Nav.Item
                                onClick={() => redirect('/admin/courses')}
                                eventKey="7-1"
                                className={`before:absolute ${
                                    activePage === '/admin/courses' ? 'before:h-8' : 'before:h-0'
                                } before:bottom-2 before:left-0 before:w-[3px]
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    Books List
                                </span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="7-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                                before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textSidebar transition-all hover:text-[#8bbf64]">
                                    New Books
                                </span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <div className="h-[1px] w-full bg-slate-200"></div>

                        {/*=========================================*/}
                        <Nav.Item
                            panel
                            style={panelStyles}
                            className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}
                        >
                            FORMS & TABLE
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>

                <div className="bg-bgCustom">
                    <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
                </div>
            </Sidenav>

            <Modal open={open} onClose={handleClose}>
                <Modal.Header>
                    <Modal.Title>Create New Course</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="mb-4">
                        <label
                            aria-label="Unit Name"
                            className=" text-base font-semibold text-textCustom"
                        >
                            Unit Name
                        </label>
                        <Input
                            size="lg"
                            placeholder="Unit Name"
                            value={unitName}
                            onChange={(value) => setUnitName(value)}
                            className="mt-2 border-bdCustom bg-bgCustom"
                        />
                    </div>

                    <div>
                        <input
                            type="file"
                            id="courseImage"
                            accept=".png, .jpg, .jpeg"
                            onChange={handleImageChange}
                            className="max-w-max text-textCustom"
                        />
                    </div>

                    {loading && <Loader content="Loading..." className="mt-4" />}
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        disabled={loading}
                        onClick={() => handleSubmitNewCourse()}
                        appearance="primary"
                    >
                        Ok
                    </Button>
                    <Button
                        onClick={handleClose}
                        appearance="subtle"
                        className="bg-bgCustom text-textCustom"
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminSidebar;
