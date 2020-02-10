export const transformImage = (imageUrl: string, width: number, height: number): string => {
  return `${imageUrl}?w=${width}&h=${height}&fm=webp`;
}