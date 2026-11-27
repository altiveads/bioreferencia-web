import type { Lang } from './site';
type L = { es: string; en: string };

export type Sede = { slug: string; name: string; city: string; addr: string; place: L; hours: { es: string[]; en: string[] }; coords: string; img: string };
export const SEDES: Sede[] = [
  { slug: 'ciudad-del-rio', name: 'Ciudad del Río', city: 'Medellín', addr: 'Cra. 48 #19A-40, Torre Médica, Consultorio 1304', place: { es: 'Torre Médica Ciudad del Río · El Poblado, Medellín', en: 'Torre Médica Ciudad del Río · El Poblado, Medellín' },
    hours: { es: ['Lun–Vie 6:30 am – 4:00 pm', 'Sáb 6:30 am – 12:00 pm'], en: ['Mon–Fri 6:30 am – 4:00 pm', 'Sat 6:30 am – 12:00 pm'] }, coords: '6.223214,-75.574883', img: '/img/sedes/ciudad-del-rio.webp' },
  { slug: 'envigado', name: 'Envigado', city: 'Envigado', addr: 'Cra. 48 #32B Sur-30, Clínica Nova, Piso 4', place: { es: 'Clínica Nova · Envigado', en: 'Clínica Nova · Envigado' },
    hours: { es: ['Lun–Vie 6:30 am – 6:00 pm', 'Sáb 6:30 am – 2:00 pm', 'Dom y festivos 7:00 am – 2:00 pm'], en: ['Mon–Fri 6:30 am – 6:00 pm', 'Sat 6:30 am – 2:00 pm', 'Sun & holidays 7:00 am – 2:00 pm'] }, coords: '6.176568,-75.590055', img: '/img/sedes/envigado.webp' },
  { slug: 'el-tesoro', name: 'El Tesoro', city: 'Medellín', addr: 'Carrera 25A #1A Sur-45, Torre Médica 2, Consultorio 1645', place: { es: 'Centro Comercial El Tesoro · Medellín', en: 'El Tesoro Mall · Medellín' },
    hours: { es: ['Lun–Vie 6:30 am – 4:00 pm', 'Sáb 6:30 am – 12:00 pm'], en: ['Mon–Fri 6:30 am – 4:00 pm', 'Sat 6:30 am – 12:00 pm'] }, coords: '6.197772,-75.557264', img: '/img/sedes/el-tesoro.webp' },
  { slug: 'belen', name: 'Belén', city: 'Medellín', addr: 'Calle 31A #65F-110, Belén Fátima', place: { es: 'Belén Fátima · Medellín', en: 'Belén Fátima · Medellín' },
    hours: { es: ['Lun–Vie 6:30 am – 4:00 pm', 'Sáb 6:30 am – 12:00 pm'], en: ['Mon–Fri 6:30 am – 4:00 pm', 'Sat 6:30 am – 12:00 pm'] }, coords: '6.237192,-75.587239', img: '/img/sedes/belen.webp' },
  { slug: 'rionegro', name: 'Rionegro', city: 'Rionegro', addr: 'Vía Llanogrande, Mall Portanova Center, Km 2, Local 101', place: { es: 'Rionegro · Antioquia', en: 'Rionegro · Antioquia' },
    hours: { es: ['Lun–Vie 6:30 am – 2:00 pm', 'Sáb 6:30 am – 12:00 pm'], en: ['Mon–Fri 6:30 am – 2:00 pm', 'Sat 6:30 am – 12:00 pm'] }, coords: '6.154318,-75.435434', img: '/img/sedes/rionegro.webp' },
  { slug: 'llanogrande', name: 'Llanogrande', city: 'Rionegro', addr: 'Clínica Llanogrande, Local 9, Vereda Chipre', place: { es: 'Rionegro · Antioquia', en: 'Rionegro · Antioquia' },
    hours: { es: ['Lun–Sáb 7:00 am – 11:00 am'], en: ['Mon–Sat 7:00 am – 11:00 am'] }, coords: '6.132101,-75.395633', img: '/img/sedes/llanogrande.webp' },
];
export const SOON_SEDE = { name: 'Pereira', city: 'Risaralda', label: { es: 'Próximamente', en: 'Coming soon' }, text: { es: 'Muy pronto abrimos nuestra sede en Pereira.', en: 'Our Pereira site is opening soon.' }, note: { es: 'Escríbenos y te avisamos cuando abra', en: 'Message us and we will let you know when it opens' } };
export const PROCESSING = { es: 'Sede de procesamiento: Cra. 48 #32B Sur-30, Clínica Nova, piso 4, Envigado', en: 'Processing site: Cra. 48 #32B Sur-30, Clínica Nova, 4th floor, Envigado' };
export const mapsUrl = (s: Sede) => `https://www.google.com/maps/search/?api=1&query=${s.coords}`;

