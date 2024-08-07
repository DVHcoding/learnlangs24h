// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import HTMLFlipBook from 'react-pageflip';
import WebViewer from '@pdftron/webviewer';
import { useCallback, useEffect, useRef } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

interface FlipBookRef {
    pageFlip: () => {
        flipNext: () => void;
        flipPrev: () => void;
    };
}

const BookDetails: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const bookRef = useRef<FlipBookRef | null>(null);
    const viewerDiv = useRef<HTMLDivElement>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const onFlip = useCallback((e: { data: number }) => {
        console.log('Current page: ' + e.data);
    }, []);

    const handleNextPage = () => {
        bookRef.current?.pageFlip().flipNext();
    };

    const handlePrevPage = () => {
        bookRef.current?.pageFlip().flipPrev();
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        WebViewer(
            {
                path: 'lib',
                initialDoc: 'https://learnlangs24h.s3.ap-southeast-2.amazonaws.com/books/BackEnd-Roadmap.pdf',
            },
            viewerDiv.current as HTMLDivElement
        ).then((instance) => {
            // Vô hiệu hóa nút tải xuống
            instance.UI.disableElements(['downloadButton', 'saveAsButton', 'printButton']);
        });
    }, []);

    return (
        <div>
            <div className="mx-auto flex w-[50%] justify-center border-2">
                <HTMLFlipBook
                    width={300}
                    height={500}
                    size="stretch"
                    minWidth={100}
                    maxWidth={1000}
                    minHeight={400}
                    maxHeight={1533}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={true}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={true}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                    onFlip={onFlip}
                    ref={bookRef}
                    className="demo-book"
                    style={{ margin: 'auto' }} // Thêm thuộc tính style
                    startPage={0} // Thêm thuộc tính startPage
                >
                    {[...Array(12)].map((_, index) => (
                        <div className="demoPage" key={index}>
                            <img
                                src="https://ritikart.com/cdn/shop/files/2_8b02e4a5-63cc-4963-bd0a-1c6aea1696a5_800x.jpg?v=1686556056"
                                alt={`Book page ${index}`}
                                className=""
                            />
                        </div>
                    ))}
                </HTMLFlipBook>
            </div>

            <div className="mt-4 flex justify-center">
                <button onClick={handlePrevPage} className="mr-2 rounded bg-blue-500 px-4 py-2 text-white">
                    Previous
                </button>
                <button onClick={handleNextPage} className="rounded bg-blue-500 px-4 py-2 text-white">
                    Next
                </button>
            </div>

            <div className="h-screen" ref={viewerDiv}></div>
        </div>
    );
};

export default BookDetails;
