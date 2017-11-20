import * as firebase from 'firebase/app';

export interface IUser extends firebase.UserInfo {
  emailVerified: boolean;
  isAnonymous: boolean;
  phoneNumber: string | null;
  providerData: (firebase.UserInfo | null)[];
  refreshToken: string;
  delete(): Promise<any>;
  getIdToken(forceRefresh?: boolean): Promise<any>;
  getToken(forceRefresh?: boolean): Promise<any>;
  linkAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<any>;
  linkWithCredential(credential: firebase.auth.AuthCredential): Promise<any>;
  linkWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<any>;
  linkWithPopup(provider: firebase.auth.AuthProvider): Promise<any>;
  linkWithRedirect(provider: firebase.auth.AuthProvider): Promise<any>;
  reauthenticateAndRetrieveDataWithCredential(credential: firebase.auth.AuthCredential): Promise<any>;
  reauthenticateWithCredential(credential: firebase.auth.AuthCredential): Promise<any>;
  reauthenticateWithPhoneNumber(phoneNumber: string, applicationVerifier: firebase.auth.ApplicationVerifier): Promise<any>;
  reauthenticateWithPopup(provider: firebase.auth.AuthProvider): Promise<any>;
  reauthenticateWithRedirect(provider: firebase.auth.AuthProvider): Promise<any>;
  reload(): Promise<any>;
  sendEmailVerification(actionCodeSettings?: firebase.auth.ActionCodeSettings | null): Promise<any>;
  toJSON(): Object;
  unlink(providerId: string): Promise<any>;
  updateEmail(newEmail: string): Promise<any>;
  updatePassword(newPassword: string): Promise<any>;
  updatePhoneNumber(phoneCredential: firebase.auth.AuthCredential): Promise<any>;
  updateProfile(profile: { displayName: string | null, photoURL: string | null }): Promise<any>;
}
