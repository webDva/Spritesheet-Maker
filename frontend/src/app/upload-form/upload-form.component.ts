import {Component, OnInit} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.
    // settings go here

    upload(files: FileList) {
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i], files[i].name);
        }

        this.http.post('/upload', formData).subscribe();
    }

    makeSpriteSheet() {

    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
    }

}
