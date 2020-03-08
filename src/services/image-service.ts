const isIPhone = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export const transformImage = (imageUrl: string, width: number, height: number): string => {
  return `${imageUrl}?w=${width}&h=${height}${isIPhone ? '&fm=png' : '&fm=webp'}`;
}