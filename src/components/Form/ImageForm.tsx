import { useImage } from "../../context/ImageContext";
import Input from "../Input/Input";
import "./ImageForm.css"
export default function () {
  const {handleImageChange} = useImage()
  return (
    <form className="form">
      <Input onChange={handleImageChange} id="file-input" type="file" accept=".png,.jpeg,.jpg,.webp">
        <label htmlFor="file-input" className="custom-file-input">Choose File</label>
      </Input>
    </form>
  )
}
