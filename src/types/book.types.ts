export interface IGetBooksResponse {
    success: boolean;
    books: Book[];
    pagination: Pagination;
}

export interface IGetBooksPayload {
    page: number;
    limit: number;
    bookCategory: string;
}

export interface Book {
    photo: IPhoto;
    pdf: IPhoto;
    _id: string;
    name: string;
    premium: boolean;
    previews: Preview[];
    bookCategory: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IPhoto {
    public_id: string;
    url: string;
}

export interface Preview {
    paper: IPhoto;
    _id: string;
}

export interface Pagination {
    totalBooks: number;
    totalPages: number;
    currentPage: number;
    limit: number;
}
