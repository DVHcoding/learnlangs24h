// ##################################
// #       IMPORT Npm
// ##################################
import React, { useEffect, useState } from 'react';
import { Badge } from 'antd';
import { AutoComplete, InputGroup, Toggle } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { MessageCircleMore, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ##################################
// #       IMPORT Components
// ##################################
import TippyNotify from '@components/Tippys/TippyNotify';
import TippyProfile from '@components/Tippys/TippyProfile';
import { useGetMyChatsQuery } from '@store/api/chatApi';
import { RootState } from '@store/store';

// ##################################
const Navbar: React.FC = () => {
    type Theme = 'light' | 'dark';

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [theme, setTheme] = useState<Theme>(() => {
        const themeLocal = localStorage.getItem('theme');

        let themeBoolean: Theme = 'light';

        if (themeLocal === 'false') {
            themeBoolean = 'light';
        } else if (themeLocal === 'true') {
            themeBoolean = 'dark';
        }

        return themeBoolean;
    });

    // Light & DarkMode
    const [checked, setChecked] = useState<boolean>(() => {
        const theme = localStorage.getItem('theme');

        let setThemeBoolean = false;

        if (theme === null) {
            localStorage.setItem('theme', 'false');
        }

        if (theme === 'false') {
            setThemeBoolean = false;
        } else if (theme === 'true') {
            setThemeBoolean = true;
        }

        return setThemeBoolean;
    });

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { notificationCount } = useSelector((state: RootState) => state.misc);
    const myChats = useGetMyChatsQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const chatId = localStorage.getItem('chatId');

    let targetChatId: string = 'new'; // Giá trị mặc định là 'new'

    if (chatId) {
        targetChatId = chatId;
    } else if (myChats?.data?.success && myChats.data.chats.length > 0) {
        targetChatId = myChats.data.chats[0]._id;
    }

    const data: string[] = [
        'Eugenia',
        'Bryan',
        'Linda',
        'Nancy',
        'Lloyd',
        'Alice',
        'Julia',
        'Albert',
        'Louisa',
        'Lester',
        'Lola',
        'Lydia',
        'Hal',
        'Hannah',
        'Harriet',
        'Hattie',
        'Hazel',
        'Hilda',
    ];

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    useEffect(() => {
        document.body.classList.add(theme);

        return () => {
            document.body.classList.remove(theme);
        };
    }, [theme]);

    return (
        <div
            className="scrollbar flex items-center justify-between overflow-auto px-4 
            py-3 sm:justify-around sm:border sm:border-bdCustom"
        >
            <h1 className="font-body text-lg font-bold text-textCustom sm:hidden">LearnLangs24h</h1>
            {/* Search */}
            <div className="sm:hidden">
                <InputGroup inside>
                    <AutoComplete data={data} placeholder="Search Here" />
                    <InputGroup.Button tabIndex={-1} aria-label="search_btn">
                        <SearchIcon />
                    </InputGroup.Button>
                </InputGroup>
            </div>

            {/* Tools */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className={`${checked ? 'hidden' : ''}`}>
                        <Sun strokeWidth={1.6} size={22} color="rgb(30 41 59)" />
                    </div>

                    <div className={`${checked ? '' : 'hidden'}`}>
                        <NightlightIcon fontSize="small" className="text-textCustom" />
                    </div>

                    <Toggle
                        size="md"
                        checked={checked}
                        onChange={setChecked}
                        onClick={() => {
                            localStorage.setItem('theme', `${!checked}`);
                            toggleTheme();
                        }}
                    />
                </div>

                {/* Message */}
                <Link to={`/messages/${targetChatId}`} aria-label="Messages">
                    <Badge count={notificationCount} size="small" offset={[1, 3]} color="#f44336l">
                        <MessageCircleMore strokeWidth={1.6} size={22} className="cursor-pointer text-textCustom" />
                    </Badge>
                </Link>

                {/* Notification */}
                <TippyNotify />

                {/* Profile */}
                <TippyProfile />
            </div>
        </div>
    );
};

export default React.memo(Navbar);
