import {Component, Input} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
    selector: 'trumbowyg',
    templateUrl: 'trumbowyg.html'
})

export class TrumbowygComponent {

    @Input('content') content: string | SafeHtml = null;
    @Input('nl2br') nl2br: boolean = false;
    @Input('webinar') webinar: boolean = false;

    constructor(
        public sanitizer: DomSanitizer
    ) {
    }

    ngOnChanges() {

        if (typeof this.content == 'string') {

            if (this.webinar) {
                this.content = '<iframe src="https://player.vimeo.com/video/' + this.content + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>';
            }

            this.content = (<string>this.content)
                .split('<iframe').join('<div class="video-container z-depth-2"><iframe')
                .split('</iframe>').join('</iframe></div>');

            this.content = (<string>this.content)
                .split('<p></p>').join('');

            this.content = (<string>this.content)
                .split('<img').join('<img class="z-depth-2"');

            if (this.nl2br) {
                this.content = (<string>this.content).split("\n").join('<br>');
            }

            this.content = this.sanitizer.bypassSecurityTrustHtml(
                (<string>this.content)
            );
        }
    }
}
