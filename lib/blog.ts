import fs from 'node:fs'; import path from 'node:path';
export type Post = { slug: string; title: string; desc: string; date: string; img: string; alt: string; html: string };
let c: Post[] | null = null;
export const posts = (): Post[] => (c ??= (JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/blog.json'), 'utf8')) as Post[]).sort((a, b) => b.date.localeCompare(a.date)));
export const postBySlug = (s: string) => posts().find((p) => p.slug === s);
