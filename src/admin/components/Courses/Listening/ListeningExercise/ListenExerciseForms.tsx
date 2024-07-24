// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
//@ts-ignore
import { ListenExerciseTypes } from '@types/types';
import { RootState } from '@store/store';
import { changeExerciseType } from '@store/reducer/adminUnitLessonReducer';
import ConversationForms from './Conversation/ConversationForms';

const ListenExerciseForms: React.FC = () => {
    const dispatch = useDispatch();
    const { exerciseType } = useSelector((state: RootState) => state.adminUnitLesson);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(changeExerciseType(e.target.value));
    };

    return (
        <Fragment>
            <div>
                <span className="font-body font-bold text-textCustom">Loại Listen Exercise (*)</span>
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
                        --- Chọn loại listen exercise ---
                    </option>
                    <option value={ListenExerciseTypes.Conversation}>Conversation</option>
                    <option value={ListenExerciseTypes.PicturesTest}>Pictures Test</option>
                    <option value={ListenExerciseTypes.MatchingTest}>Matching Test</option>
                    <option value={ListenExerciseTypes.GapFill}>Gap Fill</option>
                </select>
            </div>

            {(() => {
                switch (exerciseType) {
                    case ListenExerciseTypes.Conversation:
                        return (
                            <div className="rounded-md bg-bgCustomCard p-4">
                                <ConversationForms />
                            </div>
                        );

                    default:
                        return null;
                }
            })()}
        </Fragment>
    );
};

export default ListenExerciseForms;
