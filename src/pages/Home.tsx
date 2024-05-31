import Canvas from "../components/Canvas/Canvas";
import ImageForm from "../components/Form/ImageForm";
import OutputImage from "../components/OutputImage/OutputImage";
import { ImageProvider } from "../context/ImageContext";

export default function Home() {
    return (
        <section className="home-container">
            <h1>Roof Editor</h1>
            <ImageProvider>
                <ImageForm />
                <Canvas />
                <OutputImage />
            </ImageProvider>
        </section>
    )
}
