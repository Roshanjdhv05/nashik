/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
  "colors": {
    "on-tertiary": "#ffffff",
    "primary-fixed": "#ffdbca",
    "on-primary-fixed-variant": "#773300",
    "on-surface": "#1c1c19",
    "secondary-container": "#bee5fa",
    "on-surface-variant": "#564339",
    "tertiary": "#755717",
    "on-primary": "#ffffff",
    "on-background": "#1c1c19",
    "on-primary-fixed": "#331200",
    "surface-variant": "#e5e2dd",
    "error-container": "#ffdad6",
    "primary-fixed-dim": "#ffb68e",
    "primary": "#984300",
    "on-error-container": "#93000a",
    "inverse-surface": "#31302d",
    "on-tertiary-fixed-variant": "#5d4201",
    "on-secondary-fixed-variant": "#254b5c",
    "on-tertiary-fixed": "#261900",
    "error": "#ba1a1a",
    "outline": "#897267",
    "outline-variant": "#ddc1b3",
    "background": "#fcf9f4",
    "tertiary-fixed-dim": "#e9c176",
    "on-secondary": "#ffffff",
    "surface-tint": "#9c4400",
    "surface-container": "#f0ede9",
    "surface-dim": "#dcdad5",
    "on-secondary-fixed": "#001f2a",
    "primary-container": "#ba5814",
    "surface-bright": "#fcf9f4",
    "surface-container-lowest": "#ffffff",
    "on-primary-container": "#fffbff",
    "on-error": "#ffffff",
    "on-secondary-container": "#426879",
    "secondary": "#3e6374",
    "on-tertiary-container": "#fffbff",
    "surface": "#fcf9f4",
    "tertiary-fixed": "#ffdea5",
    "surface-container-highest": "#e5e2dd",
    "secondary-fixed": "#c1e8fc",
    "secondary-fixed-dim": "#a5cce0",
    "inverse-on-surface": "#f3f0eb",
    "inverse-primary": "#ffb68e",
    "surface-container-high": "#ebe8e3",
    "tertiary-container": "#90702e",
    "surface-container-low": "#f6f3ee"
  },
  "borderRadius": {
    "DEFAULT": "0.125rem",
    "lg": "0.25rem",
    "xl": "0.5rem",
    "full": "0.75rem"
  },
  "spacing": {
    "gutter": "1.5rem",
    "space-lg": "1.5rem",
    "space-xl": "2.5rem",
    "margin-mobile": "1.25rem",
    "space-md": "1rem",
    "gutter-mobile": "1rem",
    "space-sm": "0.5rem",
    "margin": "3rem",
    "space-xs": "0.25rem"
  },
  "fontFamily": {
    "body-lg": [
      "Plus Jakarta Sans"
    ],
    "title-md": [
      "Plus Jakarta Sans"
    ],
    "body-sm": [
      "Plus Jakarta Sans"
    ],
    "headline-lg": [
      "Playfair Display"
    ],
    "label-md": [
      "Plus Jakarta Sans"
    ],
    "display-lg": [
      "Playfair Display"
    ],
    "display-sm": [
      "Playfair Display"
    ],
    "label-sm": [
      "Plus Jakarta Sans"
    ],
    "headline-xl": [
      "Playfair Display"
    ],
    "display-lg-mobile": [
      "Playfair Display"
    ],
    "headline-xl-mobile": [
      "Playfair Display"
    ],
    "headline-md": [
      "Playfair Display"
    ],
    "body-md": [
      "Plus Jakarta Sans"
    ]
  },
  "fontSize": {
    "body-lg": [
      "16px",
      {
        "lineHeight": "26px",
        "fontWeight": "400"
      }
    ],
    "title-md": [
      "18px",
      {
        "lineHeight": "26px",
        "fontWeight": "600"
      }
    ],
    "body-sm": [
      "13px",
      {
        "lineHeight": "18px",
        "fontWeight": "400"
      }
    ],
    "headline-lg": [
      "26px",
      {
        "lineHeight": "34px",
        "fontWeight": "500"
      }
    ],
    "label-md": [
      "12px",
      {
        "lineHeight": "16px",
        "letterSpacing": "0.06em",
        "fontWeight": "600"
      }
    ],
    "display-lg": [
      "56px",
      {
        "lineHeight": "64px",
        "letterSpacing": "-0.02em",
        "fontWeight": "600"
      }
    ],
    "display-sm": [
      "40px",
      {
        "lineHeight": "48px",
        "letterSpacing": "-0.01em",
        "fontWeight": "600"
      }
    ],
    "label-sm": [
      "11px",
      {
        "lineHeight": "14px",
        "letterSpacing": "0.08em",
        "fontWeight": "600"
      }
    ],
    "headline-xl": [
      "32px",
      {
        "lineHeight": "40px",
        "fontWeight": "600"
      }
    ],
    "display-lg-mobile": [
      "36px",
      {
        "lineHeight": "44px",
        "letterSpacing": "-0.01em",
        "fontWeight": "600"
      }
    ],
    "headline-xl-mobile": [
      "28px",
      {
        "lineHeight": "36px",
        "fontWeight": "600"
      }
    ],
    "headline-md": [
      "20px",
      {
        "lineHeight": "28px",
        "fontWeight": "600"
      }
    ],
    "body-md": [
      "14px",
      {
        "lineHeight": "22px",
        "fontWeight": "400"
      }
    ]
  }
}
  }
};
