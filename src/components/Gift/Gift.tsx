// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Breadcrumb, Button, Empty } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetAllGiftByUserIdQuery } from '@store/api/gift.api';
import { useUserDetailsQuery } from '@store/api/userApi';

const Gift: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: userDetails } = useUserDetailsQuery();
    const userId = useMemo(() => userDetails?.user?._id, [userDetails?.user]);

    const { data: allGiftData } = useGetAllGiftByUserIdQuery(userId, { skip: !userId });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    console.log(allGiftData);

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="h-full px-4 phone:p-1 ">
            {/* BreadCrumbs */}
            <div className="mb-2 flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: 'Gift',
                        },
                    ]}
                />
            </div>

            {/* Content */}
            {allGiftData?.gifts.length ? (
                <ul className="flex flex-wrap items-center gap-4 pb-4">
                    {allGiftData.gifts.map((gift) => (
                        <li className="max-w-max rounded-md bg-bgCustomGift p-4" key={gift._id}>
                            <div className="flex gap-4">
                                <img src={gift.photo.url} alt={gift.name} className="h-28 w-28" />

                                <div className="space-y-2">
                                    <h4 className="font-be text-base font-medium text-red-500">{gift.name}</h4>
                                    <p className="font-be text-base text-textCustom">
                                        Hạn sử dụng:{' '}
                                        <span className="font-medium text-green-400">
                                            {gift.expiryDate ? dayjs(gift.expiryDate).format('DD/MM/YYYY') : 'Vĩnh viễn'}
                                        </span>
                                    </p>

                                    <div className="space-x-2">
                                        <Button type="primary">Sử dụng</Button>

                                        <Button type="primary" danger>
                                            Xóa
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <Empty description="Không có món quà nào!" />
            )}
        </div>
    );
};

export default Gift;
