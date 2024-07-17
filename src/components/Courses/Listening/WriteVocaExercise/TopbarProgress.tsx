// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment } from 'react';
import { Undo2, Settings } from 'lucide-react';
import { Progress } from 'antd';
import { IoMdVolumeHigh } from 'react-icons/io';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';
import { ProgressProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { TopbarProgressProps } from './WriteVocaExercise.types';
import { CorrectWordType, IncorrectWordType } from './WriteVocaExercise.types';

const TopbarProgress: React.FC<TopbarProgressProps> = (topbarProps) => {
    const navigate = useNavigate();

    const {
        id,
        courseId,
        gameState,
        speaking,
        rating,
        settings,
        textAreaRef,
        vocabularies,
        vocabularyStars,
        activeSpeak,
        cancelAllStars,
        textToSpeech,
        showModal,
        handleKeyDown,
        handleSubmit,
        handleChange,
        handleRatingChange,
        handleSpeakText,
        handleStartAgain,
    } = topbarProps;

    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    return (
        <div className="w-full">
            {/* Navigate & Progress & Setting Icon */}
            <div className="flex items-center justify-between gap-4">
                <div
                    className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                    onClick={() => navigate(`/listening/${courseId}?id=${id}`)}
                >
                    <Undo2 size={20} className="text-textCustom" />
                </div>

                <Progress
                    percent={Math.round(
                        // Nếu đang học chế độ học tất cả thì lấy vocabularies. Nếu đang học chế độ sao thì lấy vocabularyStars
                        // Tính phần trăm hoàn thành bằng cách lấy tổng số từ đúng chia cho tống số lượng từ * 100
                        (gameState.correctWord.length / (settings.learnAll ? vocabularies.length : vocabularyStars.length)) * 100
                    )}
                    strokeColor={twoColors}
                />

                <div
                    className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                    onClick={showModal}
                >
                    <Settings size={20} className="text-textCustom" />
                </div>
            </div>

            {/* Cards */}
            {gameState.wordToShow.map((vocabulary, index) => {
                const isCardActive = index === gameState.activeCard;
                const isWaiting = gameState.isWaiting;

                return (
                    <div key={vocabulary._id} className={`rounded-md p-2 shadow-md ${isCardActive ? '' : 'hidden'}`}>
                        <div className="border-b-2 border-b-bdCustom py-4">
                            <div className="flex items-center justify-between">
                                <h2 className={`font-segoe text-2xl text-textCustom ${settings.hideWord ? 'opacity-0' : ''}`}>
                                    {settings.displayFirstEnglish ? vocabulary?.english : vocabulary.vietnamese}
                                </h2>

                                <div className="flex items-center gap-4">
                                    {settings.textToSpeech && (
                                        // Khi setting bật chức năng textToSpeech thì mới được hiển thị button này
                                        <button onClick={textToSpeech} disabled={speaking}>
                                            <IoMdVolumeHigh
                                                size={20}
                                                className={`cursor-pointer text-textCustom ${speaking ? 'text-yellow-500' : ''}`}
                                            />
                                        </button>
                                    )}

                                    <a
                                        className="min-w-max cursor-pointer text-textCustom"
                                        onClick={() => handleSubmit(vocabulary?._id, vocabulary?.english, vocabulary?.vietnamese, index)}
                                    >
                                        Không biết
                                    </a>
                                </div>
                            </div>
                            {isWaiting ? (
                                <Fragment>
                                    <p className="mt-2 text-base font-semibold text-green-500">Đáp án đúng</p>
                                    <p className="font-segoe text-base text-textCustom">
                                        {settings.displayFirstEnglish ? vocabulary?.vietnamese : vocabulary.english}
                                    </p>
                                </Fragment>
                            ) : null}
                        </div>

                        <form>
                            <textarea
                                className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                        bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                value={gameState.answer}
                                onChange={handleChange}
                                onKeyDown={(e) => handleKeyDown(e, vocabulary._id, vocabulary?.english, vocabulary?.vietnamese, index)}
                                rows={1}
                                ref={index === gameState.activeCard ? textAreaRef : null}
                                spellCheck={false}
                            />
                        </form>

                        {isWaiting ? (
                            <h4 className="font-semibold text-red-500">Nhập lại đáp án đúng!</h4>
                        ) : (
                            <h4 className=" text-gray-500 ">Nhập bằng tiếng việt</h4>
                        )}
                    </div>
                );
            })}

            {/* Completed */}
            {gameState.wordToShow.length <= 0 && (
                <div className="scrollbar-mess overflow-auto rounded-md bg-bgCustomCard py-4" style={{ height: 'calc(100% - 2.3rem)' }}>
                    <div className="mx-auto max-w-max">
                        <Progress
                            type="dashboard"
                            steps={8}
                            percent={Math.round(((vocabularies.length - gameState.inCorrectWord.length) / vocabularies.length) * 100)}
                            trailColor="rgba(0, 0, 0, 0.06)"
                            strokeWidth={15}
                            size={150}
                        />

                        <h2 className="text-center font-segoe text-textCustom">Tỉ lệ chính xác</h2>

                        <button
                            className="mx-auto rounded-sm bg-blue-400 px-8 py-2 
                                    text-base text-white transition-all hover:scale-105"
                            onClick={handleStartAgain}
                        >
                            Bắt đầu lại
                        </button>
                    </div>

                    <button className="btn-success mx-auto mt-4" onClick={cancelAllStars}>
                        Hủy tất cả dấu ⭐
                    </button>

                    <ul className="mt-4 flex flex-col items-center gap-4 px-2">
                        {gameState.inCorrectWord.map((vocabulary) => (
                            <li className="w-1/2" key={vocabulary._id}>
                                <h3 className="font-bold text-red-400">Sai {vocabulary.count} lần!</h3>

                                <div className="w-full rounded-md bg-bgCustomCardItem p-2 shadow-md">
                                    <div className="flex items-center justify-between">
                                        <h3 className={`text-textCustom ${activeSpeak === vocabulary._id ? 'text-yellow-500' : ''}`}>
                                            {vocabulary.english}
                                        </h3>

                                        <div className="flex items-center gap-2">
                                            <button onClick={() => handleSpeakText(vocabulary.english, vocabulary._id)} disabled={speaking}>
                                                <IoMdVolumeHigh
                                                    size={20}
                                                    className={`cursor-pointer text-textCustom ${
                                                        activeSpeak === vocabulary._id ? 'text-yellow-500' : ''
                                                    }`}
                                                />
                                            </button>

                                            <Rating
                                                name={`incorrect-rating-${vocabulary._id}`}
                                                value={rating[vocabulary._id] || 0}
                                                max={1}
                                                onChange={(_, newValue) => handleRatingChange(vocabulary, newValue)}
                                                className="mb-[2px]"
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-textCustom">{vocabulary.vietnamese}</h3>
                                </div>
                            </li>
                        ))}

                        <li className="w-1/2 sm:w-full">
                            <h3 className="font-bold text-green-400">Chưa sai câu nào!</h3>

                            <div className="flex flex-col items-center gap-4">
                                {gameState.correctWord.map((word: CorrectWordType) =>
                                    gameState.inCorrectWord.length === 0 ||
                                    !gameState.inCorrectWord.some((incorrect: IncorrectWordType) => incorrect._id === word._id) ? (
                                        <div key={word._id} className="w-full rounded-md bg-bgCustomCardItem p-2 shadow-md">
                                            <div className="flex items-center justify-between">
                                                <h3 className={`text-textCustom ${activeSpeak === word._id ? 'text-yellow-500' : ''}`}>
                                                    {word.english}
                                                </h3>

                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleSpeakText(word.english, word._id)} disabled={speaking}>
                                                        <IoMdVolumeHigh
                                                            size={20}
                                                            className={`cursor-pointer text-textCustom ${
                                                                activeSpeak === word._id ? 'text-yellow-500' : ''
                                                            }`}
                                                        />
                                                    </button>

                                                    <Rating
                                                        name={`correct-rating-${word._id}`}
                                                        max={1}
                                                        value={rating[word._id] || 0}
                                                        onChange={(_, newValue) => handleRatingChange(word, newValue)}
                                                        className="mb-[2px]"
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="text-textCustom">{word.vietnamese}</h3>
                                        </div>
                                    ) : null
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TopbarProgress;
