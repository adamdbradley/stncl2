import { h } from '@stencil/core';


export class IonButton {

  render() {
    return h('button', null);
  }

  static get properties() {
    return {

      /** This is the checked property */
      checked: {
        type: 'boolean',
        attr: 'checked',
        reflectToAttr: true,
        mutable: true
      },

      /** jsdocs */
      multiWord: {
        type: 'string',
        attr: 'multi-word'
      },

      /** jsdocs */
      text: {
        type: 'string',
        state: true
      },

      /** jsdocs */
      something: {
        type: 'unknown',
        complexType: 'SomeClass[]',
        state: true
      }
    }
  }

  static get is() {
    return 'ion-button'
  }

}