export const SITE = {
  name: 'BioReferencia',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://bioreferencia-preview.netlify.app').replace(/\/$/, ''),
  wa: '573009125733',
  waDisplay: '300 912 5733',
  tel: '+576044480002',
  telDisplay: '(604) 448 00 02',
  gtm: process.env.NEXT_PUBLIC_GTM_ID || '',
  results: 'https://resultadosbioreferencia.atheneasoluciones.com/Resultados',
  social: {
    facebook: 'https://www.facebook.com/LaboratorioBioReferencia/',
    instagram: 'https://www.instagram.com/bioreferencialab',
    linkedin: 'https://www.linkedin.com/in/laboratorio-cl%C3%ADnico-bioreferencia/',
    tiktok: 'https://www.tiktok.com/@bioreferencialab',
  },
  preview: !process.env.NEXT_PUBLIC_SITE_URL, // while no production URL set: noindex
};
export type Lang = 'es' | 'en';
export const waLink = (text: string) => `https://wa.me/${SITE.wa}?text=${encodeURIComponent(text)}`;
