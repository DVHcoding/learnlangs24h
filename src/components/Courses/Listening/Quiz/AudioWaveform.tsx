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

const AudioWaveform: React.FC = () => {
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
    const [answer, setAnswer] = useState<string>('');
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
    const handlePlayPause = () => {
        if (wavesurfer.current) {
            if (wavesurfer.current.isPlaying()) {
                wavesurfer.current.pause();
            } else {
                wavesurfer.current.play();
            }
        }
    };
    const hide = () => setVisible(false);
    const handleSelectAudioSpeed = (speed: number) => {
        setAudioSpeed(speed);
        setVisible(false);
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
                barWidth: 2,
                barRadius: 3,
                barGap: 2,
                cursorWidth: 1,
                height: 40,
                progressColor: '#FE6E00',
                waveColor: '#C4C4C4',
                cursorColor: 'transparent',
            });

            wavesurfer.current.load(
                'http://res.cloudinary.com/dvwdfsdkp/video/upload/v1720341352/messenger_attachments/pjrhmg2jd9b1rshtl5ae.mp3'
            );

            wavesurfer.current.on('play', () => {
                setIsPlaying(true);
            });

            wavesurfer.current.on('pause', () => {
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
            <div className="p-2">
                {/* Audio */}
                <div className="flex items-center gap-4">
                    <div className="cursor-pointer rounded-md border border-[#6c757d] p-3" onClick={handlePlayPause}>
                        {isPlaying ? (
                            <TbPlayerStopFilled size={10} className="text-textCustom" />
                        ) : (
                            <FaPlay size={10} className="text-textCustom" />
                        )}
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
                <form className="mt-2 w-[36.5rem]">
                    <textarea
                        className="w-full resize-none rounded-md p-2 text-justify text-base shadow 
                        outline-none placeholder:select-none"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Nhập nghĩa tiếng việt..."
                        ref={textAreaRef}
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default AudioWaveform;
