import fs from 'node:fs';
import path from 'node:path';

export type Level = { key: string; label: string; range: string; interpretation: string };
export type Exam = {
  slug: string; name: string; area: string; kind: 'func' | 'cat';
  sample?: string; method?: string; prep?: string; delivery?: string; container?: string; purpose?: string;
  conditions?: string; prereq?: string; docs?: string; code?: string; cups?: string; synonyms?: string[];
  description?: string; importance?: { items: string[]; note?: string }; convRange?: string; convText?: string; funcText?: string;
  levels?: Level[]; related?: string[]; note?: string; refs?: string[]; factors?: string[]; fullName?: string;
};
const slugify = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
const smallWords = new Set(['de', 'del', 'la', 'las', 'los', 'el', 'en', 'y', 'o', 'a', 'por', 'con', 'para', 'sin', 'al', 'e', 'u']);
const ACR = new Set(['hplc','pcr','dna','rna','adn','arn','igg','igm','iga','ige','ii','iii','iv','vih','vdrl','fish','hla','tsh','psa','cea','hcg','ldl','hdl','vldl','hba1c','tac','ana','anca','cmv','vhb','vhc','ebv','hpv','ca','gh','acth','lh','fsh','ft3','ft4','t3','t4','atp','coa','cups','ph','tp','ptt','inr','vsg','pcr','abo','rh','g6pd','nt','bnp','hs','ck','mb','ldh','got','gpt','ggt','alt','ast','mthfr','jak2','bcr','abl','ntprobnp','crp','tgf','ctx','pth','dhea','hgh','igf','sars','cov','covid','epstein','pm','scl','sm','rnp','ssa','ssb','jo','mpo','pr3','gbm','tpo','trab','cd3','cd4','cd8','cd19','cd20','cd34','cd45']);
const ACC: Record<string,string> = {acido:'ácido',acida:'ácida',aminoacidos:'aminoácidos',aminoacido:'aminoácido',urico:'úrico',gamma:'gamma',orina:'orina',cuantitativo:'cuantitativo',qualitativo:'cualitativo',hemoglobina:'hemoglobina',glicosilada:'glicosilada',glucosa:'glucosa',deshidrogenasa:'deshidrogenasa',electroforesis:'electroforesis',proteinas:'proteínas',proteina:'proteína',tiroides:'tiroides',coagulacion:'coagulación',agregacion:'agregación',plaquetaria:'plaquetaria',inmunofijacion:'inmunofijación',inmunoglobulinas:'inmunoglobulinas',hormona:'hormona',hormonas:'hormonas',folico:'fólico',pancreatica:'pancreática',carbonico:'carbónico',organicos:'orgánicos',organico:'orgánico',cetonicos:'cetónicos',oxalico:'oxálico',citrico:'cítrico',lactico:'láctico',piruvico:'pirúvico',valproico:'valproico',fosforo:'fósforo',calcio:'calcio',magnesio:'magnesio',potasio:'potasio',creatinina:'creatinina',depuracion:'depuración',citologia:'citología',biopsia:'biopsia',cromosomico:'cromosómico',cariotipo:'cariotipo',molecular:'molecular',genetico:'genético',genetica:'genética',analisis:'análisis',serologia:'serología',microbiologia:'microbiología',hematologia:'hematología',quimica:'química',toxicologia:'toxicología',bacteriologico:'bacteriológico',cultivo:'cultivo',parasitologico:'parasitológico',antigeno:'antígeno',anticuerpos:'anticuerpos',cuantificacion:'cuantificación',determinacion:'determinación',deteccion:'detección',identificacion:'identificación',prueba:'prueba',medicion:'medición',tamizacion:'tamización',tension:'tensión',presion:'presión',curva:'curva',tolerancia:'tolerancia',insulina:'insulina',pediatrico:'pediátrico',pediatrica:'pediátrica',sanguineo:'sanguíneo',sanguinea:'sanguínea',urinario:'urinario',fecal:'fecal',liquido:'líquido',cefalorraquideo:'cefalorraquídeo',sinovial:'sinovial',pleural:'pleural',ascitico:'ascítico',seminal:'seminal',espermiograma:'espermiograma',vitamina:'vitamina',hierro:'hierro',ferritina:'ferritina',transferrina:'transferrina',saturacion:'saturación',capacidad:'capacidad',fijacion:'fijación',trigliceridos:'triglicéridos',colesterol:'colesterol',lipidos:'lípidos',lipoproteina:'lipoproteína',apolipoproteina:'apolipoproteína',homocisteina:'homocisteína',fibrinogeno:'fibrinógeno',trombina:'trombina',tiempo:'tiempo',protrombina:'protrombina',tromboplastina:'tromboplastina',parcial:'parcial',activada:'activada',dimero:'dímero',bilirrubina:'bilirrubina',amilasa:'amilasa',lipasa:'lipasa',fosfatasa:'fosfatasa',alcalina:'alcalina',transaminasa:'transaminasa',piruvica:'pirúvica',oxalacetica:'oxalacética',glutamica:'glutámica',microalbuminuria:'microalbuminuria',electrolitos:'electrolitos',cloro:'cloro',sodio:'sodio',zinc:'zinc',cobre:'cobre',selenio:'selenio',plomo:'plomo',mercurio:'mercurio',arsenico:'arsénico',cadmio:'cadmio',cromo:'cromo',niquel:'níquel',aluminio:'aluminio',litio:'litio',cafeina:'cafeína',nicotina:'nicotina',cotinina:'cotinina',cocaina:'cocaína',marihuana:'marihuana',opiaceos:'opiáceos',barbituricos:'barbitúricos',benzodiacepinas:'benzodiacepinas',anfetaminas:'anfetaminas',metanfetaminas:'metanfetaminas',etanol:'etanol',alcohol:'alcohol',metanol:'metanol'};
const titleCase = (s: string) => {
  const letters = s.replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñ]/g, '');
  const up = letters.replace(/[^A-ZÁÉÍÓÚÑ]/g, '').length;
  if (!letters || up / letters.length < 0.45) return s;
  return s.toLowerCase().replace(/[a-z0-9ñáéíóú]+/g, (w, off: number) => {
    if (ACR.has(w) || /^[a-z]\d+[a-z]?$/.test(w) || (/^[ivx]+$/.test(w) && w.length > 1) || /^[a-z]{1,2}\d+$/.test(w)) return w.toUpperCase();
    if (w === 'ig') return 'Ig';
    if (w.length === 1 && w !== 'y' && w !== 'o') return w.toUpperCase();
    if (off > 0 && smallWords.has(w)) return w;
    const c = ACC[w] || w; return c.charAt(0).toUpperCase() + c.slice(1);
  });
};
const sent = (s?: string | null) => { if (!s) return undefined; const t = s.trim(); if (!t) return undefined; return t.toUpperCase() === t ? t.charAt(0) + t.slice(1).toLowerCase() : t; };
const clean = (s?: string | null) => (s ? s.replace(/\s+/g, ' ').trim() || undefined : undefined);

