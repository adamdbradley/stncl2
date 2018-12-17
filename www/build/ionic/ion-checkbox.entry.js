import { h, c, s, e, el } from '../ionic.mjs.js';


export class IonCheckbox {

  constructor(elmData) {
    c(this, elmData);

    // @Event() el
    this.ionChange = e(this, 'ionChange', {
      bubbles: false, // optional, only pass when it's false
      composed: false, // optional, only pass when it's false
      cancelable: false, // optional, only pass when it's false
    });
  }

  // @Element() el
  get el() {
    return el(this);
  }

  render() {
    this.el.textContent = 'ion-checkbox';
    return h('button', null);
  }
}

s('ion-checkbox.ios', 'div { color: blue }')