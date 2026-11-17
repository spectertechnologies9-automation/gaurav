import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { projectById } from './data/projects.js';
import { companies } from './data/companies.js';
import { site } from './data/site.js';
import { prefersReducedMotion, setLenis } from './lib/motion.js';
import { useHashRoute } from './hooks/useHashRoute.js';
import Header, { NAV } from './components/Header.jsx';
import Cursor from './components/Cursor.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Companies, { CompanyModal } from './components/Companies.jsx';
import Archive from './components/Archive.jsx';
import ProjectModal from './components/ProjectModal.jsx';
import Tech from './components/Tech.jsx';
import Timeline from './components/Timeline.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import ContactDock from './components/ContactDock.jsx';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [route, closeRoute] = useHashRoute();
  const [ready, setReady] = useState(false);
  const [loadPct, setLoadPct] = useState(0);
  const [active, setActive] = useState('top');
  const reduce = useRef(prefersReducedMotion());

  // ── loader: wait for fonts + hero image, with a hard cap
  useEffect(() => {
    if (reduce.current) document.documentElement.classList.add('reduce');
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setLoadPct(100);
      setTimeout(() => setReady(true), 250);
    };
    const tick = setInterval(() => setLoadPct((p) => Math.min(90, p + 12)), 120);
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}img/art-smile-800.webp`;
    Promise.all([document.fonts?.ready, img.decode?.().catch(() => {})]).then(finish);
    const cap = setTimeout(finish, 2500);
    return () => {
      clearInterval(tick);
      clearTimeout(cap);
    };
  }, []);

  // ── smooth scroll + scroll animations
  useEffect(() => {
    if (!ready) return undefined;
    let lenis;
    let tickFn;
    if (!reduce.current) {
      lenis = new Lenis({ duration: 1.1, smoothWheel: true, syncTouch: false });
      setLenis(lenis);
      lenis.on('scroll', ScrollTrigger.update);
      tickFn = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tickFn);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      if (reduce.current) return;
      ScrollTrigger.batch('.reveal', {
        start: 'top 90%',
        once: true,
        onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: { amount: Math.min(0.4, els.length * 0.08) }, overwrite: true }),
      });
      gsap.from('.hero__copy > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.07, ease: 'power3.out', delay: 0.05 });
      gsap.from('.portrait', { scale: 0.85, opacity: 0, rotate: -4, duration: 1, ease: 'back.out(1.5)', delay: 0.15 });
      gsap.from('.hero .float', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.09, ease: 'back.out(2)', delay: 0.55 });
    });

    // active section tracking
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      io.disconnect();
      ctx.revert();
      if (tickFn) gsap.ticker.remove(tickFn);
      lenis?.destroy();
      setLenis(null);
    };
  }, [ready]);

  // ── page transition: route changes immediately; the coloured curtain is a purely
  // decorative CSS animation, so it can never block navigation or get stuck on screen.
  const [wipe, setWipe] = useState(0);
  const openRoute = useCallback((path) => {
    window.location.hash = `/${path}`;
    if (!reduce.current) setWipe((n) => n + 1);
  }, []);

  // ── per-route document title
  const project = route?.type === 'project' ? projectById[route.id] : null;
  const company = route?.type === 'venture' ? companies.find((c) => c.id === route.id) : null;
  useEffect(() => {
    const t = project?.name || company?.name;
    document.title = t ? `${t} — ${site.name}` : `${site.name} — I Build Intelligent Systems`;
  }, [project, company]);

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Cursor />
      <div className={`loader${ready ? ' is-done' : ''}`} aria-hidden={ready} role="status">
        <div className="loader__box">
          <span className="brand__mark" style={{ width: 72, height: 72, fontSize: '1.6rem' }}>{site.shortName}</span>
          <div className="loader__bar"><i style={{ width: `${loadPct}%` }} /></div>
          <span className="eyebrow">Booting universe… {loadPct}%</span>
        </div>
      </div>
      <div key={wipe} className={`curtain${wipe ? ' go' : ''}`} aria-hidden="true"><i /><i /><i /><i /><i /></div>

      <Header active={active} />
      <main>
        <Hero ready={ready} />
        <Marquee tone="yellow" items={['AI', 'Voice agents', 'WhatsApp automation', 'RAG', 'NFC', 'Full-stack', 'Local LLMs', 'Ventures']} />
        <About />
        <Companies onOpen={openRoute} />
        <Archive onOpen={openRoute} />
        <Marquee items={['37 entries', 'Built in Bengaluru', 'Curiosity first', 'Engineered with intent', 'Ship it']} />
        <Tech onOpen={openRoute} />
        <Timeline onOpen={openRoute} />
        <Contact />
      </main>
      <Footer />
      <ContactDock />

      {project && (
        <ErrorBoundary key={project.id} onClose={closeRoute}>
          <ProjectModal project={project} onClose={closeRoute} onOpen={openRoute} />
        </ErrorBoundary>
      )}
      {company && (
        <ErrorBoundary key={company.id} onClose={closeRoute}>
          <CompanyModal company={company} onClose={closeRoute} onOpen={openRoute} />
        </ErrorBoundary>
      )}
    </>
  );
}
