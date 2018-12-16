import { h, registerLazyInstance, proxyLazyComponent } from '../ionic.mjs.js';


export class IonCheckbox {

  constructor(hostElm) {
    registerLazyInstance(this, hostElm);
  }

  render() {
    return h('button', null);
  }

  static get style() {
    return `div { color: blue }`
  }

  static get styleMode() {
    return `ios`
  }

}
