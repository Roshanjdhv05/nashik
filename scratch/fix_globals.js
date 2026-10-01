const fs = require('fs');

let css = fs.readFileSync('c:/Users/241031/Desktop/nashik/src/app/globals.css', 'utf8');

css = css.replace('@layer base {\n  :root {', `@theme {
  --font-display-lg: "Playfair Display", serif;
  --font-headline-md: "Playfair Display", serif;
  --font-body-md: "Plus Jakarta Sans", sans-serif;
  --font-display-lg-mobile: "Playfair Display", serif;
  --font-label-sm: "Plus Jakarta Sans", sans-serif;
  --font-headline-xl-mobile: "Playfair Display", serif;
  --font-title-md: "Plus Jakarta Sans", sans-serif;
  --font-headline-xl: "Playfair Display", serif;
  --font-headline-lg: "Playfair Display", serif;
  --font-display-sm: "Playfair Display", serif;
  --font-body-sm: "Plus Jakarta Sans", sans-serif;
  --font-body-lg: "Plus Jakarta Sans", sans-serif;
  --font-label-md: "Plus Jakarta Sans", sans-serif;
`);

css = css.replace('  }\n\n  html, body', `}

@layer base {
  html, body`);

fs.writeFileSync('c:/Users/241031/Desktop/nashik/src/app/globals.css', css);
console.log('Done modifying globals.css');
