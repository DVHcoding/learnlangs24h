// ##################################
// #       IMPORT Npm
// ##################################
import { useState, useEffect } from 'react';
import { Sidenav, Nav } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import { SquareLibrary, Medal, Headphones, Shell, ContactRound, CircleDollarSign, BookOpenText } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// ##################################
// #       IMPORT Components
// ##################################
import Logo from '@assets/logo.png';
import { useGetAllCoursesQuery } from '@store/api/courseApi';
import { CourseType } from 'types/api-types';
import { useGetMyChatsQuery } from '@store/api/chatApi';

const Sidebar: React.FC = () => {
    // Redirect with React Router Dom v6
    const navigate = useNavigate();
    const location = useLocation();
    const { data, isLoading } = useGetAllCoursesQuery();
    const myChats = useGetMyChatsQuery();
    const chatId = localStorage.getItem('chatId');

    let targetChatId: string = 'new'; // Giá trị mặc định là 'new'

    if (chatId) {
        targetChatId = chatId;
    } else if (myChats?.data?.success && myChats.data.chats.length > 0) {
        targetChatId = myChats.data.chats[0]._id;
    }

    // Style sidebar
    const panelStyles: React.CSSProperties = {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginLeft: '20px',
        marginTop: '20px',
    };

    // fixed when screen smaller 470px
    const [expanded, setExpanded] = useState<boolean>(() => window.innerWidth > 1000);

    // Set active page
    const [activePage, setActivePage] = useState<string>('');

    // Navigation when clicking on link
    const redirect = (path: string) => {
        navigate(path);
    };

    // Get pathname with useLocation hooks (example: /grammar)
    useEffect(() => {
        const pathname = location.pathname;
        setActivePage(pathname);
    }, [location.pathname]);

    // Handle resize when expand to the sidebar
    useEffect(() => {
        const handleResize = () => {
            setExpanded(window.innerWidth > 1000);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div
            className={`scrollbar duration-50 z-20 h-full w-[240px] overflow-auto 
            overflow-x-hidden border-r-2 border-bdCustom transition-all 
            ${expanded ? 'phone:fixed phone:z-20 pm:fixed ' : 'w-[3.8rem]'}`}
        >
            <Sidenav defaultOpenKeys={['3', '4']} expanded={expanded} className="h-full bg-bgCustom">
                <Sidenav.Body>
                    <Nav activeKey="1">
                        <li>
                            <Link to="/">
                                <img
                                    width={16}
                                    height={16}
                                    src={Logo}
                                    alt="logo"
                                    className={`mb-8 ml-4 mt-6 w-16 select-none ${!expanded ? 'sm:ml-1 sm:w-12 md:ml-1 md:w-12' : ''} 
                                sm:mb-4 phone:mb-2 phone:ml-2 phone:w-10`}
                                />
                            </Link>
                        </li>

                        {/*=========================================*/}

                        <Nav.Item
                            eventKey="1"
                            panel
                            style={panelStyles}
                            className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}
                        >
                            Top Features
                        </Nav.Item>

                        {/*=========================================*/}

                        <Nav.Item
                            onClick={() => redirect('/')}
                            eventKey="2"
                            className={`bg-bgCustom before:absolute ${activePage === '/' ? 'before:h-8' : 'before:h-0'} before:bottom-2 
                            before:left-0 before:w-[3px] before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            icon={<DashboardIcon />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Dashboard</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Menu
                            className="bg-bgCustom"
                            onClick={() => setExpanded(true)}
                            eventKey="3"
                            title="Courses"
                            icon={<BookOpenText className="absolute left-5 text-textSidebar" strokeWidth={1.5} size={17} />}
                        >
                            {!isLoading &&
                                data?.courses.map((course: CourseType, courseIndex: number) => (
                                    <Nav.Item
                                        key={course._id}
                                        onClick={() => redirect(`/${course.name.toLowerCase()}/${course._id}`)}
                                        eventKey={`3-${courseIndex + 1}`}
                                        className={`before:absolute ${
                                            activePage === `/${course.name.toLocaleLowerCase()}/${course._id}` ? 'before:h-8' : 'before:h-0'
                                        } before:bottom-2 before:left-0 before:w-[3px]
                                        before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                                    >
                                        <span className="text-textSidebar transition-all hover:text-[#8bbf64]">{course.name}</span>
                                    </Nav.Item>
                                ))}
                        </Nav.Menu>

                        {/*=========================================*/}
                        <Nav.Item
                            className={`${
                                activePage === `/messages/${targetChatId}` ? 'before:h-8' : 'before:h-0'
                            } bg-bgCustom before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                          before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200`}
                            onClick={() => redirect(`/messages/${targetChatId}`)}
                            eventKey="4"
                            icon={<GroupsOutlinedIcon color="action" fontSize="small" className="absolute left-5 text-textSidebar" />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Group Chat</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Item
                            className="bg-bgCustom before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                            before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            eventKey="5"
                            icon={<StyleOutlinedIcon color="action" fontSize="small" className="absolute left-5 text-textSidebar" />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Vocabulary</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Item
                            className="bg-bgCustom before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                            before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            eventKey="6"
                            icon={<SquareLibrary className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Books</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <div className="h-[1px] w-full bg-slate-200"></div>

                        {/*=========================================*/}
                        <Nav.Item panel style={panelStyles} className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}>
                            Advanced
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Menu
                            onClick={() => setExpanded(true)}
                            eventKey="7"
                            title="Certificates"
                            icon={<Medal className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <Nav.Item
                                eventKey="7-1"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                              before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textCustom transition-all hover:text-[#8bbf64]">IELTS</span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="7-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                              before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textCustom transition-all hover:text-[#8bbf64]">TOEIC</span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="7-3"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                              before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textCustom transition-all hover:text-[#8bbf64]">TOEFL</span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <Nav.Menu
                            onClick={() => setExpanded(true)}
                            eventKey="8"
                            title="Listen & Type"
                            icon={<Headphones className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <Nav.Item
                                eventKey="8-1"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                              before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textCustom transition-all hover:text-[#8bbf64]">All Topic</span>
                            </Nav.Item>

                            <Nav.Item
                                eventKey="8-2"
                                className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px] 
                              before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            >
                                <span className="text-textCustom transition-all hover:text-[#8bbf64]">Type & Music</span>
                            </Nav.Item>
                        </Nav.Menu>

                        {/*=========================================*/}
                        <div className="h-[1px] w-full bg-slate-200"></div>

                        {/*=========================================*/}
                        <Nav.Item panel style={panelStyles} className={`phone:hidden ${!expanded ? 'hidden' : ''} text-textCustom`}>
                            Articles
                        </Nav.Item>

                        <Nav.Item
                            className="bg-bgCustom before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                            before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            eventKey="9"
                            icon={<Shell className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Blog</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Item
                            className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                            before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            eventKey="10"
                            icon={<ContactRound className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Contact</span>
                        </Nav.Item>

                        {/*=========================================*/}
                        <Nav.Item
                            className="before:absolute before:bottom-2 before:left-0 before:h-0 before:w-[3px]
                                    before:bg-[#8bbf64] hover:before:h-8 hover:before:transition-all hover:before:duration-200"
                            eventKey="11"
                            icon={<CircleDollarSign className="absolute left-5" strokeWidth={1.5} size={19} />}
                        >
                            <span className="transition-all hover:text-[#8bbf64]">Donate❤️</span>
                        </Nav.Item>
                    </Nav>
                </Sidenav.Body>

                <div className="bg-bgCustom">
                    <Sidenav.Toggle onToggle={(expanded) => setExpanded(expanded)} />
                </div>
            </Sidenav>
        </div>
    );
};

export default Sidebar;
