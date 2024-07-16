// ##########################
// #      IMPORT NPM        #
// ##########################
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { useState, Fragment } from 'react';
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
    useGetAllUnitLessonsByCourseIdQuery,
} from '@store/api/courseApi';
import { LessonType, QuestionType, UnitLessonStatus, UnitLessonType, UserProcessStatusResponse } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store/store';
import { createNewUserProcessStatus, updateUserProcessStatus } from '@store/reducer/courseReducer';

const FillBlankExerciseCard: React.FC<{
    userProcessStatusData: UserProcessStatusResponse | undefined;
    userProcessRefetch: () => void;
    userId: string;
}> = ({ userId, userProcessStatusData, userProcessRefetch }) => {
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id'); // ?id=.....
    const { id: courseId } = useParams<{ id: string }>();

    /* -------------------------------------------------------------------------- */
    /*                               RTK query data                               */
    /* -------------------------------------------------------------------------- */
    const { data: fillBlankExerciseData, isLoading: fillBlankExerciseLoading } = useGetFillBlankExerciseQuery(id || '');
    const { data: lessons, isLoading: getAllLessonsLoading } = useGetAllLessonsByCourseIdQuery(courseId || '');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(id || '');
    const { data: unitLessons, isLoading: getUnitLessonsByCourseIdLoading } = useGetAllUnitLessonsByCourseIdQuery(courseId || '');

    // ##########################
    // #    STATE MANAGEMENT    #
    // ##########################
    const [answers, setAnswers] = useState([]);
    const [results, setResults] = useState<boolean>(false);

    // ##########################
    // #  FUNCTION MANAGEMENT   #
    // ##########################

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

    let isCompleted: boolean = false;
    if (userProcessStatusData?.success) {
        const currentUnitLesson = userProcessStatusData.unitLessonStatus.find((status: UnitLessonStatus) => status.unitLessonId._id === id);
        if (currentUnitLesson?.status === 'completed') isCompleted = true;
    }

    /* -------------------------------------------------------------------------- */
    /*                # Hàm check đáp án khi nhấn vào nút kiểm tra                */
    /* -------------------------------------------------------------------------- */
    const handleChecking: () => void = async () => {
        setResults(true);

        if (!fillBlankExerciseLoading && fillBlankExerciseData?.fillBlankExercise) {
            const allCorrect = fillBlankExerciseData.fillBlankExercise.questions.every(
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

            if (!isCompleted && allCorrect) {
                // # Lấy vị trí của unitLesson hiện tại (bại đang học hiện tại)
                const currentUnitLessonIndex = unitLessons?.unitLessons.findIndex((unitLesson: UnitLessonType) => {
                    return unitLesson._id === id;
                });

                // id của unitLesson hiện tại
                const currentUnitLessonId = unitLessons?.unitLessons[currentUnitLessonIndex as number]?._id as string;

                // # Lấy id của unitLesson tiếp theo (bài học tiếp theo) dựa vào vị trí của bài học trước + 1
                let nextUnitLessonId = unitLessons?.unitLessons[(currentUnitLessonIndex as number) + 1]?._id;

                try {
                    // # Nếu không phải bài cuối thì mở khóa bài tiếp theo
                    if (nextUnitLessonId) {
                        await dispatch(updateUserProcessStatus({ userId, unitLessonId: id as string }));
                        userProcessRefetch();
                        // kiểm tra xem bài tiếp theo đã completed hay unlock chưa
                        const { data }: any = await axios.get(
                            `/api/v1/unitLessonIdByUserProcess?userId=${userId}&unitLessonId=${nextUnitLessonId}`
                        );

                        if (data.success === false) {
                            await dispatch(createNewUserProcessStatus({ userId, unitLessonId: nextUnitLessonId }));
                            await dispatch(updateUserProcessStatus({ userId, unitLessonId: currentUnitLessonId }));
                            userProcessRefetch();
                        }
                    } else {
                        // # Nếu là bài cuối cùng
                        // # Lấy vị trí của lesson dựa vào unitLesson bài hiện tại . id của lesson
                        const currentLessonIndex = lessons?.lessons.findIndex((lesson: LessonType) => {
                            return lesson._id === unitLesson?.unitLesson.lesson;
                        });

                        // # Lấy ra id của lesson tiếp theo dựa vào vị trí của lesson trước + 1
                        const nextLessonId = lessons?.lessons[(currentLessonIndex as number) + 1]?._id;

                        // # Nếu là lesson cuối cùng thi thông báo đã là bài cuối cùng
                        if (!nextLessonId) {
                            return toastError('Bạn đã học đến bài cuối cùng!');
                        }

                        // # Lấy ra tất cả unitLesson của bài tiếp theo dựa vào id lesson mới
                        const allUnitLessonWithNextLessonId = unitLessons?.unitLessons.filter((unitLesson: UnitLessonType) => {
                            return unitLesson.lesson === nextLessonId;
                        });

                        // # Gán cho nextUnitLessonId là id của unitLesson vị trí thứ 0 với lesson Id mới
                        nextUnitLessonId = allUnitLessonWithNextLessonId?.[0]?._id;
                    }
                } catch (error) {
                    toastError('Có lỗi xảy ra!');
                }
            }
        }
    };

    /* -------------------------------------------------------------------------- */
    /*                     # Hàm chuyển sang bài học tiếp theo                    */
    /* -------------------------------------------------------------------------- */
    const handleNextUnitLesson: () => void = () => {
        if (!getAllLessonsLoading && lessons?.success && !getUnitLessonByIdLoading && unitLesson?.success) {
            if (unitLessons?.success && !getUnitLessonsByCourseIdLoading) {
                // # Lấy vị trí của unitLesson hiện tại (bại đang học hiện tại)
                const currentUnitLessonIndex = unitLessons.unitLessons.findIndex((unitLesson: UnitLessonType) => {
                    return unitLesson._id === id;
                });

                // # Lấy id của unitLesson tiếp theo (bài học tiếp theo) dựa vào vị trí của bài học trước + 1
                let nextUnitLessonId = unitLessons.unitLessons[currentUnitLessonIndex + 1]?._id;

                // # Nếu không phải bài cuối thì điều hướng
                if (nextUnitLessonId) {
                    navigate(`?id=${nextUnitLessonId}`);
                } else {
                    // # Nếu là bài cuối cùng
                    // # Lấy vị trí của lesson dựa vào unitLesson bài hiện tại . id của lesson
                    const currentLessonIndex = lessons.lessons.findIndex((lesson: LessonType) => {
                        return lesson._id === unitLesson.unitLesson.lesson;
                    });

                    // # Lấy ra id của lesson tiếp theo dựa vào vị trí của lesson trước + 1
                    const nextLessonId = lessons.lessons[currentLessonIndex + 1]?._id;

                    // # Nếu là lesson cuối cùng thi thông báo đã là bài cuối cùng
                    if (!nextLessonId) {
                        return toastError('Bạn đã học đến bài cuối cùng!');
                    }

                    // # Lấy ra tất cả unitLesson của bài tiếp theo dựa vào id lesson mới
                    const allUnitLessonWithNextLessonId = unitLessons.unitLessons.filter((unitLesson: UnitLessonType) => {
                        return unitLesson.lesson === nextLessonId;
                    });

                    // # Gán cho nextUnitLessonId là id của unitLesson vị trí thứ 0 với lesson Id mới
                    nextUnitLessonId = allUnitLessonWithNextLessonId[0]._id;
                }
            }
        }
    };

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
                                                  question?.correctAnswer?.[index]?.toLowerCase() ===
                                                      (answers?.[questionIndex] as string)?.[index]?.toLowerCase() ||
                                                  question?.otherAnswer?.[index]?.toLowerCase() ===
                                                      (answers?.[questionIndex] as string)?.[index]?.toLowerCase() ? (
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
                        className={`${isCompleted ? 'btn-success' : 'btn-disabled'} font-body font-medium`}
                        disabled={!isCompleted}
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
