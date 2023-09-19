// import { convert } from 'color-convert';
import { createTheme } from '@shopify/restyle';

const palette = {
  neutral50: '#fafafa',
  neutral100: '#f5f5f5',
  neutral200: '#e5e5e5',
  neutral300: '#d4d4d4',
  neutral400: '#a3a3a3',
  neutral500: '#737373',
  neutral600: '#525252',
  neutral700: '#404040',
  neutral800: '#262626',
  neutral900: '#171717',
  neutral950: '0a0a0a',
  amber50: '#fffbeb',
  amber100: '#fef3c7',
  amber200: '#fde68a',
  amber300: '#fcd34d',
  amber400: '#fbbf24',
  amber500: '#f59e0b',
  amber600: '#d97706',
  amber700: '#b45309',
  amber800: '#92400e',
  amber900: '#78350f',
  amber950: '#451a03',
  teal50: '#f0fdfa',
  teal100: '#ccfbf1',
  teal200: '#99f6e4',
  teal300: '#5eead4',
  teal400: '#2dd4bf',
  teal500: '#14b8a6',
  teal600: '#0d9488',
  teal700: '#0f766e',
  teal800: '#115e59',
  teal900: '#134e4a',
  teal950: '#042f2e',
  sky50: '#f0f9ff',
  sky100: '#e0f2fe',
  sky200: '#bae6fd',
  sky300: '#7dd3fc',
  sky400: '#38bdf8',
  sky500: '#0ea5e9',
  sky600: '#0284c7',
  sky700: '#0369a1',
  sky800: '#075985',
  sky900: '#0c4a6e',
  sky950: '#082f49',
  indigo50: '#eef2ff',
  indigo100: '#e0e7ff',
  indigo200: '#c7d2fe',
  indigo300: '#a5b4fc',
  indigo400: '#818cf8',
  indigo500: '#6366f1',
  indigo600: '#4f46e5',
  indigo700: '#4338ca',
  indigo800: '#3730a3',
  indigo900: '#312e81',
  indigo950: '#1e1b4b',
  rose50: '#fff1f2',
  rose100: '#ffe4e6',
  rose200: '#fecdd3',
  rose300: '#fda4af',
  rose400: '#fb7185',
  rose500: '#f43f5e',
  rose600: '#e11d48',
  rose700: '#be123c',
  rose800: '#9f1239',
  rose900: '#881337',
  rose950: '#4c0519',
};

const primaryHue = 38;
const primarySaturation = 92;
const primaryLightness = 50;

const lightPalette = {
  primary: '#F59F0A', // convert.hex.hsl(primaryHue, primarySaturation, primaryLightness),
  text1: '#312002', // convert.hex.hsl(primaryHue, primarySaturation, 10),
  text2: '#635336', // convert.hex.hsl(primaryHue, 30, 30),
  surface1: '#ECE7DF',
  // surface1: convert.hex.hsl(primaryHue, 25, 90),
  surface2: '#FDFDFC', // convert.hex.hsl(primaryHue, 20, 99),
  surface3: '#EFECE7', // convert.hex.hsl(primaryHue, 20, 92),
  surface4: '#E1DBD1', // convert.hex.hsl(primaryHue, 20, 85),
  surfaceShadow: '#38342E', // convert.hex.hsl(primaryHue, 10, 20),
  shadowStrength: 0.2,
};

// const darkPalette = {
//   primary: convert.hex.hsl(
//     primaryHue,
//     primarySaturation / 2,
//     primaryLightness / 1.5
//   ),
//   text1: convert.hex.hsl(primaryHue, 15, 85),
//   text2: convert.hex.hsl(primaryHue, 5, 65),
//   surface1: convert.hex.hsl(primaryHue, 10, 10),
//   surface2: convert.hex.hsl(primaryHue, 10, 15),
//   surface3: convert.hex.hsl(primaryHue, 5, 20),
//   surface4: convert.hex.hsl(primaryHue, 5, 25),
//   surfaceShadow: convert.hex.hsl(primaryHue, 50, 3),
//   shadowStrength: 0.8,
// };

// const dimPalette = {
//   primary: convert.hex.hsl(
//     primaryHue,
//     primarySaturation / 1.25,
//     primaryLightness / 1.25
//   ),
//   text1: convert.hex.hsl(primaryHue, 15, 75),
//   text2: convert.hex.hsl(primaryHue, 10, 61),
//   surface1: convert.hex.hsl(primaryHue, 10, 20),
//   surface2: convert.hex.hsl(primaryHue, 10, 25),
//   surface3: convert.hex.hsl(primaryHue, 5, 30),
//   surface4: convert.hex.hsl(primaryHue, 5, 35),
//   surfaceShadow: convert.hex.hsl(primaryHue, 30, 13),
//   shadowStrength: 0.8,
// };

const theme = createTheme({
  colors: {
    primary: lightPalette.primary,
    secondary: lightPalette.text1,
    text1: lightPalette.text1,
    text2: lightPalette.text2,
    backgroundSurface: lightPalette.surface1,
    primarySurface: lightPalette.surface2,
    cardSurface: lightPalette.surface3,
    panelSurface: lightPalette.surface4,
    shadowColor: lightPalette.surfaceShadow,
  },
  spacing: {
    s: 1,
    s1: 2,
    s2: 4,
    s3: 6,
    s4: 8,
    s5: 10,
    s6: 12,
    s8: 16,
    s10: 20,
    s12: 24,
    s14: 28,
    s16: 32,
    s20: 40,
    s24: 48,
    s28: 56,
    s32: 64,
    s40: 80,
  },
  textVariants: {
    h1: {
      fontSize: 32,
      fontWeight: 900,
      color: 'text2',
    },
    body: {
      fontSize: 16,
    },
    label: {
      fontSize: 16,
      color: 'text2',
    },
    defaults: {
      fontSize: 16,
      color: 'text1',
    },
  },
});

export type Theme = typeof theme;
export default theme;
