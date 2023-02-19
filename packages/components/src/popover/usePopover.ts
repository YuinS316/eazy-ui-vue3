import { call, getRect, nextFrame } from "@/_utils";
import { onMounted, Ref, ref } from "vue";
import { computedPosition, offset } from "./computedPosition";
import { Placement } from "./props";

export interface UsePopoverOptions {
  modelValue: boolean;
  trigger: "hover" | "click";
  placement: Placement;
  teleport: any;
  "onUpdate:modelValue"?(show: boolean): void;
  offset: number;
}

export function usePopover(options: UsePopoverOptions) {
  const show = ref(false);

  const hostRef: Ref<null | HTMLElement> = ref(null);
  const popoverRef: Ref<null | HTMLElement> = ref(null);

  let isEnterHost = false;
  let isEnterPopover = false;
  let hasClick = false;

  const resize = () => {
    const { x, y } = computedPosition(hostRef.value!, popoverRef.value!, {
      placement: options.placement,
      middleware: [offset(options.offset)],
    });
    popoverRef.value!.style.left = x + "px";
    popoverRef.value!.style.top = y + "px";

    popoverRef.value!.style.position = "absolute";
  };

  onMounted(() => {
    //  一开始display: none的时候无法获取其长、宽，需要通过设置为inline-block + invisible去
    //  做一个伪隐藏，计算之后再还原回去
    popoverRef.value!.style.display = "inline-block";
    const classnames = ["ez--invisible", "ez--inline-block"];
    classnames.forEach((classname) => {
      popoverRef.value!.classList.add(classname);
    });

    resize();

    popoverRef.value!.style.display = "none";
    classnames.forEach((classname) => {
      popoverRef.value!.classList.remove(classname);
    });
  });

  const handleHostMouseEnter = () => {
    if (options.trigger !== "hover") return;

    isEnterHost = true;

    open();
  };

  const handleHostMouseLeave = async () => {
    if (options.trigger !== "hover") return;
    isEnterHost = false;

    await nextFrame();

    if (isEnterPopover) {
      return;
    }

    close();
  };

  const handlePopoverMouseEnter = () => {
    if (options.trigger !== "hover") return;
    isEnterPopover = true;
  };

  const handlePopoverMouseLeave = async () => {
    if (options.trigger !== "hover") return;
    isEnterPopover = false;

    await nextFrame();

    if (isEnterHost) {
      return;
    }

    close();
  };

  const open = () => {
    show.value = true;

    if (options["onUpdate:modelValue"]) {
      call(options["onUpdate:modelValue"], true);
    }
  };

  const close = () => {
    show.value = false;

    if (options["onUpdate:modelValue"]) {
      call(options["onUpdate:modelValue"], false);
    }
  };

  const handleHostClick = () => {
    if (options.trigger !== "click") return;

    if (hasClick) {
      hasClick = false;
      close();
      return;
    }

    hasClick = true;
    open();
  };

  return {
    show,
    hostRef,
    popoverRef,
    handleHostMouseEnter,
    handleHostMouseLeave,
    handleHostClick,
    handlePopoverMouseEnter,
    handlePopoverMouseLeave,
  };
}
