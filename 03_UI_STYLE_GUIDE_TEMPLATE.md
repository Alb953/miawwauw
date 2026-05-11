# 03 UI Style Guide Based on `template.png`

Use `assets/template.png` as the visual source of truth.

## Visual direction

The UI should feel like a warm pet adoption homepage:

- Clean white background.
- Soft beige/cream hero area.
- Friendly pet photography.
- Rounded cards.
- Teal as the primary brand color.
- Orange/coral as the secondary action color.
- Dark elegant heading typography.
- Clear visual priority for featured and urgent pets.

## Brand name

Use:

**Adopta Miauw Wau**

Visual treatment:

- `Adopta` in teal.
- `Miauw Wau` in orange/teal accents.
- Pet paw or heart icon can appear next to logo.

## Suggested color tokens

Use CSS variables in `globals.css` or Tailwind theme.

```css
:root {
  --color-bg: #ffffff;
  --color-bg-soft: #fff7ef;
  --color-bg-cream: #f8efe5;
  --color-primary: #008f8c;
  --color-primary-dark: #006c6a;
  --color-primary-soft: #e6f7f6;
  --color-secondary: #ff6b3d;
  --color-secondary-dark: #e4542c;
  --color-secondary-soft: #fff0e9;
  --color-text: #23111f;
  --color-muted: #6f6b72;
  --color-border: #e9e2dc;
  --color-card: #ffffff;
  --color-success: #14a06f;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
}
```

## Typography

Recommended:

- Headings: elegant serif or display font feel.
- Body: clean sans-serif.

Implementation options:

- Use `next/font/google`.
- Suggested heading font: `Playfair Display` or `Lora`.
- Suggested body font: `Inter`, `Nunito Sans`, or `Poppins`.

Style rules:

- Hero title must be large, dark, and expressive.
- Body text should be readable and calm.
- Buttons should use medium/bold weight.

## Layout style

- Max content width around `1200px`.
- Header: white, horizontal nav, logo left, links centered, auth buttons right.
- Hero: large pet image or image background on the right; text on the left.
- Search panel: floating white card overlapping hero/listing area.
- Cards: rounded corners, subtle border, soft shadow.
- Footer: clean, multi-column, with brand block and links.

## Header Spanish text

Use:

- Inicio
- Mascotas
- Cómo funciona
- Apoyar
- Iniciar sesión
- Registrarme

## Hero Spanish copy

Main title:

> Encuentra a tu nuevo mejor amigo

Subtitle option:

> Abre tu corazón y tu hogar a una mascota que lo necesita. Perritos y gatitos esperan una familia llena de amor.

Primary button:

> Adoptar una mascota

Secondary button:

> Registrar una mascota

## Search bar Spanish labels

- Especie
- Todas las especies
- Edad
- Todas las edades
- Ubicación
- Todas las ubicaciones
- Buscar

## Pet cards

Card content:

- Photo at top.
- Badge for `Destacado`.
- Badge for `Urgente`.
- Name in bold.
- Species, age, gender, location.
- Primary action: `Ver detalles`.

Spanish species labels:

- Dog → Perrito
- Cat → Gatito

Spanish status labels:

- available → Disponible
- in_process → En proceso
- adopted → Adoptado

## Featured pets section

Title:

> Mascotas destacadas

Link:

> Ver todas

## Urgent cases section

Title:

> Casos urgentes

Link:

> Ver casos urgentes

Urgent note:

> Necesita hogar pronto

## How adoption works section

Title:

> ¿Cómo funciona la adopción?

Steps:

1. `Explora` — Encuentra mascotas cerca de ti y revisa cuál puede ser tu compañera ideal.
2. `Postúlate` — Envía una solicitud para que el rescatista conozca mejor tu hogar.
3. `Conoce` — Habla con el rescatista y empieza una nueva historia juntos.

## Support card

Title:

> Apoya la plataforma

Text:

> Tu apoyo voluntario nos ayuda a mantener la plataforma, dar visibilidad a más mascotas y conectar familias responsables.

Button:

> Apoyar ahora

Disclaimer:

> Esta contribución no es deducible de impuestos.

## Button styles

Primary button:

- Teal background.
- White text.
- Rounded corners.
- Slight shadow.

Secondary button:

- White or transparent background.
- Orange border.
- Orange text.

Danger/urgent button:

- Orange/coral background.
- White text.

## Responsive behavior

Desktop:

- Header nav visible.
- Hero text and image side-by-side.
- Pet cards in 3–4 columns.
- How-it-works next to urgent/featured sections where appropriate.

Mobile:

- Stack hero content.
- Search card becomes vertical.
- Pet cards become 1 column.
- Header can use a simple mobile menu.
