// ##########################
// #      IMPORT NPM        #
// ##########################
import { useSearchParams } from 'react-router-dom';
import { useState, Fragment } from 'react';
import { X, Check } from 'lucide-react';
import { Empty } from 'antd';

// ##########################
// #    IMPORT Components   #
// ##########################
import { useGetFillBlankExerciseQuery } from '@store/api/courseApi';
import { QuestionType } from 'types/api-types';

const FillBlankExerciseCard: React.FC = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const { data: fillBlankExerciseData, isLoading: fillBlankExerciseLoading } = useGetFillBlankExerciseQuery(id || '');

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const [answers, setAnswers] = useState([]);
    const [results, setResults] = useState<boolean>(false);
    const [allCorrect, setAllCorrect] = useState<boolean>(false);

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################

    const handleSetFillBlankAnswers: (e: React.ChangeEvent<HTMLInputElement>, index: number, questionIndex: number) => void = (
        e,
        index,
        questionIndex
    ) => {
        const inputValue = e.target.value.trim(); // Loại bỏ khoảng trắng

        if (inputValue !== '') {
            const newAnswers = [...answers]; // Copy lại giá trị của answers []
            newAnswers[questionIndex] = newAnswers[questionIndex] || [''];
            (newAnswers[questionIndex] as string[])[index] = inputValue;
            setAnswers(newAnswers);
        }

        setResults(false);
    };

    const handleChecking = () => {
        setResults(true);

        if (!fillBlankExerciseLoading && fillBlankExerciseData?.fillBlankExercise) {
            const isCorrect = fillBlankExerciseData.fillBlankExercise.questions.every(
                // Lấy data từ api lọc qua từng question
                (question: QuestionType, questionIndex: number) => {
                    // Nhận được từng object là question
                    // Kiểm tra xem question.correctAnswer có phải array hay không
                    const correctAnswerArray: string[] = Array.isArray(question.correctAnswer) ? question.correctAnswer : [];
                    const correctOtherAnswer: string[] = Array.isArray(question.otherAnswer) ? question.otherAnswer : [];
                    // Trả về boolean (lặp qua từng phần tử trong mảng correctAnswer
                    // của đúng questionIndex và đúng các input theo từng phần)
                    return (
                        correctAnswerArray.every(
                            (correctAnswerValue: string, index: number) =>
                                correctAnswerValue.toLowerCase() === (answers[questionIndex] as string)?.[index].toLowerCase()
                        ) ||
                        correctOtherAnswer.every(
                            (correctOtherAnswerValue: string, index: number) =>
                                correctOtherAnswerValue.toLowerCase() === (answers[questionIndex] as string)?.[index].toLowerCase()
                        )
                    );
                }
            );

            setAllCorrect(isCorrect);
        }
    };

    return (
        <div>
            <h2 className="font-title text-xl font-bold text-textCustom">Thực hành thì Hiện đơn</h2>
            <p className="text-base text-textCustom">Cap nhat Thang 3 nam 2024</p>

            <p className="font-body text-base font-semibold text-red-400 phone:text-sm pm:text-sm">
                Hãy sử dụng lại kiến thức đã học ở bài trước để giải các câu dưới đây nhé!
            </p>

            {!fillBlankExerciseLoading && fillBlankExerciseData?.fillBlankExercise
                ? fillBlankExerciseData.fillBlankExercise.questions.map((question: QuestionType, questionIndex: number) => (
                      <div className="mb-2 flex flex-wrap justify-start gap-2" key={question._id}>
                          {question.sentence.split('______').map((part: string, index: number) => (
                              <div key={index} className="flex items-center gap-2">
                                  <p className="min-w-12 font-body text-base font-medium text-textCustom">{part}</p>

                                  {index !== question.sentence.split('______').length - 1 && (
                                      <Fragment>
                                          <input
                                              className={`w-32 rounded border border-slate-400 bg-bgCustom pl-1 font-body font-bold text-textCustom focus:border-blue-400`}
                                              type="text"
                                              onChange={(e) => handleSetFillBlankAnswers(e, index, questionIndex)}
                                          />
                                          {results ? (
                                              question?.correctAnswer[index].toLowerCase() ===
                                                  (answers[questionIndex] as string)?.[index].toLowerCase() ||
                                              question?.otherAnswer[index].toLowerCase() ===
                                                  (answers[questionIndex] as string)?.[index].toLowerCase() ? (
                                                  <Check className="text-green-500" size={18} />
                                              ) : (
                                                  <X className="text-red-500" size={18} />
                                              )
                                          ) : (
                                              ''
                                          )}
                                      </Fragment>
                                  )}
                              </div>
                          ))}
                      </div>
                  ))
                : ''}

            {!fillBlankExerciseLoading && fillBlankExerciseData?.success ? (
                <div className="mt-4 flex items-center justify-center gap-2">
                    <button onClick={handleChecking} className="btn-primary font-body font-medium">
                        Kiểm tra
                    </button>

                    <button className={`${allCorrect ? 'btn-success' : 'btn-disabled'} font-body font-medium`}>Bài tiếp theo</button>
                </div>
            ) : (
                <Empty className="mt-4" />
            )}
        </div>
    );
};

export default FillBlankExerciseCard;
