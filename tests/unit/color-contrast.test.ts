import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const css = readFileSync("src/app/globals.css", "utf8");

function readHexToken(name: string) {
  const match = css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6});`));
  assert.ok(match, `Expected ${name} to be a hex color token`);
  return match[1];
}

function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function channelToLinear(value: number) {
  const normalized = value / 255;
  return normalized <= 0.03928
    ? normalized / 12.92
    : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelToLinear(r) +
    0.7152 * channelToLinear(g) +
    0.0722 * channelToLinear(b)
  );
}

function contrastRatio(foreground: string, background: string) {
  const lighter = Math.max(luminance(foreground), luminance(background));
  const darker = Math.min(luminance(foreground), luminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test("brand cyan remains accessible for action and focus roles", () => {
  const background = readHexToken("--background");
  const surface = readHexToken("--surface");
  const surfaceElevated = readHexToken("--surface-elevated");
  const brandCyan = readHexToken("--brand-cyan");

  assert.ok(
    contrastRatio(brandCyan, background) >= 4.5,
    "Cyan text and focus affordances need AA contrast on the page background",
  );
  assert.ok(
    contrastRatio(brandCyan, surface) >= 4.5,
    "Cyan text and icons need AA contrast on card surfaces",
  );
  assert.ok(
    contrastRatio(brandCyan, surfaceElevated) >= 4.5,
    "Cyan text and icons need AA contrast on elevated surfaces",
  );
});

test("primary cyan buttons keep readable foreground contrast", () => {
  const background = readHexToken("--background");
  const brandCyan = readHexToken("--brand-cyan");

  assert.ok(
    contrastRatio(background, brandCyan) >= 4.5,
    "Primary button text uses the background token on brand cyan",
  );
});
