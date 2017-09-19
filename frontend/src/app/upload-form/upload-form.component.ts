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

    files: FileList;

    // User's spritesheet settings
    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.
    padding: number;

    upload(files?: FileList, padding?: number) {
        if (files) {
            this.files = files;
        }

        let formData = new FormData();

        if (files) {
            for (let i = 0; i < files.length; i++) {
                formData.append('files', files[i], files[i].name);
            }
        } else {
            for (let i = 0; i < this.files.length; i++) {
                formData.append('files', this.files[i], this.files[i].name);
            }

            this.padding = padding;
            formData.append('padding', this.padding);
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
