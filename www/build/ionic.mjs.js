
function proxyHostElement(HostCstr, cmpMeta) {
  console.log('proxyHostElement', cmpMeta[0])

  cmpMeta[1].forEach(member => {
    proxyMember(HostCstr, member[0]);
  });

  customElements.define(cmpMeta[0], HostCstr);
}


function setValue(memberName, instanceValues, newValue) {
  const oldValue = instanceValues.get(memberName);
  if (oldValue !== newValue) {
    console.log('value changed from', oldValue, 'to', newValue);

    instanceValues.set(memberName, newValue)
    return true;
  }
  return false;
}


function render(instance) {
  console.log('render')
  instance.render();
}


function proxyMember(Cstr, memberName) {
  console.log('proxyMember', memberName);

  Object.defineProperty(Cstr.prototype, memberName, {
    get() {
      return ref.get(this).instanceValues.get(memberName);
    },
    set(newValue) {
      const refItem = ref.get(this);
      if (setValue(memberName, refItem.instanceValues, newValue)) {
        if (refItem.instance) {
          render(refItem.instance);
        }
      }
    }
  })
}

export function proxyLazyComponent(LazyCmp, cmpMeta) {
  console.log('proxyLazyComponent', LazyCmp, cmpMeta);

  cmpMeta[1].forEach(member => {
    proxyMember(LazyCmp, member[0]);
  });
}


export function registerLazyInstance(lazyInstance, hostElm) {
  console.log('registerLazyInstance', lazyInstance, hostElm)
  ref.get(hostElm).instance = lazyInstance;
}

const ref = new WeakMap();
const styles = new Map();

function bootstrapLazyComponents(cmpData) {
  console.log('bootstrapLazyComponents')
  cmpData.forEach(cmpMeta => {

    class LazyHost extends HTMLElement {

      connectedCallback() {
        connectedCallback(this, cmpMeta)
      }

    }
    proxyHostElement(LazyHost, cmpMeta);
  });
}


async function connectedCallback(elm, cmpMeta) {
  console.log('connected', elm.tagName)
  const elmData = {
    instanceValues: new Map(),
    instance: null,
  };
  ref.set(elm, elmData);

  const module = await import('./ionic/ion-checkbox.entry.js');
  const LazyComponent = module.IonCheckbox;

  if (!LazyComponent.proxied) {
    proxyLazyComponent(LazyComponent, cmpMeta);
    LazyComponent.proxied = true;
  }

  elmData.instance = new module.IonCheckbox(elm);

  render(elmData.instance)
}


bootstrapLazyComponents([['ion-checkbox', [['checked']]]]);


export function registerStyle(styleId, style) {
  console.log('registerStyle', styleId, style);
  styles.set(styleId, style);
}


export function h() {
  console.log('h');
}
