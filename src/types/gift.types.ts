export interface GetAllGiftByUserIDResponseTypes {
    success: boolean;
    gifts: Gift[];
}

export interface Gift {
    photo: Photo;
    _id: string;
    name: string;
    expiryType: 'permanent' | 'temporary';
    expiryDate: Date | null;
    owner: string;
    createdAt: Date;
}

export interface Photo {
    public_id: string;
    url: string;
}
