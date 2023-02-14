import { isDef } from "@/shared";
import { computed, getCurrentInstance } from "vue";

export interface UseVModelOptions<T> {
  /**
   * Define default value for value ref when no value is passed.
   *
   * @default undefined
   */
  defaultValue?: T;
}

export function useVModel<P extends object, K extends keyof P>(
  props: P,
  key?: K,
  emit?: (name: string, ...args: any[]) => void,
  options: UseVModelOptions<P[K]> = {}
) {
  //  默认值为modelValue
  key = key ?? ("modelValue" as K);

  const eventName = `update:${key.toString()}`;

  const _emit = emit ?? getCurrentInstance()?.emit;

  return computed<P[K]>({
    get() {
      return props[key!];
    },
    set(value) {
      _emit?.(eventName, value);
    },
  });
}
