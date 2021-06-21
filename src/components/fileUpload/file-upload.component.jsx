import React, {Component} from 'react'
import StorageService from '../../services/storage.service';
import "./file-upload.css"


class FileUpload extends Component {
constructor(props) {
    super(props);
    this.state = {img: null}
    //bind funtions
    this.triggerInputFile = this.triggerInputFile.bind(this)
    this.onImgChange = this.onImgChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
}
triggerInputFile = () => {
    document.getElementById("pfpUploader").click();
}
onImgChange = event => {
    this.setState({
        img: event.target.files[0],
      });
}
onSubmit = () => {
    const formData = new FormData();
    formData.append("img", this.state.img)
    StorageService.storeProfilePic(formData)
}
render() {
    return (
        <div className = ".container-fluid"> 
            <input 
                id = "pfpUploader"
                ref={fileInput => this.fileInput = fileInput} 
                onChange = {this.onImgChange}
                type="file"
            />
            <button onClick={this.triggerInputFile}> Select File </button>
            <button onClick={this.onSubmit}>Submit</button>
        </div>
    );
}

}


export default FileUpload