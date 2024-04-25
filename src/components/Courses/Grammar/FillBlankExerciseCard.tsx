// ##########################
// #      IMPORT NPM        #
// ##########################
import { useSearchParams } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################
import { useGetFillBlankExerciseQuery } from '@store/api/courseApi';
import { QuestionType } from 'types/api-types';
import { Fragment } from 'react/jsx-runtime';

const FillBlankExerciseCard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');

    const { data: fillBlankExerciseData, isLoading: fillBlankExerciseLoading } =
        useGetFillBlankExerciseQuery(id || '');

    return (
        <div>
            <h2 className="font-title text-xl font-bold text-textCustom">Thực hành thì Hiện đơn</h2>
            <p className="text-base text-textCustom">Cap nhat Thang 3 nam 2024</p>

            <p className="font-body text-base font-semibold text-red-400 phone:text-sm pm:text-sm">
                Hãy sử dụng lại kiến thức đã học ở bài trước để giải các câu dưới đây nhé!
            </p>

            {!fillBlankExerciseLoading && fillBlankExerciseData?.fillBlankExercise
                ? fillBlankExerciseData.fillBlankExercise.questions.map(
                      (question: QuestionType) => (
                          <div
                              className="mb-2 flex flex-wrap justify-start gap-2"
                              key={question._id}
                          >
                              {question.sentence
                                  .split('______')
                                  .map((part: string, index: number) => (
                                      <div key={index} className="flex items-center gap-2">
                                          <p className="min-w-12 font-body text-base font-medium text-textCustom">
                                              {part}
                                          </p>

                                          {index !==
                                              question.sentence.split('______').length - 1 && (
                                              <Fragment>
                                                  <input
                                                      className={`w-32 rounded border border-slate-400 bg-bgCustom pl-1 font-body font-bold text-textCustom focus:border-blue-400`}
                                                      type="text"
                                                  />
                                              </Fragment>
                                          )}
                                      </div>
                                  ))}
                          </div>
                      )
                  )
                : ''}
        </div>
    );
};

export default FillBlankExerciseCard;
