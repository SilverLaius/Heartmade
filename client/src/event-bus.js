var { EventEmitter } = require("fbemitter");
var emitter = new EventEmitter();

export const openLoginPopup = () => {
  emitter.emit("open-login-popup");
};

export const onOpenLoginPopup = callback => {
  emitter.addListener("open-login-popup", callback);
};

export const openRegisterPopup = () => {
  emitter.emit("open-register-popup");
};

export const onOpenRegisterPopup = callback => {
  emitter.addListener("open-register-popup", callback);
};
