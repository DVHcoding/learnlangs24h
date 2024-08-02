// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useMemo } from 'react';
import dayjs from 'dayjs';
import CalendarHeatmap from 'react-calendar-heatmap';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { toastInfo } from '@components/Toast/Toasts';
import { useGetStudyTimeCalendarQuery } from '@store/api/studyTime.api';
import 'react-calendar-heatmap/dist/styles.css';
import { APIResponse } from 'types/api-types';

const Calendar: React.FC<{ dataUserByNickName: APIResponse | undefined }> = ({ dataUserByNickName }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const now = new Date();
    const year = now.getFullYear();

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const userId = useMemo(() => dataUserByNickName?.user?._id, [dataUserByNickName?.user]);

    const { data: studyTimeCalendarData } = useGetStudyTimeCalendarQuery({ userId, year }, { skip: !userId || !year });

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const values = useMemo(() => {
        return (studyTimeCalendarData?.calendar || []).map((item) => {
            // Chuyển đổi ngày tháng thành định dạng 'YYYY-MM-DD'
            const formattedDate = dayjs(item.date).format('YYYY-MM-DD');

            // Chuyển đổi dailyDuration từ milliseconds thành giờ
            const hours = (item.dailyDuration / (1000 * 60 * 60)).toFixed(2); // Sử dụng số thực

            return {
                date: formattedDate,
                count: +hours,
            };
        });
    }, [studyTimeCalendarData]);

    // Tính toán startDate và endDate của năm hiện tại
    const startDate = useMemo(() => {
        return dayjs().startOf('year').toDate(); // Ngày đầu năm hiện tại
    }, []);

    const endDate = useMemo(() => {
        return dayjs().endOf('year').toDate(); // Ngày cuối năm hiện tại
    }, []);

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
        <div className="scrollbar overflow-auto rounded-lg sm:col-span-12 md:col-span-12 xl:col-span-8">
            <CalendarHeatmap
                startDate={startDate}
                endDate={endDate}
                values={values}
                onClick={(value) => {
                    toastInfo(
                        `${
                            value?.count
                                ? `Bạn đã học ${value.count} giờ ngày ${dayjs(value.date).format('DD/MM/YYYY')}`
                                : 'Chưa có dữ liệu'
                        }`
                    );
                }}
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }

                    if (value.count >= 8) {
                        return `color-scale-8`;
                    }

                    if (value.count >= 6) {
                        return 'color-scale-6';
                    }

                    if (value.count >= 4) {
                        return 'color-scale-4';
                    }

                    return `color-scale-2`;
                }}
            />

            <div className="mb-2 mt-1 flex items-center justify-between">
                <h3 className="max-w-max rounded-lg font-segoe leading-tight text-textCustom phone:hidden phone:text-base">
                    Biểu đồ số giờ học theo ngày
                </h3>

                <div className="ml-auto flex items-center gap-2">
                    <p className="text-textCustom">Less</p>
                    <div className="flex items-center gap-1">
                        <div className="h-3 w-3 bg-bgHoverGrayDark"></div>
                        <div className="h-3 w-3 bg-[#0e4429]"></div>
                        <div className="h-3 w-3 bg-[#006d32]"></div>
                        <div className="h-3 w-3 bg-[#26a641]"></div>
                        <div className="h-3 w-3 bg-[#39d353]"></div>
                    </div>
                    <p className="text-textCustom">More</p>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
