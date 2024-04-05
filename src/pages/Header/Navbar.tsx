import React, { useState } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import TippyNotify from '@components/Tippys/TippyNotify';
import TippyProfile from '@components/Tippys/TippyProfile';

// ##################################
// #       IMPORT Npm
// ##################################

import { AutoComplete, InputGroup, Toggle } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { MessageCircleMore, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
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

    return (
        <div
            className="scrollbar flex items-center justify-between overflow-auto px-4 
            py-3 sm:justify-around sm:border sm:border-bdCustom"
        >
            {/* Logo */}
            <h1 className="font-body text-lg font-bold text-textCustom sm:hidden">LearnLangs24h</h1>

            {/* Search */}
            <div className="sm:hidden">
                <InputGroup inside>
                    <AutoComplete data={data} placeholder="Search Here" />
                    <InputGroup.Button tabIndex={-1}>
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
                <Link to="/message">
                    <MessageCircleMore
                        strokeWidth={1.6}
                        size={22}
                        className="cursor-pointer text-textCustom"
                    />
                </Link>

                {/* Notification */}
                <TippyNotify />

                {/* Profile */}
                <TippyProfile />
            </div>
        </div>
    );
};

export default Navbar;
