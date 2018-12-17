

// treeshakable
export function createEvent(ref, name, options) {
  const elm = refMap.get(ref).elm;
  return {
    emit(detail) {
      return elm.dispatchEvent(new CustomEvent(name, { ...options, detail}))
    }
  }
}

// treeshakable
export function getElement(ref) {
  return refMap.get(ref).elm;
}

export function proxyMembers(Cstr, cmpMeta) {
  console.log('proxyMembers', Cstr, cmpMeta);

  cmpMeta[1].forEach(member => {
    proxyMember(Cstr, member[0]);
  });
}


function proxyMember(Cstr, memberName) {
  console.log('proxyMember', memberName);

  Object.defineProperty(Cstr.prototype, memberName, {
    get() {
      return getValue(this, memberName);
    },
    set(newValue) {
      setValue(this, memberName, newValue);
    }
  })
}

function scheduleUpdate(elmData) {
  // queue
  requestAnimationFrame(() => {
    render(elmData.instance);
  });
}

function render(instance) {
  console.log('render')
  instance.render();
}

function setValue(ref, memberName, newValue) {
  const elmData = refMap.get(ref);
  const instanceValues = elmData.instanceValues;
  const oldValue = instanceValues.get(memberName);
  if (oldValue !== newValue) {
    console.log('value changed from', oldValue, 'to', newValue);
    instanceValues.set(memberName, newValue);

    scheduleUpdate(elmData);
    return true;
  }
  return false;
}

export function getValue(ref, memberName) {
  return refMap.get(ref).instanceValues.get(memberName);
}

export function registerLazyInstance(lazyInstance, elmData) {
  console.log('registerLazyInstance', lazyInstance, elmData)
  elmData.instance = lazyInstance;
  refMap.set(lazyInstance, elmData);
}

const refMap = new WeakMap();
const styles = new Map();

function bootstrapLazyComponents(cmpMetas) {
  console.log('bootstrapLazyComponents')
  cmpMetas.forEach(cmpMeta => {

    class LazyHost extends HTMLElement {

      constructor() {
        super();
        refMap.set(this, {
          instanceValues: new Map(),
          instance: null,
          elm: this
        });
      }
      connectedCallback() {
        connectedCallback(this, cmpMeta)
      }

    }
    proxyMembers(LazyHost, cmpMeta);
    customElements.define(cmpMeta[0], LazyHost);
  });
}


async function connectedCallback(elm, cmpMeta) {
  console.log('connected', elm.tagName);

  const elmData = refMap.get(elm);
  const module = await import('./ionic/ion-checkbox.entry.js');
  const LazyComponent = module.IonCheckbox;

  if (!LazyComponent.proxied) {
    proxyMembers(LazyComponent, cmpMeta);
    LazyComponent.proxied = true;
  }

  new LazyComponent(elmData);
  scheduleUpdate(elmData);
}


bootstrapLazyComponents([['ion-checkbox', [['checked']]]]);


export function registerStyle(styleId, style) {
  console.log('registerStyle', styleId, style);
  styles.set(styleId, style);
}


export function h() {
  console.log('h');
}
