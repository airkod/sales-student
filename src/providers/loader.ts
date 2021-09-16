import {Timer} from "./timer";

export class Loader {

  private static showCount: number = 0;
  private static timeout: number = 300;
  private static showTimeout: number = 0;

  private static loaderElementRef: HTMLElement = null;
  private static loaderElementTemplate = `
<div class="preloader-wrapper small">
    <div class="spinner-layer spinner-blue-only">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="gap-patch">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
</div>`;

  public static show() {

    this.showCount++;

    if (!this.showTimeout) {

      this.showTimeout = Timer.timeout(this.timeout, () => {

        if (!document.querySelector('app-loader')) {

          this.loaderElementRef = document.createElement('app-loader');
          this.loaderElementRef.innerHTML = this.loaderElementTemplate;
          document.querySelector('body').appendChild(this.loaderElementRef);
        }

        this.loaderElementRef.classList.add('active');

        this.showTimeout = 0;
      });
    }
  }

  public static hide() {

    this.showCount--;

    if (this.showCount != 0) {
      return;
    }

    if (this.showTimeout) {
      Timer.destroy(this.showTimeout);
      this.showTimeout = 0;
      return;
    }

    Timer.timeout(this.timeout, () => {

      this.loaderElementRef.classList.remove('active');

      this.loaderElementRef.remove();
      this.loaderElementRef = null;
    });
  }
}
