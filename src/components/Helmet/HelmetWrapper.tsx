import { Helmet } from 'react-helmet-async';

interface HelmetWrapperProps {
    title: string;
    description: string;
    canonical: string;
}

const HelmetWrapper: React.FC<HelmetWrapperProps> = ({ title, description, canonical }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonical} />
        </Helmet>
    );
};

export default HelmetWrapper;
