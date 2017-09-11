import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-upload-form',
    templateUrl: './upload-form.component.html',
    styleUrls: ['./upload-form.component.css']
})
export class UploadFormComponent implements OnInit {

    filename = '';

    upload(files: FileList) {
        this.filename = files[0].name;
    }

    constructor() {}

    ngOnInit() {
    }

}
