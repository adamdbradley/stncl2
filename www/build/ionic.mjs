// modern esm build

export function h() {

}


function proxyHostElement(cstr, cmpData) {}


function bootstrapLazyComponents(cmpData) {
  cmpData.forEach(cmp => {
    class LazyCmp extends HTMLElement {}
    proxyHostElement(LazyCmp, cmpData);
    customElements.define(cmp[0], LazyCmp)
  });
}


bootstrapLazyComponents([['ion-button', ['text', 1]]]);