import { SITE, type Lang } from './site';

export type NavItem = { label: string; desc: string; href: string; ext?: boolean };
export type NavGroup =
  | { key: string; label: string; href: string }
  | { key: string; label: string; kind: 'servicios' | 'pacientes' | 'nosotros'; items: NavItem[]; eyebrow?: string };

export const navModel = (lang: Lang): NavGroup[] => {
  const es = lang === 'es', p = es ? '' : '/en';
  const x = (a: string, b: string) => (es ? a : b);
  return [
    { key: 'examenes', label: x('Exámenes', 'Tests'), href: `${p}/examenes/` },
    { key: 'sedes', label: x('Sedes', 'Locations'), href: `${p}/sedes/` },
    { key: 'a-domicilio', label: x('A domicilio', 'At home'), href: `${p}/a-domicilio/` },
    { key: 'servicios', label: x('Servicios', 'Services'), kind: 'servicios', eyebrow: x('Lo que hacemos además de exámenes', 'Beyond lab tests'), items: [
      { label: x('Chequeos ejecutivos', 'Executive check-ups'), desc: x('Evaluación completa de salud, a tu medida', 'A complete health review, tailored to you'), href: `${p}/chequeos-ejecutivos/` },
      { label: 'Kit Wellness', desc: x('Bienestar y prevención desde tu casa', 'Wellness and prevention from home'), href: `${p}/kit-wellness/` },
      { label: x('Usuario Élite', 'Elite User'), desc: x('Atención prioritaria y beneficios para ti', 'Priority care and benefits'), href: `${p}/usuario-elite/` },
      { label: x('Innovación y Desarrollo', 'Innovation & Development'), desc: x('Pruebas funcionales y terapia celular autóloga', 'Functional tests and autologous cell therapy'), href: `${p}/innovacion-y-desarrollo/` },
      { label: x('Laboratorio de referencia', 'Reference laboratory'), desc: x('Para clínicas, médicos e instituciones', 'For clinics, doctors and institutions'), href: `${p}/laboratorio-de-referencia/` },
    ] },
    { key: 'pacientes', label: x('Pacientes', 'Patients'), kind: 'pacientes', items: [
      { label: x('Consulta tus resultados', 'Check your results'), desc: x('Con tu número de documento, desde cualquier dispositivo', 'With your ID number, from any device'), href: SITE.results, ext: true },
      { label: x('Paga en línea', 'Pay online'), desc: x('PSE y tarjetas de crédito o débito, de forma segura', 'PSE and credit or debit cards, securely'), href: SITE.pay, ext: true },
      { label: x('Convenios', 'Insurers'), desc: x('Aseguradoras y medicina prepagada', 'Insurance and prepaid health plans'), href: `${p}/convenios/` },
      { label: x('Preguntas frecuentes', 'FAQ'), desc: x('Preparación, tiempos y resultados', 'Preparation, timing and results'), href: `${p}/preguntas-frecuentes/` },
      { label: 'PQRSF', desc: x('Peticiones, quejas, reclamos y sugerencias', 'Requests, complaints and suggestions'), href: `${p}/pqrsf/` },
    ] },
    { key: 'nosotros', label: x('Nosotros', 'About'), kind: 'nosotros', items: [
      { label: x('Quiénes somos', 'About us'), desc: x('Nuestra historia y certificación ISO 9001', 'Our story and ISO 9001 certification'), href: `${p}/quienes-somos/` },
      { label: x('Trabaja con nosotros', 'Work with us'), desc: x('Envía tu hoja de vida', 'Send us your CV'), href: `${p}/trabaja-con-nosotros/` },
      { label: x('Políticas', 'Policies'), desc: x('Datos personales, seguridad del paciente y más', 'Personal data, patient safety and more'), href: `${p}/politicas/` },
    ] },
    { key: 'blog', label: 'Blog', href: `${p}/blog/` },
  ];
};
