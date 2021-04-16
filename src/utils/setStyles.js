import small from "../svg/small.svg";
import middle from "../svg/middle.svg";
import big from "../svg/big.svg";

export const setGradientBg = (isHazardous, prefix) => {
  if (isHazardous) {
    return `${prefix}-bg-danger`;
  }
  return `${prefix}-bg-safe`;
};

export const setGradientMob = (isHazardous, prefix) => {
  if (isHazardous) {
    return `${prefix}-title-danger`;
  }
  return `${prefix}-title-safe`;
};

export const setSvgToImg = (size) => {
  let path = null;

  if (size <= 85) {
    path = small;
    return { id: "small", path };
  }
  if (size > 85 && size <= 300) {
    path = middle;
    return { id: "middle", path };
  }
  if (size > 300) {
    path = big;
    return { id: "big", path };
  }
};
