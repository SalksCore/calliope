import { asset } from "./asset";
import { blocks, endsWithWord, fileName, kicker, metaLines, titleOf } from "./blocks";
import type { Fiche } from "./fiche";
import { TEMPLATES, type TemplateKey } from "./templates";

/* Polices embarquées dans le PDF (sous-ensembles latins, SIL OFL 1.1). */
const FONT_FILES = {
  "jak-normal": "jakarta-400.ttf",
  "jak-bold": "jakarta-700.ttf",
  "mono-normal": "jetbrains-mono-400.ttf",
  "serif-normal": "source-serif-400.ttf",
  "serif-italic": "source-serif-400-italic.ttf",
  "serif-bold": "source-serif-700.ttf",
} as const;

let fontCache: Record<string, string> | null = null;
async function loadFonts() {
  if (fontCache) return fontCache;
  const entries = await Promise.all(
    Object.entries(FONT_FILES).map(async ([key, file]) => {
      const res = await fetch(asset(`/pdf-fonts/${file}`));
      if (!res.ok) throw new Error(`Police introuvable : ${file}`);
      const bytes = new Uint8Array(await res.arrayBuffer());
      let bin = "";
      for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      return [key, btoa(bin)] as const;
    }),
  );
  fontCache = Object.fromEntries(entries);
  return fontCache;
}

type RGB = [number, number, number];
const GREY: RGB = [106, 100, 114];
const INK: RGB = [26, 23, 28];

