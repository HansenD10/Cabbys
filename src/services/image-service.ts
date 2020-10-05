const isIPhone = (): boolean => {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2) {
    return /MacIntel/.test(navigator.platform);
  } else {
    return false;
  }
};

export const transformImage = (
  imageUrl: string,
  width: number,
  height: number
): string => {
  return `${imageUrl}?w=${width}&h=${height}${
    isIPhone ? '&fm=png' : '&fm=webp'
  }`;
};
