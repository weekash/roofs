import React, { createContext, useState, useContext } from 'react';

interface ImageContextType {
    imageData: string;
    setImageData: React.Dispatch<React.SetStateAction<string>>;
    handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    exportedImageData:string;
    setExportedImageData: React.Dispatch<React.SetStateAction<string>>;
}

export const ImageContext = createContext<ImageContextType>({
    imageData: '',
    setImageData: () => { },
    handleImageChange: () => { },
    exportedImageData:'',
    setExportedImageData:()=>{}
});

export const useImage = () => useContext(ImageContext);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [imageData, setImageData] = useState<string>('');
    const [exportedImageData, setExportedImageData] = useState<string>('')
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImageData(imageUrl);
        }
    };

    return (
        <ImageContext.Provider value={{ imageData, setImageData, handleImageChange, exportedImageData, setExportedImageData }}>
            {children}
        </ImageContext.Provider>
    );
};
