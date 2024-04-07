const SocialContact: React.FC = () => {
    return (
        <>
            <ul className="mb-8 flex flex-col gap-2">
                <li>
                    <span className="font-body text-base font-semibold text-textCustom phone:text-sm pm:text-sm">
                        Fanpage:
                    </span>
                    <a
                        className="ml-2 text-wrap break-words font-body
                                       text-base font-semibold text-orange-600 hover:text-orange-600 phone:text-sm pm:text-sm"
                        href="https://www.facebook.com/f8vnofficial"
                    >
                        https://www.facebook.com/learnlangs24h
                    </a>
                </li>
                <li>
                    <span
                        className="font-body text-base font-semibold text-textCustom phone:text-sm
                                      pm:text-sm"
                    >
                        Group:
                    </span>
                    <a
                        className="ml-2 break-words font-body text-base font-semibold text-orange-600 hover:text-orange-600
                                      phone:text-sm pm:text-sm"
                        href="https://www.facebook.com/f8vnofficial"
                    >
                        https://www.facebook.com/learnlangs24h
                    </a>
                </li>
                <li>
                    <span
                        className="font-body text-base font-semibold text-textCustom phone:text-sm
                                      pm:text-sm"
                    >
                        Youtube:
                    </span>
                    <a
                        className="ml-2 break-words font-body text-base font-semibold text-orange-600 hover:text-orange-600
                                      phone:text-sm pm:text-sm"
                        href="https://www.facebook.com/f8vnofficial"
                    >
                        https://www.facebook.com/learnlangs24h
                    </a>
                </li>
                <li>
                    <span
                        className="font-body text-base font-semibold text-textCustom phone:text-sm
                                      pm:text-sm"
                    >
                        DVHcoding:
                    </span>
                    <a
                        className="ml-2 break-words font-body text-base font-semibold text-orange-600 hover:text-orange-600
                                      phone:text-sm pm:text-sm"
                        href="https://www.facebook.com/f8vnofficial"
                    >
                        https://www.facebook.com/learnlangs24h
                    </a>
                </li>
            </ul>

            <p className="text-center font-body text-sm">Made by DVHcoding ❤️</p>
        </>
    );
};

export default SocialContact;
