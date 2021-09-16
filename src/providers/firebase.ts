import {Config} from "../config";

export class Firebase {

  private static firebase: any = null;
  private static messaging: any = null;

  public static getToken() {

    return new Promise((resolve, reject) => {

      if (!('Notification' in window)) {
        reject('Browser doesn\'t support notification');
        return;
      }

      if (!Firebase.firebase) {
        Firebase.firebase = (<any>window).firebase;
        Firebase.firebase.initializeApp(Config.firebase.config);
      }

      if (!Firebase.messaging) {
        try {
          Firebase.messaging = Firebase.firebase.messaging();
          Firebase.messaging.usePublicVapidKey(Config.firebase.vapid);
        } catch (error) {
          reject('Messaging not supported');
          return;
        }
      }

      Notification

        .requestPermission()

        .then((permission) => {

          if (permission === 'granted') {

            Firebase.messaging.getToken().then((token) => {

              if (token) {
                resolve(token);
                return;
              }

              reject('Can\'t get token');

            });

            Firebase.messaging.onTokenRefresh(() => {

              Firebase.messaging.getToken().then((token) => {

                if (token) {
                  resolve(token);
                  return;
                }

                reject('Can\'t update token');
              });
            });

            return;
          }

          reject('Permission not granted');
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
