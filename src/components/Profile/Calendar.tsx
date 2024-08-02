// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const Calendar: React.FC = () => {
    const values = [
        { date: '2024-05-08', count: 0 },
        { date: '2024-05-09', count: 2 },
        { date: '2024-05-10', count: 4 },
        { date: '2024-05-11', count: 6 },
        { date: '2024-05-12', count: 8 },
        { date: '2024-06-01', count: 5 },
        { date: '2024-06-02', count: 3 },
        { date: '2024-06-03', count: 1 },
        { date: '2024-06-04', count: 0 },
        { date: '2024-06-05', count: 2 },
        { date: '2024-06-06', count: 4 },
        { date: '2024-06-07', count: 6 },
        { date: '2024-06-08', count: 7 },
        { date: '2024-06-09', count: 3 },
        { date: '2024-06-10', count: 2 },
        { date: '2024-06-11', count: 1 },
        { date: '2024-06-12', count: 4 },
        { date: '2024-06-13', count: 5 },
        { date: '2024-06-14', count: 6 },
        { date: '2024-06-15', count: 7 },
        { date: '2024-06-16', count: 8 },
        { date: '2024-06-17', count: 0 },
        { date: '2024-06-18', count: 1 },
        { date: '2024-06-19', count: 2 },
        { date: '2024-06-20', count: 3 },
        { date: '2024-06-21', count: 4 },
        { date: '2024-06-22', count: 5 },
        { date: '2024-06-23', count: 6 },
        { date: '2024-06-24', count: 7 },
        { date: '2024-06-25', count: 8 },
    ];

    return (
        <div
            className="scrollbar overflow-auto rounded-lg sm:col-span-12 
                            md:col-span-12 xl:col-span-8"
        >
            <CalendarHeatmap
                startDate={new Date('2024-01-01')}
                endDate={new Date('2024-12-31')}
                values={values}
                onClick={(value) => {
                    alert(`Bạn đã học ${value?.count ?? '0'} giờ ngày ${value?.date ?? '....'}`);
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

                    if (value.count >= 2) {
                        return 'color-scale-2';
                    }

                    return `color-scale-${value.count}`;
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
