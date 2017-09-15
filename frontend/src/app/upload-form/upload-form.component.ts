import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    url: String;
    blob: Blob;
    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.
    // settings go here

    upload(files: FileList) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }

        this.http.post('/upload', formData).subscribe(data => {
//            let reader = new FileReader();
//            reader.onload = () => {
//                this.url = reader.result;
//                this.url.replace('unsafe:', '');
//            };
//            reader.readAsDataURL(new Blob([data['yourFreakingFile']]));
            //let bufferData = data['yourFreakingFile']['data'];
            //this.blob = new Blob([bufferData], {type: 'image/png'}); // {type: 'image/png'}

            let binary = '';
            let bytes = new Uint8Array( data['yourFreakingFile']['data'] );
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
              binary += String.fromCharCode( bytes[ i ] );
            }
            let base64Image = window.btoa( binary );

            this.url = "data:" + 'image/png' + ';base64, ' + base64Image;            
            //let urlCreator = window.URL;
            //this.url = urlCreator.createObjectURL(this.blob);
            //this.url.replace('unsafe:', '');
        });
    }

    makeSpriteSheet() {

    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
    }

}
