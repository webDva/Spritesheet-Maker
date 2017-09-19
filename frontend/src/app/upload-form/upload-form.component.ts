import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

import {environment} from '../../environments/environment';

interface UploadResponseType {
    newImage: {
        type: String;
        data: Uint8Array;
    }
}

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    baseUrl = '';

    url: SafeUrl = '';
    blob: Blob;
    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.
    // settings go here

    upload(files: FileList) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }

        this.http.post<UploadResponseType>(this.baseUrl + '/upload', formData).subscribe(data => {
            let blob = new Blob([new Uint8Array(data['newImage']['data'])], {type: 'image/png'});
            this.url = this.sanitzer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        });
    }

    makeSpriteSheet() {

    }

    constructor(private http: HttpClient, private sanitzer: DomSanitizer) {}

    ngOnInit() {
        if (!environment.production) {
            this.baseUrl = 'http://localhost:3000';
        }
    }

}
