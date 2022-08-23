import { ErrorHandler, Injectable } from "@angular/core";
import { FirebaseError } from "firebase/app";

interface AngularFireError extends Error {
  rejection: FirebaseError;
}

function errorIsAngularFireError(err: any): err is AngularFireError {
  return err.rejection && err.rejection.name === 'FirebaseError';
}

// Not providedIn 'root': needs special handling in app.module to override default error handler.
@Injectable()
export class FireErrorHandler implements ErrorHandler {

  handleError(error: any) {
    console.log(error);
    // AngularFire errors should be catchable and handled in components; no need to further process them.
    if (!errorIsAngularFireError(error)) {
      console.error(error);
    }
  }
}
