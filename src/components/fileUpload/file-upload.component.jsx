import React, {Component} from 'react'
import StorageService from '../../services/storage.service';
import DataService from '../../services/data.service';
import "./file-upload.css"

const ds = new DataService()

class FileUpload extends Component {
constructor(props) {
    super(props);
    this.state = {img: null}
    //bind funtions
    this.triggerInputFile = this.triggerInputFile.bind(this)
    this.onImgChange = this.onImgChange.bind(this)
}
triggerInputFile = () => {
    document.getElementById("pfpUploader").click();
}
onImgChange = event => {
    ds.changeFile(event.target.files[0])
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
            
        </div>
    );
}
}


export default FileUpload