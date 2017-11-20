// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCFi9vrIv6nDmlzpVk1F14Ak7Z9Gp9m_Fc',
    authDomain: 'fempire-io.firebaseapp.com',
    databaseURL: 'https://fempire-io.firebaseio.com',
    projectId: 'fempire-io',
    storageBucket: 'fempire-io.appspot.com',
    messagingSenderId: '828452942542'
  }
};
