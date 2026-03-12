import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { join, dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')

const data = JSON.parse(
  readFileSync(join(root, 'src/shared/tokens/tokens.json'), 'utf-8')
)

const prim = data['0️⃣ Primitive/Mode 1'].primitive
const colorSem = data['🎨 Color Semantic/light'].semantic
const comp = data['🟣 Component/light']
const desktop = data['🖥️ Responsive Semantic/desktop'].semantic
const tablet = data['🖥️ Responsive Semantic/tablet'].semantic
const mobile = data['🖥️ Responsive Semantic/mobile'].semantic

// ── Helpers ───────────────────────────────────────────────────────────────────

/** {primitive.x.y.z} 참조를 재귀적으로 해석 */
function resolve(val) {
  if (typeof val !== 'string' || !val.startsWith('{')) return val
  const parts = val.slice(1, -1).split('.')
  let cur = { primitive: prim }
  for (const p of parts) {
    cur = cur?.[p]
    if (cur == null) return val
  }
  const inner = typeof cur === 'object' && 'value' in cur ? cur.value : cur
  return resolve(inner)
}

/** camelCase → kebab-case */
function kebab(s) {
  return s.replace(/([A-Z])/g, (_, c) => `-${c.toLowerCase()}`)
}

/** 숫자값을 px 문자열로 변환 (참조 해석 포함) */
function px(val) {
  const r = resolve(val)
  return typeof r === 'number' ? `${r}px` : r
}

/** Figma font weight 이름 → CSS 숫자값 */
const WEIGHT_MAP = {
  Thin: 100,
  ExtraLight: 200,
  Light: 300,
  Regular: 400,
  Medium: 500,
  SemiBold: 600,
  Bold: 700,
  ExtraBold: 800,
  Black: 900,
}

function fontWeight(val) {
  const r = resolve(val)
  return WEIGHT_MAP[r] ?? r
}

/** 토큰 객체를 [cssKeySuffix, rawValue] 배열로 평탄화 */
function flatten(obj, prefix = '') {
  const result = []
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}-${kebab(k)}` : kebab(k)
    if (v && typeof v === 'object' && 'value' in v) {
      result.push([key, v.value])
    } else if (v && typeof v === 'object') {
      result.push(...flatten(v, key))
    }
  }
  return result
}

// ── Generators ────────────────────────────────────────────────────────────────

function genColors() {
  return flatten(colorSem.color)
    .map(([k, v]) => `  --color-${k}: ${resolve(v)};`)
    .join('\n')
}

function genComponent() {
  return flatten(comp.button, 'button')
    .map(([k, v]) => `  --comp-${k}: ${resolve(v)};`)
    .join('\n')
}

function genNamedSpacing(sem) {
  return Object.entries(sem.breakpoint.spacing)
    .map(([k, v]) => `  --spacing-${k}: ${px(v.value)};`)
    .join('\n')
}

function genUnitSpacing() {
  return Object.entries(desktop.spacing)
    .map(([k, v]) => `  --spacing-${k}: ${px(v.value)};`)
    .join('\n')
}

function genTypography() {
  const typo = desktop.typo
  const lines = []

  // Font families
  for (const [k, v] of Object.entries(typo.typeface)) {
    lines.push(`  --font-${k}: "${resolve(v.value)}";`)
  }

  // Font weights
  for (const [cat, variants] of Object.entries(typo.weight)) {
    for (const [variant, v] of Object.entries(variants)) {
      lines.push(`  --font-weight-${cat}-${variant}: ${fontWeight(v.value)};`)
    }
  }

  // Font sizes
  for (const [cat, variants] of Object.entries(typo.size)) {
    for (const [variant, v] of Object.entries(variants)) {
      lines.push(`  --text-${cat}-${variant}: ${px(v.value)};`)
    }
  }

  // Line heights
  for (const [cat, variants] of Object.entries(typo.lineHeight)) {
    for (const [variant, v] of Object.entries(variants)) {
      lines.push(`  --leading-${cat}-${variant}: ${px(v.value)};`)
    }
  }

  return lines.join('\n')
}

function genRadius() {
  return Object.entries(desktop.radius)
    .map(([k, v]) => `  --radius-${k}: ${px(v.value)};`)
    .join('\n')
}

function genOpacity() {
  return Object.entries(desktop.opacity)
    .map(([k, v]) => {
      const raw = resolve(v.value)
      const decimal = typeof raw === 'number' ? raw / 100 : raw
      return `  --opacity-${k}: ${decimal};`
    })
    .join('\n')
}

function genBreakpoints() {
  // tokens에서 min 값을 읽고, 없으면 디자인 합의값으로 폴백
  function readMin(sem, fallback) {
    try {
      const min = sem.breakpoint.min
      if (min?.value != null) return px(min.value)
    } catch {}
    return fallback
  }

  return [
    `  --breakpoint-desktop: ${readMin(desktop, '1024px')};`,
    `  --breakpoint-tablet: ${readMin(tablet, '768px')};`,
    `  --breakpoint-mobile: ${readMin(mobile, '375px')};`,
  ].join('\n')
}

function genResponsiveSpacing() {
  const tabVars = Object.entries(tablet.breakpoint.spacing)
    .map(([k, v]) => `    --spacing-${k}: ${px(v.value)};`)
    .join('\n')

  const mobVars = Object.entries(mobile.breakpoint.spacing)
    .map(([k, v]) => `    --spacing-${k}: ${px(v.value)};`)
    .join('\n')

  return `/* === Responsive Spacing — Tablet (768px ~ 1023px) === */
@media (min-width: 768px) and (max-width: 1023px) {
  :root {
${tabVars}
  }
}

/* === Responsive Spacing — Mobile (max 767px) === */
@media (max-width: 767px) {
  :root {
${mobVars}
  }
}`
}

// ── Assemble ──────────────────────────────────────────────────────────────────

const css = `@import 'tailwindcss';

@theme {

  /* === Semantic Colors === */
${genColors()}


  /* === Component Tokens === */
${genComponent()}


  /* === Spacing — Named (Desktop default) === */
${genNamedSpacing(desktop)}


  /* === Spacing — Unit Scale === */
${genUnitSpacing()}


  /* === Typography === */
${genTypography()}


  /* === Border Radius === */
${genRadius()}


  /* === Opacity === */
${genOpacity()}


  /* === Breakpoints === */
${genBreakpoints()}
}

${genResponsiveSpacing()}
`

const outPath = join(root, 'src/app/styles/globals.css')
writeFileSync(outPath, css, 'utf-8')
console.log('✅ globals.css 생성 완료')
