import React, { Fragment, useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

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
                backend: 'WebAudio',
                height: 40,
                progressColor: '#FE6E00',
                waveColor: '#C4C4C4',
                cursorColor: 'transparent',
            });

            wavesurfer.current.load(
                'http://res.cloudinary.com/dvwdfsdkp/video/upload/v1720341352/messenger_attachments/pjrhmg2jd9b1rshtl5ae.mp3'
            );
        }

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy();
            }
        };
    }, []);

    return (
        <Fragment>
            <div className="p-2">
                <div className="flex items-center gap-4">
                    <button className="btn-primary" onClick={handlePlayPause}>
                        Play
                    </button>

                    <div className="h-max-content flex w-[30rem] flex-col justify-center">
                        <div ref={waveformRef} />
                    </div>

                    <button className="btn-disabled">1x</button>
                </div>

                <form className="mt-2 w-[36.5rem]">
                    <textarea
                        className="w-full resize-none rounded-md p-2 text-justify text-base shadow outline-none"
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