export async function ficheToPDF(f: Fiche, key: TemplateKey) {
  const T = TEMPLATES[key];
  const [{ jsPDF }, fonts] = await Promise.all([import("jspdf"), loadFonts()]);
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const reg = (k: keyof typeof FONT_FILES, fam: string, st: string) => {
    doc.addFileToVFS(`${k}.ttf`, fonts[k]);
    doc.addFont(`${k}.ttf`, fam, st);
  };
  reg("jak-normal", "jak", "normal"); reg("jak-bold", "jak", "bold"); reg("mono-normal", "mono", "normal");
  reg("serif-normal", "serif", "normal"); reg("serif-italic", "serif", "italic"); reg("serif-bold", "serif", "bold");

  const text = T.family === "serif" ? "serif" : "jak";
  const W = 210, H = 297, M = 18, CW = W - 2 * M, base = T.size, g = T.gap;
  const lh = base * 0.42 * 1.36;
  let y = M;
  const need = (h: number) => { if (y + h > H - 16) { doc.addPage(); y = M; } };
  const set = (fam: string, st: string, size: number, c: RGB = INK) => { doc.setFont(fam, st); doc.setFontSize(size); doc.setTextColor(...c); };
  const split = (s: string, w: number): string[] => doc.splitTextToSize(s, w);
  const write = (arr: string[], x: number, h: number) => { for (const ln of arr) { need(h); doc.text(ln, x, y + h * 0.75); y += h; } };
  const label = (s: string, x: number) => {
    if (T.label === "mono") { set("mono", "normal", 7, T.accent); doc.setCharSpace(0.5); doc.text(s.toUpperCase(), x, y + 3); doc.setCharSpace(0); }
    else { set("serif", "bold", 8.5, T.accent); doc.text(s, x, y + 3); }
  };

  // En-tête
  const hasPhoto = f.mode === "dissert" && !!f.photo;
  const pw = 34;
  const ph = hasPhoto ? Math.min(52, pw * ((f.photoH || 3) / (f.photoW || 2))) : 0;
  const textW = hasPhoto ? CW - pw - 8 : CW;
  if (T.band) { doc.setFillColor(...T.bar); doc.rect(0, 0, W, 3.2, "F"); }
  label(kicker(f), M); y += 7.5;
  set(text, "bold", base + 12);
  const title = split(titleOf(f), textW);
  for (const ln of title) { doc.text(ln, M, y + 7.4); y += 9; }
  if (T.band && endsWithWord(titleOf(f))) {
    doc.setFillColor(...T.bar); doc.circle(M + doc.getTextWidth(title[title.length - 1]) + 2.2, y - 2.2, 1.3, "F");
  }
  y += 1.5;
  set(text, "normal", base - 0.5, GREY);
  for (const ml of metaLines(f)) for (const ln of split(ml, textW)) { doc.text(ln, M, y + 4); y += lh; }
  const headBottom = Math.max(y + 3, hasPhoto ? M + ph + 2 : 0);
  if (hasPhoto && f.mode === "dissert") {
    try {
      doc.addImage(f.photo, "JPEG", W - M - pw, M, pw, ph);
      doc.setDrawColor(211, 204, 216); doc.setLineWidth(0.2); doc.rect(W - M - pw, M, pw, ph);
    } catch { /* image illisible : on l'ignore */ }
  }
  y = headBottom;
  doc.setDrawColor(...T.bar); doc.setLineWidth(0.7); doc.line(M, y, W - M, y); y += 7 * g;

  for (const b of blocks(f)) {
    if (b.t === "h") {
      need(16); y += 2.5 * g;
      set(text, "bold", base + 4.5); doc.text(b.text, M, y + 5.5);
      if (T.band) { doc.setFillColor(...T.bar); doc.circle(M + doc.getTextWidth(b.text) + 1.6, y + 5.1, 0.9, "F"); }
      y += 8; doc.setDrawColor(...T.bar); doc.setLineWidth(0.4); doc.line(M, y, M + 12, y); y += 4.5 * g;
    } else if (b.t === "h2") {
      need(12); y += 1.5 * g; set(text, "bold", base + 1.2);
      write(split(b.text, CW - (b.note ? 30 : 0)), M, lh * 1.05);
      if (b.note) { set("mono", "normal", base - 2.5, GREY); doc.text(b.note, W - M, y - lh * 0.3, { align: "right" }); }
      y += 2 * g;
    } else if (b.t === "quote") {
      set("serif", "italic", base + 0.8);
      const ll = split(`« ${b.text} »`, CW - 9);
      const qh = ll.length * lh + 4.5 + (b.ref ? lh : 0);
      need(Math.min(qh, 60));
      if (!T.outline) { doc.setFillColor(...T.highlight); doc.rect(M, y, CW, qh, "F"); }
      doc.setFillColor(...T.bar); doc.rect(M, y, 1.1, qh, "F");
      y += 2.2; write(ll, M + 5.5, lh);
      if (b.ref) { set("mono", "normal", base - 2.5, GREY); write([b.ref], M + 5.5, lh); }
      y += 2.3 + 2 * g;
    } else if (b.t === "box") {
      set(text, "bold", base + 0.5);
      const ll = split(b.text, CW - 11);
      const bh = ll.length * lh + 10;
      need(bh);
      doc.setDrawColor(...T.bar); doc.setLineWidth(0.45); doc.roundedRect(M, y, CW, bh, 1.8, 1.8);
      const y0 = y; y += 1.6; label(b.label, M + 5.5); y = y0 + 7;
      set(text, "bold", base + 0.5); write(ll, M + 5.5, lh); y = y0 + bh + 4 * g;
    } else if (b.t === "p") {
      if (b.label) { need(lh * 2); label(b.label, M); y += 4.6; }
      set(text, "normal", base);
      for (const para of b.text.split("\n")) {
        if (!para.trim()) { y += lh * 0.5; continue; }
        write(split(para, CW), M, lh); y += 0.8 * g;
      }
      y += 2.5 * g;
    } else {
      y += 2 * g;
    }
  }

  const n = doc.getNumberOfPages();
  for (let i = 1; i <= n; i++) {
    doc.setPage(i); set("mono", "normal", 7, [151, 145, 158]);
    doc.text(titleOf(f).slice(0, 70), M, H - 9);
    doc.text(`CALLIOPE · ${i}/${n}`, W - M, H - 9, { align: "right" });
  }
  return { filename: fileName(f, "pdf"), blob: doc.output("blob") };
}
