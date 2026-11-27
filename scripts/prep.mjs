// Genera public/data/examenes-index.json (índice liviano para el buscador)
import fs from 'node:fs'; import { execSync } from 'node:child_process';
const out = execSync(`npx tsx -e "import {allExams} from './lib/exams'; console.log(JSON.stringify(allExams().map(e=>[e.slug,e.name,e.area,e.kind==='func'?1:0,(e.synonyms||[]).join(' ')])))"`, { maxBuffer: 1e8 }).toString();
fs.writeFileSync('public/data/examenes-index.json', out.trim());
console.log('índice de exámenes:', JSON.parse(out).length);
