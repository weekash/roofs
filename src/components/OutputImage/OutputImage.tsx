import { useImage } from '../../context/ImageContext';
import Button from '../Button/Button';

export default function OutputImage() {
    const { exportedImageData } = useImage();

    function download() {
        const link = document.createElement('a');
        link.href = exportedImageData;
        link.download = `${Date.now()}.png`; // Specify the file name here
        link.click();
    }

    if(!exportedImageData){
        return null;
    }
    return (
        <>
            <img src={exportedImageData} />
            <Button styleType='default' onClick={download}>Download</Button>
        </>

    )
}
