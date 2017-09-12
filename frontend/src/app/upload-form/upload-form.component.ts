import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    files: FileList;
    isForTiledMaps: boolean = false; // A setting for when the user wants to use this service for making Tiled maps.

    upload(files: FileList) {
        this.files = files;
    }

    makeSpriteSheet() {

    }

    constructor() {}

    ngOnInit() {
    }

}
