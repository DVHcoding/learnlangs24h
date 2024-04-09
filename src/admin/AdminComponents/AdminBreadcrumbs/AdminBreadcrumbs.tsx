import { Breadcrumb } from 'rsuite';

const AdminBreadcrumbs: React.FC<{ pathNext: string; pathEnd: string }> = ({
    pathNext,
    pathEnd,
}) => {
    return (
        <Breadcrumb className=" text-base font-semibold">
            <Breadcrumb.Item href="/admin">Home</Breadcrumb.Item>
            <Breadcrumb.Item>{pathNext}</Breadcrumb.Item>
            <Breadcrumb.Item active>{pathEnd}</Breadcrumb.Item>
        </Breadcrumb>
    );
};

export default AdminBreadcrumbs;
