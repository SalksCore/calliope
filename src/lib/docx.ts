import { blocks, endsWithWord, fileName, kicker, metaLines, titleOf } from "./blocks";
import type { Fiche } from "./fiche";
import { TEMPLATES, hex, type TemplateKey } from "./templates";

export async function ficheToDOCX(f: Fiche, key: TemplateKey) {
  const T = TEMPLATES[key];
  const D = await import("docx");
  const acc = hex(T.accent), bar = hex(T.bar), hl = hex(T.highlight);
  const sz = Math.round(T.size * 2), font = T.docFont, gap = T.gap;

  type RunOpts = { font?: string; size?: number; bold?: boolean; italics?: boolean; color?: string; cs?: number };
  const run = (text: string, o: RunOpts = {}) =>
    new D.TextRun({ text, font: o.font || font, size: o.size || sz, bold: o.bold, italics: o.italics, color: o.color, characterSpacing: o.cs });
  const lines = (text: string, o?: RunOpts) =>
    text.split("\n").flatMap((l, i) => (i ? [new D.TextRun({ text: "", break: 1 }), run(l, o)] : [run(l, o)]));
  const lab = (txt: string) =>
    T.label === "mono"
      ? run(txt.toUpperCase(), { font: "Consolas", size: 14, color: acc, cs: 16 })
      : run(txt, { size: sz - 3, bold: true, color: acc });
  const dot = (size: number, s: string) => (T.band && endsWithWord(s) ? [run(".", { size, bold: true, color: bar })] : []);

  const children: (InstanceType<typeof D.Paragraph> | InstanceType<typeof D.Table>)[] = [];
  const head = [
    new D.Paragraph({ spacing: { after: 80 }, children: [lab(kicker(f))] }),
    new D.Paragraph({ spacing: { after: 120 }, children: [run(titleOf(f), { size: sz + 24, bold: true }), ...dot(sz + 24, titleOf(f))] }),
    ...metaLines(f).map((m) => new D.Paragraph({ spacing: { after: 30 }, children: [run(m, { color: "6A6472", size: sz - 1 })] })),
  ];

  if (f.mode === "dissert" && f.photo) {
    const bin = atob(f.photo.split(",")[1]);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const w = 120, h = Math.round(w * ((f.photoH || 3) / (f.photoW || 2)));
    const none = { style: D.BorderStyle.NONE, size: 0, color: "FFFFFF" };
    const borders = { top: none, bottom: none, left: none, right: none };
    children.push(new D.Table({
      width: { size: 100, type: D.WidthType.PERCENTAGE },
      borders: { ...borders, insideHorizontal: none, insideVertical: none },
      rows: [new D.TableRow({ children: [
        new D.TableCell({ borders, width: { size: 75, type: D.WidthType.PERCENTAGE }, children: head }),
        new D.TableCell({ borders, width: { size: 25, type: D.WidthType.PERCENTAGE }, children: [
          new D.Paragraph({ alignment: D.AlignmentType.RIGHT, children: [new D.ImageRun({ data: bytes, transformation: { width: w, height: h } })] }),
        ] }),
      ] })],
    }));
  } else children.push(...head);
  children.push(new D.Paragraph({ spacing: { after: 220 }, border: { bottom: { style: D.BorderStyle.SINGLE, size: 14, color: bar, space: 4 } }, children: [] }));

  for (const b of blocks(f)) {
    if (b.t === "h") {
      children.push(new D.Paragraph({ keepNext: true, spacing: { before: 300 * gap, after: 120 }, children: [run(b.text, { size: sz + 9, bold: true }), ...dot(sz + 9, b.text)] }));
    } else if (b.t === "h2") {
      children.push(new D.Paragraph({ keepNext: true, spacing: { before: 200 * gap, after: 80 }, children: [
        run(b.text, { size: sz + 3, bold: true }), ...(b.note ? [run("   " + b.note, { font: "Consolas", color: "6A6472", size: sz - 4 })] : []),
      ] }));
    } else if (b.t === "quote") {
      const q = {
        indent: { left: 200 },
        border: { left: { style: D.BorderStyle.SINGLE, size: 18, color: bar, space: 8 } },
        ...(T.outline ? {} : { shading: { type: D.ShadingType.CLEAR, fill: hl, color: "auto" } }),
      };
      children.push(new D.Paragraph({ ...q, keepNext: !!b.ref, spacing: { before: 60, after: b.ref ? 0 : 80 }, children: [run(`« ${b.text} »`, { italics: true, font: "Georgia", size: sz + 2 })] }));
      if (b.ref) children.push(new D.Paragraph({ ...q, spacing: { after: 80 }, children: [run(b.ref, { font: "Consolas", color: "6A6472", size: sz - 4 })] }));
    } else if (b.t === "box") {
      const bd = { style: D.BorderStyle.SINGLE, size: 8, color: bar, space: 6 };
      children.push(new D.Paragraph({ keepNext: true, spacing: { before: 140 }, border: { top: bd, left: bd, right: bd }, indent: { left: 140, right: 140 }, children: [lab(b.label)] }));
      children.push(new D.Paragraph({ spacing: { after: 180 }, border: { bottom: bd, left: bd, right: bd }, indent: { left: 140, right: 140 }, children: lines(b.text, { bold: true }) }));
    } else if (b.t === "p") {
      if (b.label) children.push(new D.Paragraph({ keepNext: true, spacing: { before: 80 * gap, after: 30 }, children: [lab(b.label)] }));
      children.push(new D.Paragraph({ spacing: { after: 140 * gap, line: 300 }, children: lines(b.text) }));
    } else {
      children.push(new D.Paragraph({ spacing: { after: 60 * gap }, children: [] }));
    }
  }

  const doc = new D.Document({
    creator: "Calliope",
    title: titleOf(f),
    styles: { default: { document: { run: { font, size: sz } } } },
    sections: [{
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1050, right: 1050 } } },
      footers: {
        default: new D.Footer({ children: [new D.Paragraph({ alignment: D.AlignmentType.RIGHT, children: [
          run(`${titleOf(f)}  ·  CALLIOPE  ·  `, { font: "Consolas", size: 14, color: "97919E" }),
          new D.TextRun({ children: [D.PageNumber.CURRENT], size: 14, color: "97919E", font: "Consolas" }),
        ] })] }),
      },
      children,
    }],
  });
  return { filename: fileName(f, "docx"), blob: await D.Packer.toBlob(doc) };
}
