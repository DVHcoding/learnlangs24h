// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { GrammarExerciseTypes } from '@types/types';
import { RootState } from '@store/store';
import { changeExerciseType } from '@store/reducer/adminUnitLessonReducer';
import FillBlankExercise from '@admin/components/Courses/Grammar/GrammarExercise/FillBlank/FillBlankExercise';

const GrammarExercise: React.FC = () => {
    const dispatch = useDispatch();
    const { exerciseType } = useSelector((state: RootState) => state.adminUnitLesson);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeExerciseType(e.target.value));
    };

    return (
        <Fragment>
            <div>
                <span className="font-body font-bold text-textCustom">Loại Grammar Exercise (*)</span>
                <select
                    name="lectureType"
                    required
                    id="small"
                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-bgCustom 
                    p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    value={exerciseType}
                    onChange={handleChange}
                >
                    <option className="hidden" value="">
                        --- Chọn loại grammar exercise ---
                    </option>
                    <option value={GrammarExerciseTypes.FillBlankExercise}>Fill Blank</option>
                    <option value={GrammarExerciseTypes.MultipleChoice}>Multiple Choice</option>
                </select>
            </div>

            {(() => {
                switch (exerciseType) {
                    case GrammarExerciseTypes.FillBlankExercise:
                        return <FillBlankExercise />;

                    default:
                        return null;
                }
            })()}
        </Fragment>
    );
};

export default GrammarExercise;
