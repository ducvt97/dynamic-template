export const getContrastColor = (hexColor) => {
  // Convert the hex color to RGB
  let r = parseInt(hexColor.substr(1, 2), 16)
  let g = parseInt(hexColor.substr(3, 2), 16)
  let b = parseInt(hexColor.substr(5, 2), 16)

  // Calculate the brightness of the color
  let brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Return black for bright colors and white for dark colors
  return brightness > 128 ? '#000000' : '#FFFFFF'
}
