export function oklchToRgba(oklch: string) {
  const [color, alphaPart] = oklch.replace(/^oklch\(|\)$/g, '').split('/');
  const [l, c, h] = color.split(/\s+/).filter(Boolean).map(parseFloat);
  const parsedAlpha = alphaPart === undefined ? 1 : parseFloat(alphaPart);
  const alpha = Number.isNaN(parsedAlpha) ? 1 : parsedAlpha;

  // OKLCH -> OKLab
  const hr = (h * Math.PI) / 180;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  // OKLab -> LMS (cube-root space)
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const L = l_ ** 3;
  const M = m_ ** 3;
  const S = s_ ** 3;

  // LMS -> linear sRGB
  const lin = [
    4.0767416621 * L - 3.3077115913 * M + 0.2309699292 * S,
    -1.2684380046 * L + 2.6097574011 * M - 0.3413193965 * S,
    -0.0041960863 * L - 0.7034186147 * M + 1.707614701 * S,
  ];

  // Linear -> gamma-encoded sRGB, clipped to 0..255
  const toByte = (x: number) => {
    const clamped = Math.min(1, Math.max(0, x));
    const srgb = clamped <= 0.0031308 ? 12.92 * clamped : 1.055 * clamped ** (1 / 2.4) - 0.055;
    return Math.round(srgb * 255);
  };

  const [r, g, bl] = lin.map(toByte);
  const al = Math.min(1, Math.max(0, alpha));

  return `rgba(${r}, ${g}, ${bl}, ${al})`;
}
