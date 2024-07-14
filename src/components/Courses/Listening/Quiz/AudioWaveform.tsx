// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { FaPlay } from 'react-icons/fa6';
import { TbPlayerStopFilled } from 'react-icons/tb';
import TippyProvider from '@components/Tippys/TippyProvider';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

interface AudioType {
    _id: string;
    public_id: string;
    url: string;
    answer: string;
    otherAnswer: string;
}

interface AudioProps {
    audio: AudioType;
    answers: {
        [key: string]: {
            value: string;
            border: string;
        };
    };

    setAnswers: React.Dispatch<
        React.SetStateAction<{
            [key: string]: {
                value: string;
                border: string;
            };
        }>
    >;
}

const AudioWaveform: React.FC<AudioProps> = ({ audio, answers, setAnswers }) => {
    /* ########################################################################## */
    /*                                   HOOKS                                    */
    /* ########################################################################## */
    const waveformRef = useRef<HTMLDivElement | null>(null);
    const wavesurfer = useRef<WaveSurfer | null>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [audioSpeed, setAudioSpeed] = useState<number>(1);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const hide = () => setVisible(false);
    const handlePlayPause = () => {
        if (wavesurfer.current) {
            if (wavesurfer.current.isPlaying()) {
                wavesurfer.current.pause();
            } else {
                wavesurfer.current.play();
            }
        }
    };
    const handleSelectAudioSpeed = (speed: number) => {
        setAudioSpeed(speed);
        setVisible(false);
    };

    const handleChangeAnswer = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswers((preState) => ({ ...preState, [audio._id]: { value: e.target.value, border: '' } }));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (waveformRef.current) {
            wavesurfer.current = WaveSurfer.create({
                container: waveformRef.current,
                barWidth: 1,
                barRadius: 2,
                barGap: 2,
                cursorWidth: 1,
                height: 40,
                progressColor: '#FE6E00',
                waveColor: '#C4C4C4',
                cursorColor: 'transparent',
                minPxPerSec: 100,
            });

            wavesurfer.current.load(audio.url);

            wavesurfer.current.on('play', () => {
                setIsPlaying(true);
            });

            wavesurfer.current.on('pause', () => {
                setIsPlaying(false);
            });

            wavesurfer.current.on('finish', () => {
                wavesurfer.current?.seekTo(0);
                wavesurfer.current?.pause();
                setIsPlaying(false);
            });
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (wavesurfer.current) {
            wavesurfer.current.pause();
            // Đối số thứ 2 là Preserve pitch (true là giữ nguyên bản giọng nói)
            wavesurfer.current.setPlaybackRate(audioSpeed, true);
            wavesurfer.current.seekTo(0);
        }
    }, [audioSpeed]);

    return (
        <Fragment>
            <div className="mx-auto max-w-max p-2">
                {/* Audio */}
                <div className="flex max-w-max items-center gap-4">
                    <div>
                        <div className="cursor-pointer rounded-md border border-[#6c757d] p-3" onClick={handlePlayPause}>
                            {isPlaying ? (
                                <TbPlayerStopFilled size={10} className="text-textCustom" />
                            ) : (
                                <FaPlay size={10} className="text-textCustom" />
                            )}
                        </div>
                    </div>

                    <div className="h-max-content flex w-[30rem] flex-col justify-center">
                        <div ref={waveformRef} />
                    </div>

                    <TippyProvider
                        visible={visible}
                        placement="bottom"
                        onClickOutside={hide}
                        content={
                            <div className="rounded-md bg-white p-4 shadow-md">
                                <h3 className="select-none">Audio Speed</h3>

                                <ul className="flex flex-col gap-2">
                                    {[0.25, 0.5, 0.75, 1, 1.25, 1.75, 2].map((speed: number) => (
                                        <li
                                            key={speed}
                                            className="cursor-pointer select-none text-base hover:font-bold"
                                            onClick={() => handleSelectAudioSpeed(speed)}
                                        >
                                            {speed}x
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        }
                    >
                        <button className="rounded-md bg-gray-200 px-4 py-2" onClick={() => setVisible(!visible)}>
                            {audioSpeed}x
                        </button>
                    </TippyProvider>
                </div>

                {/* Form */}
                <form className="mt-2">
                    <textarea
                        className={`w-full resize-none rounded-md bg-bgCustomCardItem p-2 text-justify 
                        text-base text-textCustom shadow outline-none placeholder:select-none ${answers[audio._id]?.border}`}
                        value={answers[audio._id]?.value}
                        onChange={handleChangeAnswer}
                        placeholder="Nhập những gì bạn nghe thấy..."
                        ref={textAreaRef}
                        spellCheck={false}
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default AudioWaveform;
