export const transformImage = (imageUrl, width, height) => {
  return `${imageUrl}?w=${width}&h=${height}&fm=webp`;
}