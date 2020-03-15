const isIPhone = () => {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform);
  }
}

export const transformImage = (imageUrl: string, width: number, height: number): string => {
  return `${imageUrl}?w=${width}&h=${height}${isIPhone ? '&fm=png' : '&fm=webp'}`;
}