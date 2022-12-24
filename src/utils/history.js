const eventName = 'onChangeHistory';

export const onChangeHistory = (clb) => {
  window.addEventListener(eventName, clb);
};

window.history.pushState = new Proxy(window.history.pushState, {
  apply: (target, thisArg, argArray) => {
    const result = target.apply(thisArg, argArray);

    window.dispatchEvent(new Event(eventName));

    return result;
  },
});

export const history = window.history;

