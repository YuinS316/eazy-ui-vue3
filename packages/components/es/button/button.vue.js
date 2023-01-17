import { defineComponent, openBlock, createElementBlock } from "vue";
import "./styles/index.css";
const _hoisted_1 = { class: "button" };
const __default__ = {
  name: "EzButton"
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: {},
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", _hoisted_1, "测试按钮");
    };
  }
});
export {
  _sfc_main as default
};
