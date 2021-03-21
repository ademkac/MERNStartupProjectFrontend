import React, {useRef, useState, useEffect} from 'react';
import Button from './Button';
import './ImageUpload.css';

const ImageUpload = props => {
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);


    const filePickerRef = useRef();

    useEffect(()=>{
        if(!file){
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        }
        fileReader.readAsDataURL(file)
    }, [file])

    const pickedHandler = event =>{
        let pickedFIle;
        let fileIsValid = isValid
        if(event.target.files && event.target.files.length === 1){
             pickedFIle = event.target.files[0];
            setFile(pickedFIle);
            setIsValid(true);
            fileIsValid = true;
        }else{
            setIsValid(false);
            fileIsValid = false;
        }

      props.onInput(props.id, pickedFIle, fileIsValid)
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    }

    return(
        <div className="form-control">
            <input
              id={props.id}
              ref={filePickerRef}
              style={{display: 'none'}} 
              type="file" 
              accept=".jpg,.png,.jpeg"
              onChange={pickedHandler}
              />
              <div className={`image-upload ${props.center && 'center'}`}>
                  <div className="image-upload__preview">
                        {previewUrl && <img src={previewUrl} alt="Preview" />}
                        {!previewUrl && <p>Please select an image</p>}
                  </div>
                  <Button type="button" onClick={pickImageHandler} >Select an image</Button>
              </div>
             {!isValid && <p>{props.errorText}</p>}
        </div>
    )
}

export default ImageUpload