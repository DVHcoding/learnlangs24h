// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import styles from './levelDisplay.module.css';
import level3 from '@assets/rank/text/3.gif';
import level4 from '@assets/rank/text/4.gif';
import level5 from '@assets/rank/text/5.gif';
import level6 from '@assets/rank/text/6.gif';
import level7 from '@assets/rank/text/7.gif';
import level8 from '@assets/rank/text/8.gif';
import level9 from '@assets/rank/text/9.gif';

interface LevelDisplayProps {
    level: number;
    customStyles?: string;
    children: React.ReactNode;
}

const LevelDisplay: React.FC<LevelDisplayProps> = ({ level, customStyles, children }) => {
    const getLevelImage = (level: number): string | null => {
        switch (level) {
            case 3:
                return level3;
            case 4:
                return level4;
            case 5:
                return level5;
            case 6:
                return level6;
            case 7:
                return level7;
            case 8:
                return level8;
            case 9:
                return level9;
            default:
                return null;
        }
    };

    const backgroundImage = getLevelImage(level);

    const className = `${customStyles} ${backgroundImage ? styles.levelText : ''}`;

    const style = backgroundImage
        ? {
              backgroundImage: `url('${backgroundImage}')`,
              color: 'transparent',
          }
        : {};

    return (
        <span className={className} style={style}>
            {children}
        </span>
    );
};

export default LevelDisplay;