export const CONVENIOS = [
  { slug: 'sura', name: 'Sura', img: '/img/convenios/sura.webp' },
  { slug: 'axa-colpatria', name: 'AXA Colpatria', img: '/img/convenios/axa-colpatria.webp' },
  { slug: 'allianz', name: 'Allianz', img: '/img/convenios/allianz.webp' },
  { slug: 'mapfre', name: 'Mapfre', img: '/img/convenios/mapfre.webp' },
  { slug: 'hdi-seguros', name: 'HDI Seguros', img: '/img/convenios/hdi-seguros.webp' },
  { slug: 'seguros-bolivar', name: 'Seguros Bolívar', img: '/img/convenios/seguros-bolivar.webp' },
  { slug: 'coomeva', name: 'Coomeva', img: '/img/convenios/coomeva.webp' },
  { slug: 'colmedica', name: 'Colmédica', img: '/img/convenios/colmedica.webp' },
];

export const FAQS: { q: L; a: L }[] = [
  { q: { es: '¿Cuántas horas debo estar en ayunas para realizarme exámenes de sangre?', en: 'How many hours should I fast before a blood test?' },
    a: { es: 'Para exámenes como glucosa, insulina, perfil lipídico y algunas pruebas metabólicas, generalmente se recomienda un ayuno de 8 a 12 horas. Confirma siempre la preparación específica al momento de agendar.', en: 'For tests such as glucose, insulin, lipid profile and some metabolic tests, a fast of 8 to 12 hours is usually recommended. Always confirm the specific preparation when you book.' } },
  { q: { es: '¿Puedo tomar agua durante el ayuno?', en: 'Can I drink water while fasting?' },
    a: { es: 'Sí. En la mayoría de los casos puedes tomar agua. Evita bebidas azucaradas, café, aromáticas, jugos, chicles, caramelos o cualquier alimento.', en: 'Yes. In most cases you can drink water. Avoid sugary drinks, coffee, herbal tea, juice, chewing gum, candy or any food.' } },
  { q: { es: '¿Si tomo café sin azúcar o consumo chicle sigo en ayunas?', en: 'Am I still fasting if I have black coffee or chew gum?' },
    a: { es: 'No. El ayuno debe ser estricto. El café, chicle, caramelos, bebidas o alimentos, incluso sin azúcar, pueden interferir con algunos resultados.', en: 'No. Fasting must be strict. Coffee, gum, candy, drinks or food, even sugar-free, can interfere with some results.' } },
  { q: { es: '¿Debo suspender mis medicamentos antes de los exámenes?', en: 'Should I stop my medication before the tests?' },
    a: { es: 'No suspendas medicamentos sin indicación médica. Informa al personal de toma de muestra qué medicamentos estás tomando.', en: 'Do not stop any medication without medical advice. Tell the sampling staff which medications you take.' } },
  { q: { es: '¿Cómo debo recolectar una muestra de orina?', en: 'How should I collect a urine sample?' },
    a: { es: 'Recolecta preferiblemente la primera orina de la mañana en un recipiente limpio y estéril. Evita tocar el interior del frasco y entrega la muestra lo antes posible. Para urocultivo, la técnica de recolección debe ser más estricta.', en: 'Preferably collect the first urine of the morning in a clean, sterile container. Avoid touching the inside of the jar and deliver the sample as soon as possible. For urine culture the technique must be stricter.' } },
  { q: { es: 'Me tengo que realizar un cultivo de orina, ¿cómo lo hago?', en: 'I need a urine culture. How do I do it?' },
    a: { es: 'Realiza aseo genital previo, descarta el primer chorro y recolecta la muestra del chorro medio en un frasco estéril. No uses recipientes caseros.', en: 'Wash the genital area first, discard the first stream and collect the midstream sample in a sterile jar. Do not use household containers.' } },
  { q: { es: '¿Puedo llevar una muestra tomada en casa?', en: 'Can I bring a sample collected at home?' },
    a: { es: 'Sí, siempre que haya sido recolectada correctamente, en el recipiente adecuado y dentro del tiempo recomendado.', en: 'Yes, as long as it was collected correctly, in the right container and within the recommended time.' } },
  { q: { es: '¿Cómo consulto mis resultados?', en: 'How do I check my results?' },
    a: { es: 'Puedes consultarlos desde la opción “Consulta tus resultados” en la página web. Ten a la mano tu documento de identidad y los datos solicitados.', en: 'You can check them with the “Check your results” option on this website. Have your ID document and the requested details at hand.' } },
  { q: { es: '¿En cuánto tiempo entregan mis resultados?', en: 'How long until I get my results?' },
    a: { es: 'El tiempo de entrega depende del tipo de examen. Algunas pruebas se entregan el mismo día y otras requieren procesamiento especializado.', en: 'Delivery time depends on the test. Some are delivered the same day and others require specialized processing.' } },
  { q: { es: '¿Qué hago si no puedo descargar mis resultados?', en: 'What if I cannot download my results?' },
    a: { es: 'Verifica que los datos ingresados sean correctos. Si el inconveniente continúa, comunícate con nuestro centro de contacto.', en: 'Check that the details you entered are correct. If the problem continues, contact our contact center.' } },
  { q: { es: '¿Cómo solicito el servicio de toma de muestras a domicilio?', en: 'How do I request at-home sample collection?' },
    a: { es: 'Puedes solicitarlo a través de nuestras líneas de atención o WhatsApp. El equipo confirmará tus datos, dirección, cobertura y preparación.', en: 'You can request it through our phone lines or WhatsApp. The team will confirm your details, address, coverage and preparation.' } },
  { q: { es: '¿El servicio a domicilio aplica para medicina prepagada?', en: 'Does home collection apply to prepaid health plans?' },
    a: { es: 'Depende del convenio, cobertura y condiciones de tu póliza o plan. Nuestro equipo puede ayudarte a validar la disponibilidad.', en: 'It depends on the agreement, coverage and conditions of your policy or plan. Our team can help you check availability.' } },
  { q: { es: '¿Qué tiempo de validez tiene la orden médica?', en: 'How long is a medical order valid?' },
    a: { es: 'La validez puede variar según tu entidad, póliza o convenio. Te recomendamos confirmar antes de asistir.', en: 'Validity may vary depending on your provider, policy or agreement. We recommend confirming before you come.' } },
  { q: { es: '¿Puedo pagar mis exámenes en línea?', en: 'Can I pay for my tests online?' },
    a: { es: 'Sí. Si el servicio está habilitado para pago en línea, puedes realizarlo desde los canales autorizados de BioReferencia.', en: 'Yes. If the service is enabled for online payment, you can pay through BioReferencia’s authorized channels.' } },
  { q: { es: '¿Atienden pacientes particulares y de convenios?', en: 'Do you see private patients and insured patients?' },
    a: { es: 'Sí. Atendemos pacientes particulares y usuarios de diferentes convenios. La cobertura depende del plan, entidad y servicios contratados.', en: 'Yes. We see private patients and users of different agreements. Coverage depends on the plan, provider and contracted services.' } },
  { q: { es: '¿Qué debo llevar el día de mi examen?', en: 'What should I bring on the day of my test?' },
    a: { es: 'Lleva tu documento de identidad, orden médica si aplica, autorización de la entidad cuando sea necesaria y cualquier muestra solicitada.', en: 'Bring your ID document, the medical order if applicable, authorization from your provider when required and any requested sample.' } },
];

