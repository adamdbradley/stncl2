import { h, registerLazyInstance, registerStyle } from '../ionic.mjs.js';


export class IonCheckbox {

  constructor(hostElm) {
    registerLazyInstance(this, hostElm);
  }

  render() {
    return h('button', null);
  }

}

registerStyle('ion-checkbox.ios', 'div { color: blue }')