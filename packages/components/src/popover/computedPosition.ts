import { getRect } from "@/_utils";
import { Placement } from "./props";

type Side = "top" | "bottom" | "left" | "right";
type Alignment = "start" | "end" | undefined;

interface Position {
  x: number;
  y: number;
}

interface MiddlewareState {
  x: number;
  y: number;
  placement: Placement;
  elements: {
    referenceEl: HTMLElement;
    floatingEl: HTMLElement;
  };
}

interface MiddlewareData {
  [key: string]: any;
  offset?: Position;
}

interface Middleware {
  name: string;
  options?: any;
  fn: (state: MiddlewareState) => ComputePositionReturn;
}

interface ComputePositionReturn {
  x: number;
  y: number;
  data?: {
    [k: string]: any;
  };
}

interface ComputedPositionConfig {
  placement: Placement;
  middleware?: Array<Middleware>;
}
type ComputedPosition = (
  referenceEl: HTMLElement,
  floatingEl: HTMLElement,
  config: ComputedPositionConfig
) => ComputePositionReturn;

export const computedPosition: ComputedPosition = (
  referenceEl,
  floatingEl,
  config
) => {
  let { x, y } = computedPostionByPlacement(referenceEl, floatingEl, config);

  let { middleware = [], placement } = config;

  let validMiddleware = middleware.filter(Boolean) as Middleware[];

  let middlewareData: MiddlewareData = {};

  for (let i = 0; i < validMiddleware.length; i++) {
    const { fn, name } = validMiddleware[i];

    const {
      x: nextX,
      y: nextY,
      data,
    } = fn({
      x,
      y,
      placement,
      elements: {
        referenceEl,
        floatingEl,
      },
    });

    middlewareData = {
      ...middlewareData,
      [name]: {
        ...middlewareData[name],
        ...data,
      },
    };

    x = nextX ?? x;
    y = nextY ?? y;
  }

  return {
    x,
    y,
  };
};

const computedPostionByPlacement: ComputedPosition = (
  referenceEl,
  floatingEl,
  config
) => {
  const { placement } = config;

  const referenceRect = getRect(referenceEl);

  const floatingRect = getRect(floatingEl);

  const commonX =
    referenceRect.x +
    (referenceRect.width - floatingRect.width) / 2 +
    window.scrollX;
  const commonY =
    referenceRect.y +
    (referenceRect.height - floatingRect.height) / 2 +
    window.scrollY;

  let position = {
    x: commonX,
    y: commonY,
  };

  const side = getSide(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const lengthKey = getLengthKeyFromAxis(mainAxis);
  //  对应start / end 时的标准值
  const commonAlign = (floatingRect[lengthKey] - referenceRect[lengthKey]) / 2;

  switch (side) {
    case "top": {
      position = {
        x: commonX,
        y: referenceRect.y - floatingRect.height,
      };
      break;
    }

    case "bottom": {
      position = {
        x: commonX,
        y: referenceRect.y + referenceRect.height,
      };
      break;
    }

    case "left": {
      position = {
        x: referenceRect.x - floatingRect.width,
        y: commonY,
      };
      break;
    }

    case "right": {
      position = {
        x: referenceRect.x + referenceRect.width,
        y: commonY,
      };
      break;
    }

    default:
      break;
  }

  switch (getAlignment(placement)) {
    case "start": {
      position[mainAxis] += commonAlign;
      break;
    }

    case "end": {
      position[mainAxis] -= commonAlign;
      break;
    }

    default:
      break;
  }

  return position;
};

/**
 * 返回方向对应的key
 *
 * @param placement
 * @returns
 *
 * @example
 * let mainAxis = getMainAxis("bottom"); // y
 * let mainAxis = getMainAxis("left-start"); // x
 */
function getMainAxisFromPlacement(placement: Placement) {
  return ["bottom", "top"].includes(getSide(placement)) ? "x" : "y";
}

function getLengthKeyFromAxis(axis: string) {
  return axis === "x" ? "width" : "height";
}

/**
 * 返回主轴方向
 *
 * @param placement
 * @returns
 *
 * @example
 * let mainAxis = getSide("bottom"); // bottom
 * let mainAxis = getSide("left-start"); // left
 */
function getSide(placement: Placement): Side {
  return placement.split("-")[0] as Side;
}

function getAlignment(placement: Placement): Alignment {
  return placement.split("-")[1] as Alignment;
}

export const offset = (value: number): Middleware => {
  return {
    name: "offset",
    options: value,
    fn(state) {
      const { x, y } = state;

      const diffPosition = computePositionByOffset(state, value);

      return {
        x: x + diffPosition.x,
        y: y + diffPosition.y,
        data: diffPosition,
      };
    },
  };
};

/**
 * 返回增量的坐标
 *
 * @param state
 * @param value
 */
function computePositionByOffset(
  state: MiddlewareState,
  value: number
): ComputePositionReturn {
  const { placement, elements } = state;

  const side = getSide(placement);
  const mainAxis = getMainAxisFromPlacement(placement);
  const isVertical = mainAxis === "x";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;

  return !isVertical
    ? {
        x: value * mainAxisMulti,
        y: 0,
      }
    : {
        x: 0,
        y: value * mainAxisMulti,
      };
}
