export class Helper {

  public static scrollTop() {
    document.querySelector('ion-nav > .ion-page .scroll-content').scrollTop = 0;
  }

  public static scrollToContent() {

    let content = document.querySelector('.scroll-content > .container > .row > .col.l8');
    let scrollContent = document.querySelector('ion-nav > .ion-page .scroll-content');

    if (content && scrollContent) {
      scrollContent.scrollTop = (<any>content).offsetTop - 76;
    }
  }
}
