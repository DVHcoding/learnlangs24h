// ##########################
// #      IMPORT NPM        #
// ##########################
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { Empty } from 'antd';
import dayjs from 'dayjs';

// ##########################
// #    IMPORT Components   #
// ##########################
import {
    useGetAllLessonsByCourseIdQuery,
    useGetFillBlankExerciseQuery,
    useGetUnitLessonByIdQuery,
    useGetAllUnitLessonsByLessonIdQuery,
} from '@store/api/courseApi';
import { LessonType, QuestionType, UnitLessonType } from 'types/api-types';

const FillBlankExerciseCard: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // ?id=.....
    const { id: courseId } = useParams();
    const { data: fillBlankExerciseData, isLoading: fillBlankExerciseLoading } = useGetFillBlankExerciseQuery(id || '');
    const { data: lessons, isLoading: getAllLessonsLoading } = useGetAllLessonsByCourseIdQuery(courseId || '');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(id || '');

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const [answers, setAnswers] = useState([]);
    const [results, setResults] = useState<boolean>(false);
    const [allCorrect, setAllCorrect] = useState<boolean>(false);

    const [lessonId, setLessonId] = useState<string>('');
    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################

    const { data: unitLessons } = useGetAllUnitLessonsByLessonIdQuery(lessonId || '');

    // # Hàm lấy các giá trị người dùng nhập vào và kiểm tra xem đúng không
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

    // # Hàm check đáp án khi nhấn vào nút kiểm tra
    const handleChecking: () => void = () => {
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

    // # Hàm chuyển sang bài học tiếp theo
    const handleNextUnitLesson: () => void = () => {
        if (!getAllLessonsLoading && lessons?.success && !getUnitLessonByIdLoading && unitLesson?.success) {
            if (unitLessons?.success) {
                const getUnitLessonIndex = unitLessons.unitLessons.findIndex((unitLesson: UnitLessonType) => {
                    return unitLesson._id === id;
                });

                const nextUnitLessonId = unitLessons.unitLessons[getUnitLessonIndex + 1]?._id;

                if (nextUnitLessonId) {
                    navigate(`?id=${nextUnitLessonId}`);
                }

                // const getLessonIndex = lessons.lessons.findIndex((lesson: LessonType) => {
                //     return lesson._id === lessonId;
                // });
                // const nextLessonId = lessons.lessons[getLessonIndex + 1]._id;
                // setLessonId(nextLessonId);
            }
        }
    };

    useEffect(() => {
        if (!getAllLessonsLoading && lessons?.success && !getUnitLessonByIdLoading && unitLesson?.success) {
            const lessonId = unitLesson.unitLesson.lesson;
            setLessonId(lessonId);
        }
    }, []);

    return (
        <div>
            {unitLesson?.success && (
                <Fragment>
                    <h2 className="font-title text-xl font-bold text-textCustom">{unitLesson.unitLesson.title}</h2>
                    <p className="text-base text-textCustom">Cập nhật ngày {dayjs(unitLesson.unitLesson.createAt).format('DD/MM/YYYY')}</p>
                </Fragment>
            )}

            <p className="font-body text-base font-semibold text-red-400 phone:text-sm pm:text-sm">
                Hãy sử dụng lại kiến thức đã học ở bài trước để giải các câu dưới đây nhé!
            </p>

            <div className="mt-3">
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
            </div>

            {!fillBlankExerciseLoading && fillBlankExerciseData?.success ? (
                <div className="mt-4 flex items-center justify-center gap-2">
                    <button onClick={handleChecking} className="btn-primary font-body font-medium">
                        Kiểm tra
                    </button>

                    <button
                        className={`${allCorrect ? 'btn-success' : 'btn-disabled'} font-body font-medium`}
                        onClick={handleNextUnitLesson}
                    >
                        Bài tiếp theo
                    </button>
                </div>
            ) : (
                <Empty className="mt-4" />
            )}
        </div>
    );
};

export default FillBlankExerciseCard;
