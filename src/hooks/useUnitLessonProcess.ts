// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { toastError } from '@components/Toast/Toasts';
import { useLazyGetUnitLessonIdByUserProcessQuery } from '@store/api/courseApi';
import { createNewUserProcessStatus } from '@store/reducer/courseReducer';
import { AppDispatch } from '@store/store';
import { AllUnitLessonsResponseType } from 'types/api-types';

interface UseUnitLessonProcessProps {
    userId: string | undefined;
    id?: string | null;
    allUnitLessonData?: AllUnitLessonsResponseType | undefined; // Thay thế bằng kiểu dữ liệu thực tế của bạn
    userProcessRefetch: () => void; // Thay thế bằng hàm refetch dữ liệu thực tế của bạn
}

const useUnitLessonProcess = ({ userId, id, allUnitLessonData, userProcessRefetch }: UseUnitLessonProcessProps) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const [unitLessonByUserProcess] = useLazyGetUnitLessonIdByUserProcessQuery();

    useEffect(() => {
        const unitLessonId = id || allUnitLessonData?.unitLessons[0]?._id;
        if (!userId || !unitLessonId) return;

        const userEncode = encodeURIComponent(userId);
        const unitLessonIdEncode = encodeURIComponent(unitLessonId);

        const handleUnitLessonProcess = async () => {
            try {
                const { data } = await unitLessonByUserProcess({ userId: userEncode, unitLessonId: unitLessonIdEncode });

                if (data?.success) {
                    navigate(`?id=${unitLessonId}`);
                } else if (!id) {
                    await dispatch(createNewUserProcessStatus({ userId, unitLessonId }));
                    navigate(`?id=${unitLessonId}`);
                    userProcessRefetch();
                } else {
                    navigate('/notfound');
                }
            } catch (error) {
                toastError('Có lỗi xảy ra!');
            }
        };

        handleUnitLessonProcess();
    }, [navigate, dispatch, id, userId, allUnitLessonData?.unitLessons]);
};

export { useUnitLessonProcess };
