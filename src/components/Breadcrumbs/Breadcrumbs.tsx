import { Breadcrumbs as Bread, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathSnippets = location.pathname.split('/').filter((i) => i);

    const breadcrumbItems = pathSnippets.map((_, index) => {
        const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
        const isLast = index === pathSnippets.length - 1;

        return isLast ? (
            <Typography
                className="font-body text-base font-semibold text-textCustom phone:text-sm"
                color="textPrimary"
                key={url}
            >
                {_.charAt(0).toUpperCase() + _.slice(1)}
            </Typography>
        ) : (
            <Link
                className="font-body text-base font-semibold text-textCustom"
                color="inherit"
                to={url}
                key={url}
            >
                {_.charAt(0).toUpperCase() + _.slice(1)}
            </Link>
        );
    });

    return (
        <Bread aria-label="breadcrumb">
            <Link
                color="inherit"
                to="/"
                className="cursor-pointer text-textCustom phone:text-sm"
                style={{ textDecoration: 'none' }}
            >
                Home
            </Link>
            {breadcrumbItems}
        </Bread>
    );
};

export default Breadcrumbs;
