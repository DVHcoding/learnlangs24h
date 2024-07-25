// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import styles from './DotLoader.module.css';

const DotLoader: React.FC = () => {
    return (
        <div className={styles.container}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
        </div>
    );
};

export default DotLoader;
