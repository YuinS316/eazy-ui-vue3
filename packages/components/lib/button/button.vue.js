"use strict";
const vue = require("vue");
require("./styles/index.css");
const _hoisted_1 = { class: "button" };
const __default__ = {
  name: "EzButton"
};
const _sfc_main = /* @__PURE__ */ vue.defineComponent({
  ...__default__,
  props: {},
  setup(__props) {
    return (_ctx, _cache) => {
      return vue.openBlock(), vue.createElementBlock("button", _hoisted_1, "测试按钮");
    };
  }
});
module.exports = _sfc_main;
