// Hàm loại bỏ script tag
export const removeScriptTag: (input: string) => string = (input: string) => {
    return input.replace(/<script.*?>(.*?)<\/script>/gi, (_, group) => group);
};

// Hàm regex Email
export const regexEmail: (email: string) => boolean = (email: string) => {
    let emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:COM)$/i;
    return emailRegex.test(email);
};

// Hàm loại bỏ ký tự không phải là chữ và thay thế nhiều khoảng trắng bằng một khoảng trắng
export function removeNonLetters(inputString: string | null | undefined): string {
    // Kiểm tra xem input có phải là một chuỗi hợp lệ không
    if (typeof inputString !== 'string') {
        return ''; // hoặc xử lý theo cách phù hợp khác
    }
    // Sử dụng phương thức replace với biểu thức chính quy để chỉ giữ lại các ký tự chữ và khoảng trắng
    let result = inputString.replace(/[^a-zA-Z\s]/g, '');
    // Thay thế nhiều khoảng trắng liên tiếp bằng một khoảng trắng duy nhất
    result = result.replace(/\s+/g, ' ');
    // Loại bỏ khoảng trắng thừa ở đầu và cuối chuỗi (nếu có)
    result = result.trim();
    return result;
}
