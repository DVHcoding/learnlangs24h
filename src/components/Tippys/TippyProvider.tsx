// ##########################
// #      IMPORT NPM        #
// ##########################
import Tippy from '@tippyjs/react/headless';
import { Fragment, ReactElement, ReactNode } from 'react';
import 'tippy.js/dist/tippy.css';

// ##########################
// #    IMPORT Components   #
// ##########################
type Placement =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end'
    | 'right'
    | 'right-start'
    | 'right-end';

const TippyProvider: React.FC<{
    content: ReactNode;
    children: ReactElement;
    visible?: boolean;
    placement?: Placement;
    onClickOutside?: () => void;
}> = ({ content, children, ...props }) => {
    return (
        <Fragment>
            <Tippy
                {...props}
                appendTo={document.body}
                interactive={true}
                render={(attrs) => (
                    <div tabIndex={-1} {...attrs}>
                        {content}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </Fragment>
    );
};

export default TippyProvider;
