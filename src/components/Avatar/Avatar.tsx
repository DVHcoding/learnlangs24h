// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import styles from './avatar.module.css';

interface AvatarProps {
    image: string;
    frame?: string;
    width: number;
    height: number;
}

const Avatar: React.FC<AvatarProps> = ({ image, frame, width, height }) => {
    return (
        <div className={styles.avatarList}>
            <div
                className={`${styles.avatar} ${styles.avatarLarge} ${width > 2.5 ? styles.avatarXLarge : ''}`}
                style={{ width: `${width}rem`, height: `${height}rem`, maxWidth: `${width}rem`, maxHeight: `${height}rem` }}
            >
                <img src={image} alt="avatar" className={styles.avatarImage} />
                {frame && <img src={frame} alt="Frame" className={styles.avatarFrame} />}
            </div>
        </div>
    );
};

export default Avatar;
