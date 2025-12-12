import React, { useState, useEffect, useRef } from 'react';
import {
    Menu, X, ArrowRight, ArrowUpRight, CheckCircle2,
    Minus, Plus, ChevronDown, ChevronUp, Globe,
    Layout as LayoutIcon, Zap, MousePointer2, TrendingUp, ShieldCheck,
    Star, Users, Clock
} from 'lucide-react';
import rukaLogo from '/public/ruka-logo.png';
import villaLujo from '/public/villa-lujo.jpg';

// --- STYLES & ANIMATIONS ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      /* PALETA DE ALTO CONTRASTE */
      --color-cream: #E1E1D7;       /* Fondo Base */
      --color-teal: #6599CB;        /* Color Principal */
      --color-teal-dark: #4F7B8C;   /* Color Oscuro */
      --color-teal-light: #96D9CC;  /* Color Claro */
      --color-accent: #F2994B;      /* Acento Naranja */
      --color-text: #2C3E50;        /* Texto */
      --color-white: #FFFFFF;
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background-color: var(--color-cream);
      color: var(--color-text);
      overflow-x: hidden;
      cursor: default;
      position: relative;
    }

    /* Animated Glassmorphism Background */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: linear-gradient(135deg, #E1E1D7 0%, #F5F5F5 100%);
    }

    .animated-blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(120px);
      opacity: 0.35;
      z-index: -1;
      animation: float 20s infinite ease-in-out;
    }

    .blob-1 {
      width: 700px;
      height: 700px;
      background: linear-gradient(135deg, #6599CB 0%, #96D9CC 100%);
      top: -5%;
      right: -5%;
      animation: lavaLamp1 30s infinite ease-in-out;
      border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    }

    .blob-2 {
      width: 600px;
      height: 600px;
      background: linear-gradient(135deg, #F2994B 0%, #E0883B 100%);
      bottom: -5%;
      left: -5%;
      animation: lavaLamp2 25s infinite ease-in-out;
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    }

    .blob-3 {
      width: 650px;
      height: 650px;
      background: linear-gradient(135deg, #4F7B8C 0%, #6599CB 100%);
      top: 50%;
      right: -10%;
      animation: lavaLamp3 35s infinite ease-in-out;
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }

    /* Diagonal Lava Lamp - Blob 1 (Top-Right to Bottom-Left) */
    @keyframes lavaLamp1 {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
      }
      25% {
        transform: translate(-120px, 100px) scale(1.2);
        border-radius: 50% 50% 60% 40% / 30% 60% 40% 70%;
      }
      50% {
        transform: translate(-200px, 200px) scale(0.9);
        border-radius: 60% 40% 50% 50% / 50% 40% 60% 40%;
      }
      75% {
        transform: translate(-100px, 120px) scale(1.3);
        border-radius: 45% 55% 40% 60% / 60% 45% 55% 40%;
      }
    }

    /* Diagonal Lava Lamp - Blob 2 (Bottom-Left to Top-Right) */
    @keyframes lavaLamp2 {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      }
      25% {
        transform: translate(150px, -120px) scale(1.25);
        border-radius: 40% 60% 60% 40% / 50% 60% 40% 50%;
      }
      50% {
        transform: translate(250px, -220px) scale(0.85);
        border-radius: 70% 30% 50% 50% / 40% 70% 30% 60%;
      }
      75% {
        transform: translate(180px, -150px) scale(1.15);
        border-radius: 50% 50% 40% 60% / 65% 35% 65% 35%;
      }
    }

    /* Diagonal Lava Lamp - Blob 3 (Right side moving diagonally) */
    @keyframes lavaLamp3 {
      0%, 100% {
        transform: translate(0, 0) scale(1);
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
      }
      16% {
        transform: translate(-80px, -100px) scale(1.2);
        border-radius: 50% 50% 40% 60% / 40% 60% 40% 60%;
      }
      33% {
        transform: translate(-150px, 80px) scale(0.9);
        border-radius: 40% 60% 50% 50% / 60% 40% 50% 50%;
      }
      50% {
        transform: translate(-100px, -120px) scale(1.3);
        border-radius: 60% 40% 60% 40% / 50% 50% 50% 50%;
      }
      66% {
        transform: translate(-180px, 60px) scale(0.85);
        border-radius: 45% 55% 35% 65% / 55% 45% 65% 35%;
      }
      83% {
        transform: translate(-120px, -80px) scale(1.15);
        border-radius: 55% 45% 60% 40% / 40% 60% 45% 55%;
      }
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--color-cream);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--color-teal);
      border-radius: 4px;
    }

    /* Typography Scale */
    .type-display { font-size: clamp(3rem, 7vw, 5.5rem); line-height: 0.95; font-weight: 800; letter-spacing: -0.02em; }
    .type-h1 { font-size: clamp(2.5rem, 5vw, 4rem); line-height: 1.1; font-weight: 700; }
    .type-h2 { font-size: clamp(2rem, 4vw, 3rem); line-height: 1.2; font-weight: 700; }
    .type-h3 { font-size: 1.5rem; line-height: 1.3; font-weight: 600; }
    .type-body { font-size: 1rem; line-height: 1.6; font-weight: 400; }
    .type-label { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; }
    
    /* Marquee Animation */
    .marquee-container {
      overflow: hidden;
      white-space: nowrap;
      position: relative;
    }
    .marquee-content {
      display: inline-block;
      animation: marquee 30s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }

    /* --- GLASSMORPHISM INTERACTIVO --- */
    .glass-panel {
      background: rgba(255, 255, 255, 0.4); /* Base más transparente */
      backdrop-filter: blur(20px) saturate(180%); /* Desenfoque fuerte y saturación para "vida" */
      border: 1px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05); /* Sombra suave */
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s ease, background 0.3s ease;
    }

    /* Efecto de luz (Spotlight) */
    .glass-panel::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      /* Gradiente radial que sigue al mouse (variables --mouse-x, --mouse-y) */
      background: radial-gradient(
        600px circle at var(--mouse-x) var(--mouse-y), 
        rgba(255, 255, 255, 0.4), 
        transparent 40%
      );
      z-index: 0;
      opacity: 0;
      transition: opacity 0.5s ease;
      pointer-events: none;
    }

    .glass-panel:hover::before {
      opacity: 1; /* Mostrar luz al hacer hover */
    }
    
    .glass-panel:hover {
      border-color: rgba(255, 255, 255, 0.8); /* Borde más brillante al hover */
      background: rgba(255, 255, 255, 0.5);
    }

    /* Contenido del header por encima del efecto */
    .glass-content {
      position: relative;
      z-index: 10;
    }

    /* --- FIN GLASSMORPHISM --- */

    /* Hover Effects */
    .hover-lift {
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    }
    .hover-lift:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px -10px rgba(101, 153, 203, 0.2);
    }

    /* Reveal Animation */
    .reveal {
      opacity: 0;
      transform: translateY(40px);
      transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Accordion Transition */
    .accordion-content {
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
    }
    .accordion-content.open {
      max-height: 300px;
      opacity: 1;
    }

    /* Image Blend Modes */
    .img-blend {
      mix-blend-mode: overlay;
      opacity: 0.3;
    }
  `}</style>
);

// --- HOOKS ---
const useScrollReveal = (trigger) => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });

        const timeout = setTimeout(() => {
            document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        }, 100);

        return () => {
            observer.disconnect();
            clearTimeout(timeout);
        };
    }, [trigger]);
};

// --- COMPONENTS ---

const RukaLogo = ({ className = "h-10" }) => (
    <img
        src={rukaLogo}
        alt="Ruka Agency Logo"
        className={className}
    />
);

const Button = ({ children, variant = 'primary', className = '', onClick, icon = true }) => {
    const baseStyle = "px-8 py-4 rounded-full font-semibold tracking-wide flex items-center gap-3 transition-all duration-300 group relative overflow-hidden";
    const variants = {
        primary: "bg-[#6599CB] text-white hover:bg-[#4F7B8C] hover:shadow-lg",
        accent: "bg-[#F2994B] text-white hover:bg-[#E0883B] hover:shadow-lg",
        secondary: "bg-transparent border border-[#6599CB] text-[#6599CB] hover:bg-[#6599CB] hover:text-white",
        white: "bg-white text-[#6599CB] hover:bg-[#F5F5F5]"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            <span className="relative z-10">{children}</span>
            {icon && <ArrowUpRight className="relative z-10 group-hover:rotate-45 transition-transform duration-300" size={20} />}
        </button>
    );
};

const Marquee = ({ text }) => (
    <div className="marquee-container py-4 bg-[#6599CB] text-white border-y border-[#4F7B8C]">
        <div className="marquee-content">
            {[...Array(6)].map((_, i) => (
                <span key={i} className="text-2xl md:text-4xl font-bold uppercase mx-8 tracking-widest opacity-90">
                    {text} <span className="text-[#96D9CC] mx-4">•</span>
                </span>
            ))}
        </div>
    </div>
);

const AccordionItem = ({ title, content, isOpen, toggle }) => (
    <div className="border-b border-[#6599CB]/20 py-6 reveal">
        <button onClick={toggle} className="w-full flex justify-between items-center text-left group">
            <h3 className={`text-xl font-bold transition-colors ${isOpen ? 'text-[#6599CB]' : 'text-[#4F7B8C] group-hover:text-[#6599CB]'}`}>
                {title}
            </h3>
            <div className={`transition-transform duration-300 bg-[#E1E1D7] p-2 rounded-full ${isOpen ? 'rotate-180 bg-[#6599CB] text-white' : 'text-[#6599CB]'}`}>
                <ChevronDown size={20} />
            </div>
        </button>
        <div className={`accordion-content ${isOpen ? 'open' : ''}`}>
            <p className="pt-4 text-[#2C3E50] leading-relaxed max-w-3xl">
                {content}
            </p>
        </div>
    </div>
);

// --- SECTIONS ---

const Navigation = ({ currentPage, navigateTo, isMobileMenuOpen, setIsMobileMenuOpen }) => {
    const navRef = useRef(null);

    // Efecto Spotlight: Actualiza variables CSS con la posición del mouse
    const handleMouseMove = (e) => {
        if (!navRef.current) return;
        const rect = navRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        navRef.current.style.setProperty('--mouse-x', `${x}px`);
        navRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
            <div
                ref={navRef}
                onMouseMove={handleMouseMove}
                className="glass-panel px-6 py-3 rounded-full flex items-center justify-between gap-8 shadow-lg max-w-5xl w-full relative group"
            >
                <div className="glass-content flex items-center cursor-pointer group/logo" onClick={() => navigateTo && navigateTo('home')}>
                    <RukaLogo className="h-16 group-hover/logo:scale-105 transition-transform" />
                </div>

                <div className="glass-content hidden md:flex items-center gap-1 bg-[#F5F5F5]/50 px-1 py-1 rounded-full border border-[#5585A1]/10">
                    {['home', 'services', 'proceso'].map((id) => (
                        <button
                            key={id}
                            onClick={() => navigateTo && navigateTo(id)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === id ? 'bg-[#6599CB] text-white shadow-md' : 'text-[#4F7B8C] hover:bg-[#6599CB]/10'
                                }`}
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>

                <div className="glass-content flex items-center gap-4">
                    <button
                        onClick={() => navigateTo && navigateTo('contact')}
                        className="bg-[#4F7B8C] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#6599CB] transition-colors hidden sm:block shadow-lg hover:shadow-xl"
                    >
                        Auditoría
                    </button>
                    <button className="md:hidden text-[#4F7B8C]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>
        </nav>
    );
};

const Hero = ({ navigateTo }) => (
    <section className="relative min-h-screen pt-32 pb-20 flex flex-col justify-center px-6 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="reveal">
                {/* Status Badge */}
                <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-[#6599CB] bg-[#6599CB]/5 backdrop-blur-sm mb-8">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2994B] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F2994B]"></span>
                    </span>
                    <span className="type-label text-[#4F7B8C]">2 Plazas Disponibles • 2025</span>
                </div>


                <h1 className="mb-8">
                    <div className="type-display text-[#4F7B8C] font-extrabold">
                        ELEVA TU
                    </div>
                    <div className="type-h1 text-[#6599CB] font-light mt-2 tracking-wide italic">
                        estándar digital.
                    </div>
                </h1>
                <div className="grid md:grid-cols-2 gap-16 items-end mt-12">
                    <div>
                        <p className="type-body text-lg text-[#2C3E50] max-w-lg leading-relaxed mb-8">
                            Transformamos Agencias Inmobiliarias en líderes de mercado.
                            Creamos ecosistemas digitales que atraen compradores de alto valor mientras tu equipo se enfoca en cerrar ventas.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Button onClick={() => navigateTo && navigateTo('contact')} variant="accent">Solicitar Auditoría</Button>
                            <Button variant="secondary" onClick={() => navigateTo && navigateTo('services')}>Ver Ecosistema</Button>
                        </div>
                    </div>

                    {/* Trust Metrics */}
                    <div className="grid grid-cols-2 gap-8 border-t border-[#6599CB]/20 pt-8">
                        <div>
                            <p className="type-h2 text-[#6599CB]">+100%</p>
                            <p className="type-label text-[#4F7B8C] mt-2 font-bold">Leads Cualificados</p>
                        </div>
                        <div>
                            <p className="type-h2 text-[#6599CB]">TOP 3</p>
                            <p className="type-label text-[#4F7B8C] mt-2 font-bold">Ranking Google</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Abstract Background Element */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[70vh] bg-[#96D9CC] rounded-l-full opacity-20 blur-3xl -z-10 pointer-events-none"></div>
    </section>
);

const DiagnosticSection = () => (
    <section className="py-24 px-6 bg-white relative">
        <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="reveal">
                    <span className="type-label text-[#6599CB] mb-4 block">Diagnóstico de Marca</span>
                    <h2 className="type-h2 text-[#4F7B8C] mb-6">
                        ¿Está tu Presencia Digital alineada con tu Portafolio?
                    </h2>
                    <p className="text-[#2C3E50] mb-10 text-lg leading-relaxed">
                        En el sector de lujo, la percepción es realidad. Identificamos áreas clave donde tu agencia puede elevar su posicionamiento y eficiencia:
                    </p>

                    <div className="space-y-6">
                        {[
                            {
                                title: "Exclusividad Visual",
                                desc: "¿Tu web transmite el mismo prestigio que las villas que vendes?",
                                icon: <Star size={20} />
                            },
                            {
                                title: "Autoridad en Buscadores",
                                desc: "¿Apareces antes que tu competencia cuando buscan propiedades premium?",
                                icon: <TrendingUp size={20} />
                            },
                            {
                                title: "Cualificación Automática",
                                desc: "¿Tu sistema filtra a los curiosos para entregarte solo compradores reales?",
                                icon: <Users size={20} />
                            },
                            {
                                title: "Eficiencia Operativa",
                                desc: "¿Tu equipo invierte tiempo en procesos que deberían ser automáticos?",
                                icon: <Clock size={20} />
                            }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-5 p-4 rounded-xl hover:bg-[#E1E1D7] transition-colors group cursor-default">
                                <div className="mt-1 text-[#6599CB] group-hover:text-[#F2994B] transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h4 className="font-bold text-[#4F7B8C] mb-1">{item.title}</h4>
                                    <p className="text-sm text-[#2C3E50]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative reveal delay-200 hidden md:block">
                    <div className="aspect-[4/5] bg-[#E1E1D7] rounded-3xl p-8 relative overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                        <div className="text-center relative z-10">
                            <div className="inline-block p-6 rounded-full bg-[#6599CB]/10 mb-6">
                                <ShieldCheck size={48} className="text-[#6599CB]" />
                            </div>
                            <h3 className="type-h3 text-[#4F7B8C] mb-4">Coste de Oportunidad</h3>
                            <p className="text-[#2C3E50] max-w-xs mx-auto mb-8">
                                Una sola venta de lujo perdida por una mala primera impresión digital justifica toda la inversión en tu ecosistema.
                            </p>
                            <div className="inline-block px-6 py-2 bg-[#6599CB] text-white rounded-full text-sm font-bold shadow-lg">
                                Elevamos tu Valor
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const BentoEcosystem = () => (
    <section className="py-32 px-6">
        <div className="container mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 reveal">
                <div>
                    <span className="type-label text-[#6599CB] mb-4 block">La Solución</span>
                    <h2 className="type-h2 text-[#4F7B8C] max-w-2xl">
                        Un Ecosistema Digital <br />
                        <span className="text-[#6599CB]">Completamente Integrado</span>
                    </h2>
                </div>
                <p className="text-[#2C3E50] mt-6 md:mt-0 max-w-xs text-right hidden md:block">
                    No vendemos servicios aislados.<br />Creamos motores de crecimiento.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-auto md:h-[650px]">
                {/* Card 1: Main (Web) - Use Dark Petrol Blue BG with WHITE text */}
                <div className="md:col-span-2 md:row-span-2 bg-[#4F7B8C] text-white rounded-[2rem] p-10 flex flex-col justify-between hover-lift group reveal relative overflow-hidden">
                    <img
                        src={villaLujo}
                        alt="Villa de Lujo con Piscina Infinita"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#6599CB] rounded-full blur-3xl -mr-20 -mt-20 opacity-40"></div>

                    <div className="relative z-10">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-8 backdrop-blur-sm">
                            <LayoutIcon size={24} className="text-white" />
                        </div>
                        <h3 className="type-h2 mb-4">Presencia Digital Premium</h3>
                        <p className="text-white/90 max-w-md text-lg leading-relaxed">
                            Desarrollo web que no solo muestra propiedades, sino que vende un estilo de vida. Velocidad extrema, diseño minimalista y optimización móvil.
                        </p>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-3 relative z-10">
                        {['UX/UI Lujo', 'React.js', 'Velocidad', 'Conversión'].map(tag => (
                            <span key={tag} className="px-4 py-1.5 border border-white/20 rounded-full text-xs uppercase tracking-wider bg-white/5">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Card 2: SEO - White BG */}
                <div className="md:col-span-2 bg-white rounded-[2rem] p-10 shadow-sm border border-transparent hover:border-[#6599CB]/30 transition-all hover-lift reveal delay-100 flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 bg-[#6599CB]/10 rounded-xl flex items-center justify-center mb-6">
                            <Globe size={24} className="text-[#6599CB]" />
                        </div>
                        <h3 className="type-h3 text-[#4F7B8C] mb-3">Visibilidad Estratégica (SEO)</h3>
                        <p className="text-sm text-[#2C3E50] leading-relaxed">
                            Posicionamiento dominante para keywords de alto valor ("Villas Costa Brava", "Áticos Santiago"). No buscamos tráfico masivo, buscamos tráfico cualificado.
                        </p>
                    </div>
                </div>

                {/* Card 3: Ads - Brighter Blue BG with WHITE text */}
                <div className="md:col-span-1 bg-[#6599CB] text-white rounded-[2rem] p-8 hover-lift reveal delay-200 flex flex-col justify-between">
                    <Zap size={32} className="mb-4 text-[#F2994B]" />
                    <div>
                        <h3 className="text-xl font-bold mb-2">Google Ads & PPC</h3>
                        <p className="text-xs text-white/90 leading-relaxed">
                            Segmentación por patrimonio. Llegamos al inversor, no al curioso. ROI medible.
                        </p>
                    </div>
                </div>

                {/* Card 4: CRM - Cream BG */}
                <div className="md:col-span-1 bg-[#E1E1D7] border border-[#6599CB]/10 rounded-[2rem] p-8 hover-lift reveal delay-300 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#6599CB]/5"></div>
                    <MousePointer2 size={32} className="mb-4 text-[#4F7B8C] relative z-10" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold text-[#4F7B8C] mb-2">CRM & Nurturing</h3>
                        <p className="text-xs text-[#2C3E50] leading-relaxed">
                            Automatizaciones que nutren al lead mientras duermes. Integración total.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const SuccessMetrics = () => (
    <section className="py-24 px-6 bg-[#4F7B8C] text-white">
        <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-20 items-center">
                <div className="reveal">
                    <span className="type-label text-[#96D9CC] mb-4 block">Resultados Reales</span>
                    <h2 className="type-h2 mb-6">El Impacto de la Excelencia</h2>
                    <p className="text-white/80 mb-10 text-lg leading-relaxed">
                        Caso de estudio: Inmobiliaria Boutique en Costa Brava.
                        <br />
                        Pasamos de la invisibilidad digital a dominar el mercado local en 12 meses.
                    </p>

                    <div className="p-8 bg-[#6599CB] rounded-3xl border border-[#96D9CC]/30 relative shadow-2xl text-white">
                        <span className="text-6xl absolute -top-4 -left-4 text-[#F2994B] opacity-50 font-serif">"</span>
                        <p className="italic text-lg mb-6 relative z-10">
                            La diferencia es la calidad. Antes perdíamos horas filtrando correos basura.
                            Ahora, cuando entra un lead, sabemos que es una visita potencial real. Hemos recuperado nuestro tiempo.
                        </p>
                        <div className="flex items-center gap-4">
                            {/* IMAGEN 3: Avatar Testimonio */}
                            <img
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                alt="Director"
                                className="w-12 h-12 rounded-full border-2 border-[#E1E1D7] object-cover"
                            />
                            <div>
                                <p className="font-bold text-white">Roberto V.</p>
                                <p className="text-xs text-[#E1E1D7]">Director, Luxury Estates</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6 reveal delay-200">
                    <div className="bg-[#6599CB]/30 p-8 rounded-[2rem] backdrop-blur-sm border border-[#96D9CC]/20 flex flex-col justify-center text-center">
                        <TrendingUp className="text-[#F2994B] mx-auto mb-4" size={32} />
                        <p className="type-h2 mb-2 text-white">+120%</p>
                        <p className="type-label text-[#96D9CC]">Leads Cualificados</p>
                    </div>

                    <div className="bg-[#6599CB]/30 p-8 rounded-[2rem] backdrop-blur-sm border border-[#96D9CC]/20 flex flex-col justify-center text-center">
                        <Star className="text-[#F2994B] mx-auto mb-4" size={32} />
                        <p className="type-h2 mb-2 text-white">TOP 3</p>
                        <p className="type-label text-[#96D9CC]">Keywords Principales</p>
                    </div>

                    <div className="col-span-2 bg-[#E1E1D7] text-[#4F7B8C] p-8 rounded-[2rem] flex items-center justify-between">
                        <div>
                            <p className="type-label text-[#6599CB] mb-2">Crecimiento Tráfico Orgánico</p>
                            <p className="type-h2">3.5x</p>
                        </div>
                        <div className="flex items-end gap-2 h-16">
                            <div className="w-4 h-8 bg-[#6599CB]/20 rounded-t-lg"></div>
                            <div className="w-4 h-12 bg-[#6599CB]/50 rounded-t-lg"></div>
                            <div className="w-4 h-16 bg-[#6599CB] rounded-t-lg"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const StickyProcess = ({ navigateTo }) => (
    <section className="py-32 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-20">
                {/* Sticky Left Content */}
                <div className="lg:sticky lg:top-32 h-fit reveal">
                    <span className="type-label text-[#6599CB] mb-4 block">Metodología Transparente</span>
                    <h2 className="type-h2 text-[#4F7B8C] mb-8 leading-tight">
                        Simplicidad en el Proceso,<br />
                        Complejidad en el Resultado.
                    </h2>
                    <p className="text-[#2C3E50] max-w-md mb-10 text-lg">
                        Un roadmap claro de 4 fases diseñado para transformar tu presencia digital sin interrumpir tu operativa diaria.
                    </p>

                    {/* IMAGEN 4: Imagen de apoyo en sección Sticky */}
                    <div className="mb-8 rounded-2xl overflow-hidden aspect-[16/9] shadow-lg relative group">
                        <img
                            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                            alt="Team Strategy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[#6599CB]/20 mix-blend-multiply"></div>
                    </div>

                    <Button variant="secondary" onClick={() => navigateTo && navigateTo('contact')}>Iniciar Transformación</Button>
                </div>

                {/* Scrollable Right Content */}
                <div className="space-y-32 pt-12">
                    {[
                        {
                            num: "01",
                            title: "Auditoría Profunda (Gratis)",
                            desc: "No adivinamos. Analizamos tu web actual, tu posicionamiento y tu competencia para identificar oportunidades de mejora inmediatas.",
                            badge: "Valor: Incalculable"
                        },
                        {
                            num: "02",
                            title: "Estrategia & Propuesta",
                            desc: "Diseñamos un plan a medida con KPIs claros. Tendrás una hoja de ruta exacta de cómo vamos a lograr tus objetivos de captación.",
                            badge: "Plan Personalizado"
                        },
                        {
                            num: "03",
                            title: "Onboarding Profesional",
                            desc: "Implementamos tu ecosistema: nueva web, configuración de campañas y CRM. Todo llave en mano en un plazo garantizado.",
                            badge: "Sin Fricción"
                        },
                        {
                            num: "04",
                            title: "Optimización Continua",
                            desc: "El lanzamiento es solo el inicio. Analizamos datos mensualmente para mejorar la calidad del lead y tu retorno de inversión.",
                            badge: "Mejora Constante"
                        }
                    ].map((step, i) => (
                        <div key={i} className="reveal group border-l-2 border-[#E1E1D7] pl-10 hover:border-[#6599CB] transition-colors duration-500">
                            <span className="text-8xl font-bold text-[#E1E1D7] group-hover:text-[#6599CB]/10 transition-colors duration-300 block mb-6 -ml-2">{step.num}</span>
                            <div className="inline-block px-3 py-1 bg-[#6599CB]/5 text-[#6599CB] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                {step.badge}
                            </div>
                            <h3 className="text-3xl font-bold text-[#4F7B8C] mb-4">{step.title}</h3>
                            <p className="text-[#2C3E50] leading-relaxed text-lg">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const faqs = [
        {
            q: "¿Por qué limitan los clientes a solo 3 simultáneos?",
            a: "Para garantizar la excelencia. Nuestro modelo boutique asegura que los fundadores gestionen directamente tu estrategia, ofreciendo una atención y rapidez que las grandes agencias no pueden igualar."
        },
        {
            q: "¿Garantizan exclusividad geográfica?",
            a: "Absolutamente. Si trabajamos contigo en una zona específica (ej. La Moraleja o Marbella Milla de Oro), bloqueamos la entrada a tus competidores directos en esa área para no diluir resultados."
        },
        {
            q: "¿Cuánto tiempo toma ver resultados tangibles?",
            a: "Depende del canal. Google Ads genera tráfico cualificado desde la primera semana. El SEO y la autoridad de marca son activos que se construyen sólidamente entre el mes 3 y 6."
        },
        {
            q: "¿Qué obtengo realmente con la Auditoría Gratuita?",
            a: "Un diagnóstico honesto y profesional. Revisamos tu tecnología, tu visibilidad y tu conversión. Te llevas un plan de acción claro, independientemente de si decides trabajar con nosotros o no."
        }
    ];

    return (
        <section className="py-32 px-6 bg-white border-t border-[#E1E1D7]">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-16">
                    <span className="type-label text-[#6599CB] mb-4 block">Transparencia Radical</span>
                    <h2 className="type-h2 text-[#4F7B8C]">Preguntas Frecuentes</h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            title={faq.q}
                            content={faq.a}
                            isOpen={openIndex === i}
                            toggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ContactPage = () => (
    <div className="pt-40 pb-20 px-6 container mx-auto max-w-5xl animate-fade-in">
        <div className="text-center mb-20">
            <span className="type-label text-[#6599CB] mb-4 block">Aplicación Exclusiva</span>
            <h1 className="type-h1 text-[#4F7B8C] mb-6">Solicita tu Auditoría Estratégica</h1>
            <p className="text-[#2C3E50] max-w-xl mx-auto text-lg">
                Analizaremos tu potencial digital sin coste.
                <br />Solo trabajamos con agencias que comparten nuestra visión de excelencia.
            </p>
        </div>

        <div className="bg-white p-8 md:p-16 rounded-[2.5rem] shadow-xl border border-[#E1E1D7] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6599CB] rounded-full blur-3xl -mr-32 -mt-32 opacity-10 pointer-events-none"></div>

            <form className="space-y-8 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="type-label text-[#6599CB] ml-1">Nombre Completo</label>
                        <input type="text" className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] placeholder-[#4F7B8C]/40 focus:ring-2 focus:ring-[#6599CB] transition-all outline-none" placeholder="Ej. Roberto García" />
                    </div>
                    <div className="space-y-2">
                        <label className="type-label text-[#6599CB] ml-1">Agencia Inmobiliaria</label>
                        <input type="text" className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] placeholder-[#4F7B8C]/40 focus:ring-2 focus:ring-[#6599CB] transition-all outline-none" placeholder="Ej. Luxury Estates" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="type-label text-[#6599CB] ml-1">Email Corporativo</label>
                    <input type="email" className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] placeholder-[#4F7B8C]/40 focus:ring-2 focus:ring-[#6599CB] transition-all outline-none" placeholder="nombre@tuagencia.com" />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                        <label className="type-label text-[#6599CB] ml-1">Volumen de Cartera</label>
                        <select className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] focus:ring-2 focus:ring-[#6599CB] transition-all outline-none appearance-none cursor-pointer">
                            <option>Menos de 20 Propiedades</option>
                            <option>20 - 50 Propiedades</option>
                            <option>Más de 50 Propiedades</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="type-label text-[#6599CB] ml-1">Zona de Interés</label>
                        <input type="text" className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] placeholder-[#4F7B8C]/40 focus:ring-2 focus:ring-[#6599CB] transition-all outline-none" placeholder="Ej. Costa del Sol" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="type-label text-[#6599CB] ml-1">Principal Objetivo</label>
                    <textarea rows="3" className="w-full bg-[#E1E1D7] rounded-2xl border-none p-5 text-[#4F7B8C] placeholder-[#4F7B8C]/40 focus:ring-2 focus:ring-[#6599CB] transition-all outline-none" placeholder="Ej. Mejorar la calidad de los leads..."></textarea>
                </div>

                <div className="pt-4">
                    <Button className="w-full justify-center text-lg py-5" variant="accent">Solicitar Auditoría Gratuita</Button>
                </div>

                <p className="text-center text-xs text-[#96D9CC] flex items-center justify-center gap-2 mt-4 font-bold">
                    <ShieldCheck size={14} /> Tu información es confidencial y segura.
                </p>
            </form>
        </div>
    </div>
);

const Footer = ({ navigateTo }) => (
    <footer className="bg-[#4F7B8C] text-white pt-32 pb-12 px-6 rounded-t-[3rem] mt-20 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start mb-24 reveal">
                <div className="max-w-xl">
                    <h2 className="type-display mb-8">Construyamos <br /> tu Legado.</h2>
                    <p className="text-[#E1E1D7] mb-12 text-lg">
                        La excelencia digital no es una opción en el mercado de lujo. Es el estándar.
                    </p>
                    <Button variant="white" onClick={() => navigateTo && navigateTo('contact')}>Hablar con un Experto</Button>
                </div>
                <div className="mt-16 md:mt-0 flex flex-col gap-6 text-right">
                    {['Instagram', 'LinkedIn', 'Email'].map(link => (
                        <a key={link} href="#" className="text-2xl hover:text-[#96D9CC] transition-colors flex items-center justify-end gap-2 group text-white">
                            {link} <ArrowUpRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}
                </div>
            </div>

            <div className="border-t border-[#6599CB] pt-10 flex flex-col md:flex-row justify-between items-center text-[#96D9CC] text-sm">
                <div className="flex items-center gap-3 mb-6 md:mb-0">
                    <RukaLogo className="h-6" />
                    <span className="text-white">© 2025 RUK. AGENCY</span>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    <span className="cursor-pointer hover:text-white">Política de Privacidad</span>
                    <span className="cursor-pointer hover:text-white">Términos & Condiciones</span>
                    <span className="cursor-pointer hover:text-white">Aviso Legal</span>
                </div>
            </div>
        </div>

        {/* Background decoration */}
        <div className="absolute bottom-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
    </footer>
);

// --- MAIN APP ---

const Layout = ({ children, currentPage, navigateTo }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    useScrollReveal(currentPage);

    useEffect(() => window.scrollTo(0, 0), [currentPage]);

    return (
        <div className="min-h-screen flex flex-col justify-between selection:bg-[#6599CB] selection:text-white">
            <GlobalStyles />

            {/* Animated Background Blobs */}
            <div className="animated-blob blob-1"></div>
            <div className="animated-blob blob-2"></div>
            <div className="animated-blob blob-3"></div>

            <Navigation
                currentPage={currentPage}
                navigateTo={navigateTo}
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 bg-[#E1E1D7] flex flex-col justify-center items-center gap-8 p-6 animate-fade-in md:hidden">
                    {['home', 'services', 'proceso'].map((id) => (
                        <button
                            key={id}
                            onClick={() => { if (navigateTo) { navigateTo(id); setIsMobileMenuOpen(false); } }}
                            className="text-4xl font-bold text-[#4F7B8C] hover:text-[#6599CB]"
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </button>
                    ))}
                </div>
            )}

            <main className="flex-grow">
                {children}
            </main>

            <Footer navigateTo={navigateTo} />
        </div>
    );
};

export default function App() {
    const [page, setPage] = useState('home');

    return (
        <Layout currentPage={page} navigateTo={setPage}>
            {page === 'home' && (
                <>
                    <Hero navigateTo={setPage} />
                    <Marquee text="STRATEGY - DESIGN - DEVELOPMENT - GROWTH - " />
                    <DiagnosticSection />
                    <BentoEcosystem />
                    <SuccessMetrics />
                    <StickyProcess navigateTo={setPage} />
                    <FAQSection />
                    <section className="py-20 px-6">
                        <div className="container mx-auto max-w-7xl bg-[#6599CB] rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden reveal shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#96D9CC] rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>

                            <h2 className="type-h2 mb-8 relative z-10">¿Listo para escalar?</h2>
                            <div className="flex justify-center relative z-10">
                                <Button variant="white" onClick={() => setPage('contact')}>Solicitar Auditoría</Button>
                            </div>
                        </div>
                    </section>
                </>
            )}
            {page === 'services' && (
                <div className="pt-32">
                    <BentoEcosystem />
                    <SuccessMetrics />
                    <Marquee text="SEO - ADS - WEB - CRM - " />
                </div>
            )}
            {page === 'proceso' && (
                <div className="pt-32">
                    <StickyProcess navigateTo={setPage} />
                    <FAQSection />
                </div>
            )}
            {page === 'contact' && <ContactPage />}
        </Layout>
    );
}