export const DOM_STEPS: { t: L; d: L }[] = [
  { t: { es: 'Agenda tu visita', en: 'Book your visit' }, d: { es: 'Cuéntanos qué exámenes necesitas y la dirección donde quieres recibirnos. Te confirmamos fecha y franja horaria disponible.', en: 'Tell us which tests you need and the address where you want us. We confirm the available date and time slot.' } },
  { t: { es: 'Preparación previa', en: 'Preparation' }, d: { es: 'Te indicamos si tus exámenes requieren ayuno u otra condición, para que la toma sea válida desde el primer intento.', en: 'We tell you whether your tests need fasting or other conditions, so the sample is valid on the first try.' } },
  { t: { es: 'Visita del auxiliar', en: 'Technician visit' }, d: { es: 'Un auxiliar de laboratorio certificado llega a tu domicilio dentro de la franja acordada, identificado y con todos los implementos de bioseguridad.', en: 'A certified lab technician arrives within the agreed slot, identified and with all biosafety equipment.' } },
  { t: { es: 'Toma de la muestra', en: 'Sample collection' }, d: { es: 'La toma se realiza en tu propio espacio, con material estéril de un solo uso y los mismos protocolos de nuestras sedes.', en: 'The sample is taken in your own space, with sterile single-use material and the same protocols as our sites.' } },
  { t: { es: 'Transporte y resultados', en: 'Transport and results' }, d: { es: 'La muestra viaja en condiciones controladas hasta el laboratorio. Recibes tus resultados en el tiempo estimado para cada examen.', en: 'The sample travels under controlled conditions to the lab. You receive your results in the estimated time for each test.' } },
];

