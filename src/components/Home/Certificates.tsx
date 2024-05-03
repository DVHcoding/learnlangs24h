// ##################################
// #       IMPORT Components
// ##################################
import Ielts from '@assets/backgrounds/Certificate-1.jpg';
import Toeic from '@assets/backgrounds/Certificate-3.jpg';

// ##################################
// #       IMPORT Npm
// ##################################
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Certificates = () => {
    return (
        <div>
            {/* top */}
            <div className="mb-4 flex items-center justify-between">
                <h1 className="font-title text-xl font-bold text-textCustom md:text-lg phone:text-base">Certificates</h1>

                <div className="flex items-center gap-1">
                    <p
                        className="cursor-pointer select-none font-body text-sm 
                        font-medium text-textCustom transition-all duration-200 
                        hover:text-textCustomProcess"
                    >
                        See All
                    </p>
                    <ArrowRight strokeWidth={2} size={18} className="text-textCustom phone:w-[15px]" />
                </div>
            </div>

            {/* bottom */}
            <div
                className="flex items-center justify-between gap-4 sm:flex-nowrap md:flex-wrap 
                lg:flex-nowrap phone:flex-wrap "
            >
                <Link to="/ielts">
                    <img
                        src={Ielts}
                        alt="Ielts"
                        className="mx-auto rounded-lg object-cover sm:w-full lg:w-full phone:w-full pm:aspect-square"
                    />
                </Link>

                <Link to="/toeic">
                    <img
                        src={Toeic}
                        alt="Toeic"
                        className="mx-auto min-w-full rounded-lg object-cover sm:w-full md:w-[80%] lg:w-full phone:w-full pm:aspect-square"
                    />
                </Link>
            </div>
        </div>
    );
};

export default Certificates;
