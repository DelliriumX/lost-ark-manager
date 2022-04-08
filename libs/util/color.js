export const hexToRgb = hex => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_, r, g, b) => {
    return r + r + g + g + b + b
  })
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const generateColors = (
  baseColor,
  outputCount,
  hueDeviation,
  saturationDeviation,
  valueDeviation = 0
) => {
  if (outputCount <= 1) return [baseColor]
  const rgb = hexToRgb(baseColor)
  const rgbScaled = { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 }
  // /////// RGB TO HSV //////////
  const cMax = Math.max(rgbScaled.r, rgbScaled.g, rgbScaled.b)
  const cMin = Math.min(rgbScaled.r, rgbScaled.g, rgbScaled.b)
  const d = cMax - cMin
  let first = rgbScaled.r
  let second = rgbScaled.g
  let third = rgbScaled.b
  let mod = 0
  let hue = 60
  let value = (cMax + cMin) / 2
  let saturation = d ? d / (1 - Math.abs(2 * value - 1)) : 0
  const shift = () => {
    const local = first
    first = second
    second = third
    third = local
  }
  switch (cMax) {
    case rgbScaled.r:
      hue *= ((second - third) / d) % 6
      break
    case rgbScaled.b:
      shift()
      mod += 2
    case rgbScaled.g:
      shift()
      mod += 2
      mod += (second - third) / d
      hue *= mod
  }
  // /////// GENERATE COLORS //////////
  const hueStep = (720 * hueDeviation) / (outputCount - 1)
  let satRange =
    saturationDeviation !== undefined
      ? saturationDeviation +
        Math.min(Math.min(saturationDeviation, saturation), 1 - saturation)
      : hueDeviation + Math.min(Math.min(hueDeviation, saturation), 1 - saturation)
  satRange = satRange > 1 ? 1 : satRange
  const satStep = satRange / (outputCount - 1)
  let valRange =
    saturationDeviation !== undefined
      ? valueDeviation + Math.min(Math.min(valueDeviation, value), 1 - value)
      : hueDeviation + Math.min(Math.min(hueDeviation, value), 1 - value)

  valRange = valRange > 1 ? 1 : valRange
  const valStep = valRange / (outputCount - 1)

  let hueMin = hue - 360 * hueDeviation
  while (hueMin < 0) {
    hueMin += 360
  }
  const satMin = Math.max(
    0,
    saturation -
      (saturationDeviation !== undefined ? saturationDeviation : hueDeviation)
  )
  const valMin = Math.max(
    0,
    value - (saturationDeviation !== undefined ? valueDeviation : hueDeviation)
  )
  const resultHSV = [{ hue: hueMin, sat: satMin, val: valMin }]
  for (let i = 1; i < outputCount; i++) {
    resultHSV.push({
      hue: (hueMin + hueStep * i) % 360,
      sat: satMin + satStep * i,
      val: valMin + valStep * i,
    })
  }
  // /////// HSV TO RGB //////////
  const resultRGB = resultHSV.map(color => {
    const c = (1 - Math.abs(2 * color.val - 1)) * color.sat
    const x = c * (1 - Math.abs(((color.hue / 60) % 2) - 1))
    const m = color.val - c / 2
    switch (true) {
      case color.hue < 60:
        first = c
        second = x
        third = 0
        break
      case color.hue < 120:
        first = x
        second = c
        third = 0
        break
      case color.hue < 180:
        first = 0
        second = c
        third = x
        break
      case color.hue < 240:
        first = 0
        second = x
        third = c
        break
      case color.hue < 300:
        first = x
        second = 0
        third = c
        break
      case color.hue < 360:
        first = c
        second = 0
        third = x
        break
    }
    return {
      r: Math.round((first + m) * 255),
      g: Math.round((second + m) * 255),
      b: Math.round((third + m) * 255),
    }
  })
  const resultHEX = resultRGB.map(color => rgbToHex(color.r, color.g, color.b))
  return resultHEX
}

export const invertColor = hex => {
  const rgb = hexToRgb(hex)
  const inverse = { r: 255 - rgb.r, g: 255 - rgb.g, b: 255 - rgb.b }
  return rgbToHex(inverse.r, inverse.g, inverse.b)
}

export const getColorFromGradient = (gradient, position) => {
  const sorted = gradient.sort((a, b) => a.position - b.position)
  let color = sorted[0].color || '#FFFFFF'
  let i = 0
  while (position > sorted[i].position) {
    i++
  }
  if (i > 0) {
    const local = {
      min: sorted[i - 1].position,
      max: sorted[i].position,
    }
    local.range = local.max - local.min
    const offset = position - local.min
    const ratio = offset / local.range
    const lower = hexToRgb(sorted[i - 1].color)
    const higher = hexToRgb(sorted[i].color)
    color = rgbToHex(
      Math.round(lower.r * (1 - ratio) + higher.r * ratio),
      Math.round(lower.g * (1 - ratio) + higher.g * ratio),
      Math.round(lower.b * (1 - ratio) + higher.b * ratio)
    )
  }
  return color
}