export const REF_STEPS: { t: L; d: L }[] = [
  { t: { es: 'Solicitud del servicio', en: 'Service request' }, d: { es: 'Agendamos la recolección con la información operativa requerida para programar el servicio.', en: 'We schedule the pickup with the operational information required.' } },
  { t: { es: 'Programación', en: 'Scheduling' }, d: { es: 'Se asigna franja horaria, ruta y mensajero según prioridad, ubicación y tipo de muestra.', en: 'A time slot, route and courier are assigned by priority, location and sample type.' } },
  { t: { es: 'Retiro de muestras', en: 'Sample pickup' }, d: { es: 'El personal autorizado realiza la recolección en el punto definido cumpliendo lineamientos de bioseguridad.', en: 'Authorized staff collect the samples at the agreed point following biosafety guidelines.' } },
  { t: { es: 'Transporte controlado', en: 'Controlled transport' }, d: { es: 'Las muestras viajan directamente a nuestra sede de procesamiento en condiciones adecuadas para preservar su estabilidad.', en: 'Samples travel directly to our processing site under conditions that preserve their stability.' } },
  { t: { es: 'Recepción y verificación', en: 'Reception and verification' }, d: { es: 'En el laboratorio se valida el ingreso, estado de la muestra y consistencia de la información recibida.', en: 'At the lab we validate intake, sample condition and consistency of the information received.' } },
  { t: { es: 'Procesamiento', en: 'Processing' }, d: { es: 'La muestra continúa con el flujo analítico, con controles de calidad internos y externos y procesos estandarizados.', en: 'The sample continues through the analytical flow with internal and external quality controls and standardized processes.' } },
];
export const pick = <T extends { es: any; en: any }>(o: T, lang: Lang) => o[lang];
