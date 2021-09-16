export class Base64 {

  public static encode(value: string) {

    return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g,
      function toSolidBytes(match, p1) {
        return String.fromCharCode(parseInt('0x' + p1));
      }));
  }

  public static decode(value: string) {

    return decodeURIComponent(atob(value).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
