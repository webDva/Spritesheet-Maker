import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    url: SafeUrl = '';
    blob: Blob;
    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.
    // settings go here

    upload(files: FileList) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }

        this.http.post('/upload', formData).subscribe(data => {
            let binary = '';
            let bytes = new Uint8Array(data['newImage']['data']);
            let len = bytes.byteLength;
            for (let i = 0; i < len; i++) {
                binary += String.fromCharCode(bytes[i]);
            }
            let base64Image = window.btoa(binary);
            this.url = this.sanitzer.bypassSecurityTrustUrl('data:image/png;base64, ' + base64Image);
        });
    }

    makeSpriteSheet() {

    }

    constructor(private http: HttpClient, private sanitzer: DomSanitizer) {}

    ngOnInit() {
    }

}
