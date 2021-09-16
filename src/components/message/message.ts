import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {Modal} from "../../providers/modal";

@Component({
    selector: 'message',
    templateUrl: 'message.html'
})

export class MessageComponent {

    message: string = '';
    files: Array<File> = [];

    @ViewChild('inputFile') inputFile: ElementRef;

    @Output() onMessage = new EventEmitter();

    constructor(
        public modal: Modal
    ) {
    }

    addFiles() {

        let selectedFiles = this.inputFile.nativeElement.files;

        for (let i = 0; i < selectedFiles.length; i++) {
            this.files.push(selectedFiles[i]);
        }
    }

    removeFile(index: number) {
        this.modal.confirm('Удалить выбранный файл?', () => {
            this.files.splice(index, 1);
        });
    }

    send() {

        if (!this.files.length && !this.message.length) {
            return;
        }

        this.onMessage.emit({
            files: this.files,
            message: this.message
        });

        this.message = '';
        this.files = [];
    }
}