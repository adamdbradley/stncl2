import { h, proxyComponentConstructor } from './ionic.js';


export class IonButton {

  ionChange = createEvent({name: 'ionChange'})

  render() {
    return h('button', null);
  }

}

proxyEvent(IonButton, ['ion-button', [0, 43, 34]])