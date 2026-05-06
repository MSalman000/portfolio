# Muhammad Salman — Portfolio

Editorial-style personal portfolio. Cream paper ground, Instrument Serif
display type, JetBrains Mono for technical detail, and a single
Three.js sculpture rendered with a custom Perlin-displacement shader.

Built with **Astro 4** and **Three.js**.

---

## Stack

- **Astro 4** — static site framework, ships almost zero JS
- **Three.js (r160)** — single sculptural mesh, custom GLSL vertex + fragment shader
- **Vanilla CSS** — design tokens via custom properties, no Tailwind
- **Inter / Instrument Serif / JetBrains Mono** — loaded from Google Fonts

The 3D scene uses a 2-octave classic Perlin noise (Stefan Gustavson, public
domain) for vertex displacement, fresnel-based rim lighting, and an
ink/plum/copper palette that reads on the cream ground without competing
with the type. Mouse position warps the sphere via a uniform; camera also
follows the cursor with smooth lerp damping.

---

## Project structure

```
portfolio/
├── astro.config.mjs
├── package.json
├── public/                      # favicon, resume.pdf (you add these)
├── README.md
└── src/
    ├── components/
    │   ├── Masthead.astro       # top-corner editorial masthead
    │   ├── Hero.astro           # name + 3-pillar statement
    │   ├── Works.astro          # § I — index of works (driven by data)
    │   ├── Practice.astro       # § II — bio + skills definition list
    │   ├── Correspondence.astro # § III — contact
    │   └── Colophon.astro       # footer
    ├── data/
    │   └── projects.js          # SINGLE SOURCE OF TRUTH for projects
    ├── layouts/
    │   └── Base.astro           # html shell + three.js mount + reveal init
    ├── pages/
    │   └── index.astro          # composes all sections
    ├── scripts/
    │   ├── scene.js             # Three.js scene + shaders
    │   └── reveal.js            # IntersectionObserver fade-in
    └── styles/
        └── global.css           # design tokens + all component styles
```

---

## Quick start

Requirements: **Node.js 18.17+** or **20.3+**.

```bash
# install
npm install

# dev — http://localhost:4321
npm run dev

# production build → ./dist
npm run build

# preview the production build
npm run preview
```

---

## Customizing

### Adding or editing a project
Open `src/data/projects.js`. Each project is one object with this shape:

```js
{
  num: '05',
  year: '2026',
  title: 'Project Name',
  category: 'CATEGORY IN CAPS',
  description: 'One paragraph, 3–4 sentences.',
  detail: [
    { key: 'Architecture', val: 'Architecture description. Use <code>InlineCode</code> for type-set names.' },
    { key: 'Notable',      val: 'What makes this notable · separated by middle dots' },
  ],
  stack: 'Tech · Stack · Separated · By · Middle · Dots',
  href: 'https://github.com/you/repo',  // or null for closed
  status: 'open',                       // 'open' | 'closed'
}
```

The `Works.astro` component renders all entries in order. Update the
`section-meta` text in `Works.astro` if you change the engagement count.

### Editing copy
Each section is one `.astro` file in `src/components/`. Plain HTML with
optional TypeScript frontmatter — edit them directly. The serif/mono/sans
type roles are already wired up in `global.css`.

### Adjusting the 3D sculpture
Everything lives in `src/scripts/scene.js`:
- Geometry: change `IcosahedronGeometry(2.6, 80)` for a different size or
  detail level. Try `OctahedronGeometry`, `DodecahedronGeometry`, or
  `TorusKnotGeometry` for entirely different forms.
- Palette: the three colors `deep`, `mid`, `rim` in the fragment shader.
  Current palette is ink-black → dusty plum → warm copper.
- Position: `ico.position.set(5.5, 1.0, 0)` — move it if you want the
  sculpture more or less centered.
- Speed: `t * 0.04` and `t * 0.07` rotation rates in `animate()`.

### Theme colors
All design tokens are CSS custom properties at the top of `global.css`.
The two key ones are `--paper` (#f4f1ea) and `--ink` (#1a1a1a). Change
those and the rest of the system follows.

### Adding a resume download
Drop your CV at `public/resume.pdf`, then add a button in `Hero.astro`:

```astro
<a href="/resume.pdf" download class="cta">— download résumé</a>
```
(You'll want to add a small style for `.cta` in `global.css`.)

---

## Deploying

### Cloudflare Pages (recommended — free, fast, edge)
1. Push to GitHub
2. Cloudflare Dashboard → Pages → Create → Connect Git
3. Build command: `npm run build`
4. Output directory: `dist`
5. Done

### Vercel
```bash
npx vercel
```
Auto-detects Astro.

### Netlify
```bash
npx netlify deploy --prod --dir=dist
```

---

## Performance notes

- Three.js scene runs at ~60fps on modern hardware. Single mesh, single
  ring, three lights, no post-processing.
- Animation pauses when the tab is hidden (`visibilitychange` listener).
- DPR is capped at 2 to avoid retina overdraw on phones.
- Astro ships ~0 JS for the static markup; only the scene + reveal scripts
  load.
- Production build is well under 200KB total (excluding fonts and the
  three.js bundle, which is split out by Astro's bundler).

---

## License

Personal project. Fork it as a template if you like, but please replace
the content (name, projects, contact info) with your own before deploying.
