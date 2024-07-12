// Hàm loại bỏ script tag
export const removeScriptTag: (input: string) => string = (input: string) => {
    return input.replace(/<script.*?>(.*?)<\/script>/gi, (_, group) => group);
};

// Hàm regex Email
export const regexEmail: (email: string) => boolean = (email: string) => {
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:COM)$/i;
    return emailRegex.test(email);
};

// Hàm loại bỏ ký tự không phải là chữ
export function removeNonLetters(inputString: string): string {
    // Sử dụng phương thức replace với biểu thức chính quy để chỉ giữ lại các ký tự chữ
    return inputString.replace(/[^a-zA-Z\s]/g, '');
}