// Quita notas internas del equipo (no deben publicarse)
const scrub = (v?: string) => v ? v.split(/(?<=\.)\s+/).filter((x) => !/Nota interna|hoja fuente|suministrad|simulador interactivo/i.test(x)).join(' ').trim() || undefined : undefined;
let cache: Exam[] | null = null;
export function allExams(): Exam[] {
  if (cache) return cache;
  const root = process.cwd();
  const out: Exam[] = [];
  const used = new Set<string>();
  const fp = path.join(root, 'data/funcionales.json');
  if (fs.existsSync(fp)) {
    for (const e of JSON.parse(fs.readFileSync(fp, 'utf8'))) {
      used.add(e.id);
      out.push({ slug: e.id, name: e.name, area: e.specialty, kind: 'func', sample: e.sampleType, method: e.methodology, prep: e.timing,
        description: e.description, importance: e.importance, convRange: e.convRange, convText: e.convText, funcText: e.funcText, levels: (e.levels || []).map((l: any) => ({ ...l, interpretation: scrub(l.interpretation) || '' })),
        related: e.related, synonyms: e.synonyms, note: scrub(e.clarificationNote), refs: e.references, factors: e.interpretationFactors, fullName: e.fullName });
    }
  }
  const cp = path.join(root, 'data/catalogo.json');
  if (fs.existsSync(cp)) {
    const raw = JSON.parse(fs.readFileSync(cp, 'utf8'));
    const list = Array.isArray(raw) ? raw : raw.items || raw.examenes || raw.data || [];
    for (const e of list) {
      const name = titleCase(String(e.nombre || '').trim()); if (!name) continue;
      let s = slugify(name); if (!s) continue;
      if (used.has(s)) s = `${s}-${e.codigo || e.id}`; let n = 2; const base = s; while (used.has(s)) s = `${base}-${n++}`;
      used.add(s);
      out.push({ slug: s, name, area: clean(e.area_laboratorio) || 'Otros', kind: 'cat', container: sent(clean(e.recipiente)), delivery: sent(clean(e.entrega)), purpose: clean(e.para_que_sirve),
        conditions: clean(e.condiciones), prereq: clean(e.prerrequisitos), docs: clean(e.documentos_requeridos), code: clean(String(e.codigo ?? '')), cups: clean(String(e.cups ?? '')),
        synonyms: Array.isArray(e.sinonimos) ? e.sinonimos.map(String) : [] });
    }
  }
  cache = out; return out;
}
export const examBySlug = (s: string) => allExams().find((e) => e.slug === s);
