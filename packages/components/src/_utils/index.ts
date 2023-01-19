import { isArray } from "@eazy-ui/utils";

type ClassName = string | undefined | null;
type Classes = (ClassName | [any, ClassName, ClassName?])[];

export function createNamespace(name: string) {
  const namespace = "ez";

  const compName = `${namespace}-${name}`;

  const createBEM = (suffix?: string): string => {
    if (!suffix) return compName;

    /**
     * example:
     * createNamespace("button")
     * createBEM("$--flex") ->  "ez-flex"
     */
    if (suffix.startsWith("$")) {
      return suffix.replace("$", namespace);
    }

    /**
     * example:
     * createNamespace("button")
     * createBEM("--primary") -> "ez-button--primary"
     */
    if (suffix.startsWith("--")) {
      return `${compName}${suffix}`;
    }

    /**
     * example:
     * createNamespace("button")
     * createBEM("__active") -> "ez-button__active"
     */
    return `${compName}__${suffix}`;
  };

  const classNames = (...classes: Classes) => {
    return classes.map((className) => {
      if (isArray(className)) {
        const [condition, truthy, falsy = null] = className;
        return condition ? truthy : falsy;
      }

      return className;
    });
  };

  return {
    n: createBEM,
    cls: classNames,
  };
}
