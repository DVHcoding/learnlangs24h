// Hàm loại bỏ script tag
export const removeScriptTag: (input: string) => string = (input: string) => {
    return input.replace(/<script.*?>(.*?)<\/script>/gi, (_, group) => group);
};

// Hàm regex Email
export const regexEmail: (email: string) => boolean = (email: string) => {
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:COM)$/i;
    return emailRegex.test(email);
};
