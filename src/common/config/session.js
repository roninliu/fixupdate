'use strict';

/**
 * session configs
 */
export default {
  name: 'fixupdate',
  type: 'file',
  secret: 'P2XBT~H(',
  timeout: 24 * 3600,
  cookie: { // cookie options
    length: 32,
    httponly: true
  },
  adapter: {
    file: {
      path: think.RUNTIME_PATH + '/session',
    }
  }
};