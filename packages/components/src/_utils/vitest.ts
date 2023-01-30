import { DOMWrapper, VueWrapper } from "@vue/test-utils";
import { ComponentPublicInstance, nextTick } from "vue";

/**
 * 模拟触发事件
 */
export function trigger(
  wrapper:
    | VueWrapper<ComponentPublicInstance<any, any, any>>
    | DOMWrapper<Element>
    | Element
    | Window,
  eventName: string
) {
  const el = "element" in wrapper ? wrapper.element : wrapper;

  const event = new CustomEvent(eventName, {
    bubbles: true,
    cancelable: true,
    detail: {},
  });

  el.dispatchEvent(event);

  return nextTick();
}
