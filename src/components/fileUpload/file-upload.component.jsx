import React, {Component} from 'react'
import DataService from '../../services/data.service';
import "./file-upload.css"

const ds = new DataService()

class FileUpload extends Component {
constructor(props) {
    super(props);
    this.state = {img: null}
    //bind funtions
    this.triggerInputFile = this.triggerInputFile.bind(this)
    this.onFileChange = this.onFileChange.bind(this)
}
triggerInputFile = () => {
    document.getElementById("pfpUploader").click();
    console.log(this.props.accept)
}
onFileChange = event => {
    ds.changeFile(event.target.files[0])
}
render() {
    return (
        <div className = ".container-fluid"> 
            <input 
                id = "pfpUploader"
                ref={fileInput => this.fileInput = fileInput} 
                onChange = {this.onFileChange}
                type="file"
                accept={this.props.accept}
            />
            <button onClick={this.triggerInputFile}> Select File </button>
            
        </div>
    );
}
}


export default FileUpload