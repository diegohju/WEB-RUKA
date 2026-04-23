import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Menu, X, ArrowRight, ArrowUpRight, CheckCircle2,
    ChevronDown, Clock, TrendingUp, Target, Handshake, Bot, Users, MessageSquare,
    Sparkles, Layout, HelpCircle, Building2, AlertCircle, Zap, Star, BarChart3, ShieldCheck, Linkedin, MapPin, Mail, Phone
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { BlogPage, BlogPostPage } from './Blog.jsx';
import rukaLogo from '/public/ruka-logo.png';
import villaLujo from '/public/villa-lujo.jpg';
import diegoImg from '/public/diego.png';
import ievaImg from '/public/ieva.png';

// --- STYLES & ANIMATIONS ---
const GlobalStyles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap');
    
    :root {
      /* BRANDING COLOR PALETTE (RUKA) */
      --color-cream: #F2F2F0;       
      --color-teal: #6599CB;        
      --color-teal-dark: #4F7B8C;   
      --color-teal-light: #96D9CC;  
      --color-accent: #F2994B;      
      --color-text: #2C3E50;        
      --color-text-light: #64748B;  
      --color-white: #FFFFFF;
      
      /* THEME VARIABLES */
      --glass-border: rgba(255, 255, 255, 0.4);
      --glass-bg: rgba(255, 255, 255, 0.6);
      --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
    }

    body {
      font-family: 'Montserrat', sans-serif;
      background-color: var(--color-cream);
      color: var(--color-text);
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      /* Smooth scrolling optimizado */
      scroll-behavior: smooth;
    }

    /* Respetar preferencia de movimiento reducido */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
      body {
        scroll-behavior: auto;
      }
    }

    /* Ambient Background - Vibrant & Premium */
    body::before {
      content: '';
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      z-index: -1;
      background: 
        radial-gradient(circle at 15% 50%, rgba(101, 153, 203, 0.18), transparent 35%), 
        radial-gradient(circle at 85% 30%, rgba(150, 217, 204, 0.12), transparent 35%);
      pointer-events: none;
    }

    /* Premium Grain Overlay */
    .grain-overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: -1;
      opacity: 0.04;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='filter'%3BfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23filter)'/%3E%3C/svg%3E");
    }

    /* Ambient Blobs - Vivid & Animated */
    .animated-blob {
      position: fixed;
      border-radius: 50%;
      filter: blur(90px);
      opacity: 0.45;
      z-index: -2;
      pointer-events: none;
      will-change: transform;
      /* GPU acceleration */
      transform: translate3d(0,0,0);
      backface-visibility: hidden;
      contain: layout paint;
    }
    .blob-1 {
      width: 800px; height: 800px;
      background: var(--color-teal-light);
      top: -10%; right: -10%;
      animation: float-1 18s infinite ease-in-out;
    }
    .blob-3 {
      width: 900px; height: 900px;
      background: var(--color-teal);
      bottom: -15%; left: -10%;
      animation: float-3 22s infinite ease-in-out;
      opacity: 0.32;
    }
    .blob-4 {
      width: 700px; height: 700px;
      background: var(--color-teal-dark);
      top: 25%; left: 20%;
      animation: float-4 15s infinite ease-in-out;
      opacity: 0.28;
    }

    @keyframes float-1 {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      33% { transform: translate3d(-150px, 120px, 0) scale(1.15); }
      66% { transform: translate3d(80px, 150px, 0) scale(0.9); }
    }
    @keyframes float-3 {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      40% { transform: translate3d(180px, -150px, 0) scale(0.95); }
      80% { transform: translate3d(-120px, 90px, 0) scale(1.12); }
    }
    @keyframes float-4 {
      0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
      50% { transform: translate3d(-200px, -120px, 0) scale(1.2); }
    }

    /* Subtle background shift removed for cleaner look */

    /* Typography Scale (RUKA/Dreelio Mix) */
    .type-display { 
      font-size: clamp(3rem, 5vw, 72px); 
      font-variation-settings: normal;
      font-weight: 700; 
      letter-spacing: -2.16px;
      line-height: 1.1;
      margin-bottom: 0px;
      display: inline-block;
    }
    .type-h1 { 
      font-size: clamp(2.5rem, 5vw, 4rem); 
      line-height: 1.1; 
      font-weight: 800; 
      letter-spacing: -0.02em;
    }
    .type-h2 { 
      font-size: clamp(2rem, 4vw, 3rem); 
      line-height: 1.2; 
      font-weight: 700; 
      letter-spacing: -0.02em; 
    }
    .type-h3 { 
      font-size: 1.5rem; 
      line-height: 1.4; 
      font-weight: 600; 
    }
    .type-h2-serif {
      font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
      font-size: clamp(3rem, 5vw, 72px);
      font-style: italic;
      font-variation-settings: normal;
      font-weight: 300;
      letter-spacing: -2.16px;
      line-height: 1.1;
      display: inline-block;
    }
    .type-body { 
      font-size: 1.125rem; 
      line-height: 1.7; 
      font-weight: 400; 
      color: var(--color-text-light); 
    }
    .type-label { 
      font-size: 0.875rem; 
      font-weight: 700; 
      letter-spacing: 0.1em; 
      text-transform: uppercase; 
    }
    .type-label { 
      font-size: 0.75rem; 
      font-weight: 800; 
      letter-spacing: 0.15em; 
      text-transform: uppercase; 
    }

    /* --- GLASSMORPHISM SYSTEM (OPTIMIZED FOR PERFORMANCE) --- */
    .glass-panel {
      background: rgba(255, 255, 255, 0.4);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.3);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.05);
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease, background 0.4s ease;
      /* GPU acceleration and clip fixation */
      transform: translateZ(0);
      will-change: transform, opacity;
      contain: layout paint;
      overflow: hidden; /* Avoid square blur bleeding */
    }
    .glass-panel:hover {
      background: rgba(255, 255, 255, 0.6);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-4px) translateZ(0);
      box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.1);
    }

    /* --- UTILITIES --- */
    .container { width: 100%; margin-right: auto; margin-left: auto; padding-right: 1.5rem; padding-left: 1.5rem; }
    
    /* Animations */
    .reveal {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal.active {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hover-scale { transition: transform 0.3s ease; }
    .hover-scale:hover { transform: scale(1.02); }
    
    .page-fade-in { animation: fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    /* Accordion Transition */
    .accordion-content {
      transition: max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease;
      max-height: 0;
      opacity: 0;
      overflow: hidden;
    }
    .accordion-content.open {
      max-height: 400px;
      opacity: 1;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: var(--color-cream); }
    ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 5px; border: 2px solid var(--color-cream); }
    ::-webkit-scrollbar-thumb:hover { background: var(--color-teal); }

    /* Custom Typography Utilities (User Requested) */
    .italic {
        font-style: italic;
    }
    .font-light {
        font-weight: 300;
    }
    .font-serif {
        font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    }
  `}</style>
);

// --- HOOKS ---
const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

        const elements = document.querySelectorAll('.reveal:not(.active)');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

// --- COMPONENTS ---

const RukaLogo = ({ className = "h-10" }) => (
    <img src={rukaLogo} alt="Ruka Agency Logo" className={className} />
);

const Button = React.memo(({ children, variant = 'primary', className = '', onClick, icon = true }) => {
    const baseStyle = "px-8 py-4 rounded-full font-semibold text-base flex items-center justify-center gap-3 transition-all duration-300 group cursor-pointer relative overflow-hidden";
    // Using RUKA colors
    const variants = {
        primary: "bg-[#6599CB] text-white hover:bg-[#4F7B8C] shadow-lg hover:shadow-xl active:scale-95",
        accent: "bg-[#F2994B] text-white hover:bg-[#E0883B] shadow-lg hover:shadow-xl active:scale-95",
        secondary: "bg-transparent border border-[#6599CB] text-[#6599CB] hover:bg-[#6599CB] hover:text-white active:scale-95",
        glass: "bg-white/50 backdrop-blur-md border border-white/60 text-[#4F7B8C] hover:bg-white/80 active:scale-95",
        white: "bg-white text-[#2C3E50] hover:bg-slate-100 shadow-md active:scale-95"
    };

    return (
        <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
            <span className="relative z-10">{children}</span>
            {icon && <ArrowUpRight className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />}
        </button>
    );
});

const Badge = ({ children, variant = 'default' }) => {
    const variants = {
        default: "bg-[#6599CB]/10 text-[#6599CB] border-[#6599CB]/20",
        accent: "bg-[#F2994B]/10 text-[#F2994B] border-[#F2994B]/20",
        success: "bg-[#96D9CC]/20 text-[#4F7B8C] border-[#96D9CC]/40"
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${variants[variant]}`}>
            {children}
        </span>
    );
};



// --- COOKIE CONSENT COMPONENT (GDPR/EU COMPLIANCE) ---
const CookieConsent = () => {
    const { language } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [consent, setConsent] = useState({
        analytics: false,
        marketing: false
    });

    useEffect(() => {
        // Check if user has already made a choice
        const savedChoice = localStorage.getItem('cookie-consent');
        if (!savedChoice) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const updateGTM = (newConsent) => {
        if (typeof window.gtag === 'function') {
            window.gtag('consent', 'update', {
                'ad_storage': newConsent.marketing ? 'granted' : 'denied',
                'ad_user_data': newConsent.marketing ? 'granted' : 'denied',
                'ad_personalization': newConsent.marketing ? 'granted' : 'denied',
                'analytics_storage': newConsent.analytics ? 'granted' : 'denied'
            });
            
            // Trigger a dataLayer event for tags that don't support Consent Mode natively
            window.dataLayer.push({
                event: 'consent_updated',
                consent_settings: newConsent
            });
        }
    };

    const handleAcceptAll = () => {
        const newConsent = { analytics: true, marketing: true };
        setConsent(newConsent);
        localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
        updateGTM(newConsent);
        setIsVisible(false);
    };

    const handleRejectAll = () => {
        const newConsent = { analytics: false, marketing: false };
        setConsent(newConsent);
        localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
        updateGTM(newConsent);
        setIsVisible(false);
    };

    const handleSaveSettings = () => {
        localStorage.setItem('cookie-consent', JSON.stringify(consent));
        updateGTM(consent);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    const content = {
        es: {
            title: "Control de Privacidad",
            desc: "Utilizamos cookies para mejorar tu experiencia y analizar nuestro tráfico. Al hacer clic en \"Aceptar Todo\", consientes nuestro uso de cookies.",
            acceptAll: "Aceptar Todo",
            rejectAll: "Rechazar Todo",
            settings: "Configurar",
            save: "Guardar Preferencias",
            necessary: "Necesarias",
            necessaryDesc: "Esenciales para que el sitio funcione.",
            analytics: "Analíticas",
            analyticsDesc: "Nos ayudan a entender cómo usas la web.",
            marketing: "Marketing",
            marketingDesc: "Para mostrarte contenido relevante.",
        },
        en: {
            title: "Privacy Control",
            desc: "We use cookies to enhance your experience and analyze our traffic. By clicking \"Accept All\", you consent to our use of cookies.",
            acceptAll: "Accept All",
            rejectAll: "Reject All",
            settings: "Settings",
            save: "Save Preferences",
            necessary: "Necessary",
            necessaryDesc: "Essential for the site to function.",
            analytics: "Analytics",
            analyticsDesc: "Help us understand how you use the site.",
            marketing: "Marketing",
            marketingDesc: "To show you relevant content.",
        }
    };

    const t = content[language] || content.es;

    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:max-w-md z-[100]"
        >
            <div className="glass-panel p-6 rounded-[2rem] shadow-2xl border border-white/40 bg-white/70 backdrop-blur-2xl">
                {!showSettings ? (
                    <>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-[#6599CB]/10 rounded-full flex items-center justify-center text-[#6599CB]">
                                <ShieldCheck size={20} />
                            </div>
                            <h4 className="font-bold text-[#2C3E50]">{t.title}</h4>
                        </div>
                        <p className="text-sm text-[#64748B] mb-6 leading-relaxed">
                            {t.desc}
                        </p>
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <button 
                                    onClick={handleAcceptAll}
                                    className="flex-1 bg-[#4F7B8C] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#2C3E50] transition-colors"
                                >
                                    {t.acceptAll}
                                </button>
                                <button 
                                    onClick={handleRejectAll}
                                    className="flex-1 bg-slate-200 text-[#4F7B8C] py-3 rounded-xl font-bold text-sm hover:bg-slate-300 transition-colors"
                                >
                                    {t.rejectAll}
                                </button>
                            </div>
                            <button 
                                onClick={() => setShowSettings(true)}
                                className="text-xs font-bold text-[#6599CB] hover:underline py-1"
                            >
                                {t.settings}
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="font-bold text-[#2C3E50]">{t.settings}</h4>
                            <button onClick={() => setShowSettings(false)} className="text-[#64748B] hover:text-[#2C3E50]">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <div className="space-y-4 mb-8">
                            {/* Necessary */}
                            <div className="flex items-center justify-between gap-4 p-3 bg-white/40 rounded-xl border border-white/20">
                                <div>
                                    <p className="text-sm font-bold text-[#2C3E50]">{t.necessary}</p>
                                    <p className="text-[10px] text-[#64748B]">{t.necessaryDesc}</p>
                                </div>
                                <div className="w-10 h-5 bg-[#96D9CC] rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </div>
                            
                            {/* Analytics */}
                            <label className="flex items-center justify-between gap-4 p-3 bg-white/40 rounded-xl border border-white/20 cursor-pointer hover:bg-white/60 transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-[#2C3E50]">{t.analytics}</p>
                                    <p className="text-[10px] text-[#64748B]">{t.analyticsDesc}</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={consent.analytics}
                                    onChange={(e) => setConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                                />
                                <div className={`w-10 h-5 rounded-full relative transition-colors ${consent.analytics ? 'bg-[#6599CB]' : 'bg-slate-300'}`}>
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${consent.analytics ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </label>
                            
                            {/* Marketing */}
                            <label className="flex items-center justify-between gap-4 p-3 bg-white/40 rounded-xl border border-white/20 cursor-pointer hover:bg-white/60 transition-colors">
                                <div>
                                    <p className="text-sm font-bold text-[#2C3E50]">{t.marketing}</p>
                                    <p className="text-[10px] text-[#64748B]">{t.marketingDesc}</p>
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={consent.marketing}
                                    onChange={(e) => setConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                                />
                                <div className={`w-10 h-5 rounded-full relative transition-colors ${consent.marketing ? 'bg-[#F2994B]' : 'bg-slate-300'}`}>
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${consent.marketing ? 'right-1' : 'left-1'}`}></div>
                                </div>
                            </label>
                        </div>
                        
                        <button 
                            onClick={handleSaveSettings}
                            className="w-full bg-[#4F7B8C] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#2C3E50] transition-colors"
                        >
                            {t.save}
                        </button>
                    </>
                )}
            </div>
        </motion.div>
    );
};

// --- SECTIONS ---

// --- LANGUAGE CONTEXT ---
import { createContext, useContext } from 'react';

// Default export context
export const LanguageContext = createContext({
    language: 'es',
    setLanguageStr: () => {},
});

export const useLanguage = () => useContext(LanguageContext);

// --- COMPONENTES AUXILIARES ---
const LanguageToggle = ({ className, isFooter }) => {
    const { language, setLanguageStr } = useLanguage();
    
    // Configuración condicional de colores según si está en el footer o no
    const bgContainer = isFooter ? 'bg-white/10 border-white/20' : 'bg-white/20 border-slate-200/50';
    const bgActive = isFooter ? 'bg-[#96D9CC] text-[#2C3E50]' : 'bg-[#4F7B8C] text-white';
    const bgInactive = isFooter ? 'text-white/80 hover:text-white hover:bg-white/20' : 'text-[#4F7B8C] hover:bg-white/50';

    return (
        <div className={`flex gap-1.5 items-center backdrop-blur-md px-1.5 py-1.5 rounded-full border shadow-sm relative z-50 pointer-events-auto ${bgContainer} ${className || ''}`}>
            <button
                onClick={(e) => { e.stopPropagation(); setLanguageStr('es'); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'es' ? `${bgActive} shadow-md` : bgInactive}`}
            >
                ES
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); setLanguageStr('en'); }}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? `${bgActive} shadow-md` : bgInactive}`}
            >
                EN
            </button>
        </div>
    );
};

const Navigation = ({ navigateTo, currentPage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { language } = useLanguage();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        // Verificar posicion inicial
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = {
        es: [
            { id: 'home', label: 'Inicio' },
            { id: 'servicios', label: 'Servicios' },
            { id: 'proceso', label: 'Proceso' },
            { id: 'blog', label: 'Blog' },
            { id: 'sobre-nosotros', label: 'Sobre Nosotros' },
        ],
        en: [
            { id: 'home', label: 'Home' },
            { id: 'servicios', label: 'Services' },
            { id: 'proceso', label: 'Process' },
            { id: 'blog', label: 'Blog' },
            { id: 'sobre-nosotros', label: 'About Us' },
        ]
    };
    const currentMenu = menuItems[language] || menuItems.es;

    const handleNavClick = (id) => {
        navigateTo(id);
        setMobileMenuOpen(false);
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-700 ease-in-out ${scrolled ? 'py-4 translate-y-0 opacity-100' : 'py-8'}`}>
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className={`pointer-events-auto transition-all duration-700 ease-in-out flex items-center justify-between ${scrolled ? 'glass-panel px-6 py-3 rounded-full' : 'px-2 py-2'}`}>
                        {/* Logo */}
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => handleNavClick('home')}>
                            <RukaLogo className="h-14 md:h-16 group-hover:scale-105 transition-transform origin-left" />
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-4">
                            {/* Toggle de idioma siempre visible aquí SOLO cuando NO hay scroll */}
                            <div className={`transition-all duration-500 overflow-hidden ${!scrolled ? 'opacity-100 max-w-[100px] pointer-events-auto' : 'opacity-0 max-w-0 pointer-events-none'}`}>
                                <LanguageToggle />
                            </div>

                            {/* CTA (Aparece al hacer scroll) */}
                            <div className={`transition-all duration-500 overflow-hidden ${scrolled ? 'opacity-100 translate-x-0 max-w-lg pointer-events-auto' : 'opacity-0 translate-x-10 max-w-0 pointer-events-none'}`}>
                                <Button
                                    variant="primary"
                                    className="text-sm px-6 py-2.5 hidden sm:flex !rounded-full"
                                    onClick={() => navigateTo('contacto')}
                                    icon={false}
                                >
                                    {language === 'es' ? 'Auditoría Gratuita' : 'Free Audit'}
                                </Button>
                            </div>

                            {/* Hamburger 항상 보이도록 / always visible */}
                            <button
                                className="text-[#4F7B8C] p-2 hover:bg-[#F5F5F5] rounded-full transition-colors relative z-50 shrink-0 pointer-events-auto"
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Full Screen Menu */}
            <div className={`fixed inset-0 z-40 bg-[#F2F2F0] transition-all duration-500 ease-in-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6599CB]/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F2994B]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                <div className="h-full flex flex-col justify-center items-center relative z-10 px-6">
                    <div className="absolute top-8 right-24 md:right-32">
                        <LanguageToggle />
                    </div>
                    
                    <div className="flex flex-col gap-6 text-center max-w-2xl w-full mt-10">
                        {currentMenu.map(({ id, label }, idx) => (
                            <button
                                key={id}
                                onClick={() => handleNavClick(id)}
                                style={{ transitionDelay: `${idx * 50}ms` }}
                                className={`text-3xl md:text-5xl font-bold transition-all duration-300 transform hover:scale-105 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                                    } ${currentPage === id
                                        ? 'text-[#6599CB]'
                                        : 'text-[#2C3E50] hover:text-[#6599CB]'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                        <div className={`h-px bg-slate-200 my-8 w-24 mx-auto transition-all duration-500 delay-300 ${mobileMenuOpen ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
                        <div className={`transition-all duration-500 delay-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <Button
                                variant="accent"
                                className="inline-flex text-lg px-10 py-4"
                                onClick={() => handleNavClick('contacto')}
                            >
                                {language === 'es' ? 'Solicitar Auditoría Gratuita' : 'Request Free Audit'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Hero = ({ navigateTo }) => {
    useScrollReveal();
    const { language } = useLanguage();

    return (
        <section className="min-h-screen pt-40 pb-32 px-6 flex items-center relative overflow-hidden">
            {/* Premium Background Background Layers */}
            <div className="grain-overlay"></div>
            <div className="animated-blob blob-1"></div>
            <div className="animated-blob blob-3"></div>
            <div className="animated-blob blob-4"></div>

            <div className="container mx-auto max-w-7xl relative z-10 text-center flex flex-col items-center">
                <div className="max-w-5xl">
                    <div className="reveal mb-8 inline-flex items-center justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F2994B] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F2994B]"></span>
                            </span>
                            {language === 'es' ? 'PLAZAS DISPONIBLES PARA 2026' : 'SPOTS AVAILABLE FOR 2026'}
                        </div>
                    </div>

                    <h1 className="reveal mb-8 text-center text-[#4F7B8C]">
                        <span className="type-display font-bold uppercase tracking-tight mb-2">
                            {language === 'es' ? 'MARKETING DIGITAL' : 'DIGITAL MARKETING'}
                        </span>
                        <br />
                        <span className="type-h2-serif text-[#6599CB]">
                            {language === 'es' ? 'para Inmobiliarias Boutique' : 'for Boutique Real Estate'}
                        </span>
                    </h1>

                    <p className="reveal type-body text-[#64748B] mb-10 max-w-3xl mx-auto text-lg leading-relaxed">
                        {language === 'es' 
                            ? 'Transformamos tu presencia online en un activo tan valioso como las propiedades que administras. Modelo de trabajo selectivo para garantizar atención personalizada y resultados medibles.'
                            : 'We transform your online presence into an asset as valuable as the properties you manage. Selective work model to guarantee personalized attention and measurable results.'}
                    </p>

                    <div className="reveal flex flex-col sm:flex-row gap-5 mb-16 justify-center">
                        <Button variant="accent" className="min-w-[280px]" onClick={() => navigateTo('contacto')}>
                            {language === 'es' ? 'Solicitar Auditoría Gratuita' : 'Request Free Audit'}
                        </Button>
                        <Button variant="secondary" className="min-w-[280px]" onClick={() => document.getElementById('problem-section')?.scrollIntoView({ behavior: 'smooth' })}>
                            {language === 'es' ? 'Ver Cómo Trabajamos' : 'See How We Work'}
                        </Button>
                    </div>

                    {/* Trust Bar - Simplified */}
                    <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#6599CB]/20 pt-8 max-w-4xl mx-auto opacity-80">
                        <div className="flex items-center justify-center gap-3 text-[#64748B]">
                            <Clock className="text-[#6599CB]" size={18} />
                            <span className="font-medium text-sm">{language === 'es' ? '10+ Años Experiencia' : '10+ Years Experience'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-[#64748B]">
                            <TrendingUp className="text-[#6599CB]" size={18} />
                            <span className="font-medium text-sm">{language === 'es' ? '+100% Leads/Año' : '+100% Leads/Year'}</span>
                        </div>
                        <div className="flex items-center justify-center gap-3 text-[#64748B]">
                            <Building2 className="text-[#6599CB]" size={18} />
                            <span className="font-medium text-sm">{language === 'es' ? 'Solo Real Estate' : 'Only Real Estate'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ProblemCard = React.memo(({ prob, index, total, progress }) => {
    const rangeStep = 1 / total;

    // Entry Animation: Card slides up from bottom
    // Card 0 is always present (no slide in), others slide in as their turn approaches
    const entryStart = Math.max(0, (index - 1) * rangeStep);
    const entryEnd = index * rangeStep; // Fully visible by this point

    const isFirst = index === 0;
    const y = useTransform(
        progress,
        [entryStart, entryEnd],
        [isFirst ? '0vh' : '110vh', '0vh']
    );

    // Scaling/Depth Animation: Happens as subsequent cards cover this one
    // Starts when the NEXT card begins its entry
    const scaleStart = index * rangeStep;
    const scaleEnd = 1;

    // As we scroll past, this card scales down to create depth
    const scale = useTransform(
        progress,
        [scaleStart, scaleEnd],
        [1, isFirst ? 0.8 : 1 - ((total - index) * 0.05)]
    );

    const brightness = useTransform(
        progress,
        [scaleStart, scaleEnd],
        [1, 0.5]
    );

    return (
        <div className="h-screen sticky top-0 flex items-center justify-center pointer-events-none w-full">
            <motion.div
                style={{
                    scale,
                    y,
                    filter: `brightness(${brightness})`,
                    zIndex: index
                }}
                className="glass-panel p-12 md:p-16 rounded-[4rem] flex flex-col md:flex-row items-center gap-12 w-full max-w-5xl overflow-hidden group shadow-2xl relative pointer-events-auto backdrop-blur-2xl border border-white/20 origin-top"
            >
                {/* Background Number */}
                <div className="absolute top-0 right-0 text-[15rem] font-black leading-none text-[#6599CB]/5 select-none -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110 group-hover:text-[#6599CB]/10">
                    {prob.num}
                </div>

                <div className="shrink-0 relative z-10">
                    <span className="text-sm font-bold tracking-widest text-[#6599CB] bg-[#6599CB]/10 px-4 py-2 rounded-full">
                        {prob.num}
                    </span>
                </div>

                <div className="relative z-10 max-w-2xl">
                    <h4 className="text-3xl md:text-5xl font-black text-[#2C3E50] mb-6 tracking-tight group-hover:text-[#4F7B8C] transition-colors leading-tight">
                        {prob.title}
                    </h4>
                    <p className="type-body text-xl md:text-2xl text-[#64748B] leading-relaxed font-medium">
                        {prob.desc}
                    </p>
                </div>
            </motion.div>
        </div>
    );
});

const FinalProblemCard = React.memo(({ index, total, progress }) => {
    const rangeStep = 1 / total;
    const { language } = useLanguage();

    // Entry Animation
    const entryStart = (index - 1) * rangeStep;
    const entryEnd = index * rangeStep;

    const y = useTransform(
        progress,
        [entryStart, entryEnd],
        ['110vh', '0vh']
    );

    // No scale down for the last card (it stays on top)
    // But previous cards scale down under it

    return (
        <div className="h-screen sticky top-0 flex items-center justify-center pointer-events-none w-full">
            <motion.div
                style={{
                    y,
                    zIndex: index
                }}
                className="glass-panel p-12 md:p-20 rounded-[4rem] bg-white/90 text-[#4F7B8C] flex flex-col md:flex-row justify-between items-center gap-12 w-full max-w-5xl shadow-2xl relative pointer-events-auto backdrop-blur-3xl border border-[#6599CB]/20"
            >
                <div className="max-w-xl text-center md:text-left">
                    <Sparkles className="text-[#F2994B] mb-8" size={64} />
                    <h3 className="text-[#4F7B8C] text-4xl md:text-6xl font-black mb-8 tracking-tight leading-tight">
                        {language === 'es' ? '¿Te suena familiar?' : 'Sound familiar?'}
                    </h3>
                    <p className="text-[#4F7B8C] text-xl md:text-2xl font-medium leading-relaxed opacity-90">
                        {language === 'es' 
                            ? 'Deja de ser un espectador. Convierte tu presencia digital en la herramienta más potente de tu inmobiliaria.' 
                            : 'Stop being a spectator. Turn your digital presence into your real estate agency\'s most powerful tool.'}
                    </p>
                </div>
                <Button
                    variant="accent"
                    className="shrink-0 text-xl px-16 py-8 rounded-2xl shadow-xl hover:scale-105 transition-transform"
                    onClick={() => document.getElementById('solution-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    {language === 'es' ? 'Evolucionar Ahora' : 'Evolve Now'}
                </Button>
            </motion.div>
        </div>
    );
});

const ProblemSection = () => {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    const { language } = useLanguage();

    const problems = language === 'es' ? [
        { num: "01", title: "Web Anticuada", desc: "No refleja la exclusividad de las propiedades que vendes. Los compradores de propiedades premium esperan un experiencia digital fluida." },
        { num: "02", title: "Invisibles en Google", desc: "Tus clientes potenciales no te encuentran. Si no estás en el Top 3 local, estás trabajando para tu competencia." },
        { num: "03", title: "Leads de Baja Calidad", desc: "Muchas consultas, pocas ventas. Filtramos y cualificamos el tráfico para que tu equipo solo hable con interesados reales." },
        { num: "04", title: "Procesos Manuales", desc: "Tu equipo pierde tiempo valioso en gestiones repetitivas en lugar de estar automatizadas. Responder emails uno por uno, actualizar manualmente portales, hacer seguimiento con Excel." },
        { num: "05", title: "Sin Métricas Claras", desc: "Inviertes sin saber qué retorno obtienes en marketing digital, qué funciona y qué no. ¿Ese anuncio generó ventas reales? ¿El SEO está trayendo compradores o solo visitantes?" }
    ] : [
        { num: "01", title: "Outdated Website", desc: "It doesn't reflect the exclusivity of the properties you sell. Premium buyers expect a seamless digital experience." },
        { num: "02", title: "Invisible on Google", desc: "Your potential clients can't find you. If you're not in the local Top 3, you're working for your competition." },
        { num: "03", title: "Low Quality Leads", desc: "Many inquiries, few sales. We filter and qualify traffic so your team only talks to genuinely interested prospects." },
        { num: "04", title: "Manual Processes", desc: "Your team wastes valuable time on repetitive tasks instead of them being automated. Replying to emails one by one, manually updating portals, tracking with Excel." },
        { num: "05", title: "No Clear Metrics", desc: "You invest without knowing your ROI, what works and what doesn't. Did that ad generate real sales? Is SEO bringing buyers or just visitors?" }
    ];

    // Total de items en el stack = problemas + 1 carta final
    const totalCards = problems.length + 1;

    return (
        <section id="problem-section" ref={container} className="relative z-10">
            {/* Header section with refined layout */}
            <div className="pt-32 pb-24 px-6 container mx-auto max-w-7xl relative text-center flex flex-col items-center">
                <div className="mb-14 inline-flex items-center justify-center">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                        <AlertCircle className="text-[#F2994B]" size={16} />
                        {language === 'es' ? 'EL DESAFÍO' : 'THE CHALLENGE'}
                    </div>
                </div>

                <h2 className="mb-6 mx-auto text-center px-4 w-full text-[#4F7B8C]">
                    <span className="type-display">
                        {language === 'es' ? 'Tus propiedades son excepcionales...' : 'Your properties are exceptional...'}
                    </span>
                    <br />
                    <span className="type-h2-serif text-[#6599CB]">
                        {language === 'es' ? '¿Y tu presencia digital?' : 'What about your digital presence?'}
                    </span>
                </h2>
                <p className="type-body text-[#64748B] text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-0">
                    {language === 'es' 
                        ? 'Muchas inmobiliarias invierten en acciones sueltas de marketing digital sin una estrategia integrada. El resultado: baja visibilidad, leads poco cualificados y equipos saturados.'
                        : 'Many real estate agencies invest in isolated digital marketing actions without an integrated strategy. The result: low visibility, unqualified leads, and overwhelmed teams.'}
                </p>
            </div>

            <div className="px-6 container mx-auto max-w-7xl relative -mt-32">
                {/* 
                    Ajuste de altura: 
                    Necesitamos espacio suficiente para el scroll de todas las cartas. 
                    problems.length * 100vh suele ser una buena medida base.
                */}
                <div className="relative h-[600vh]">
                    {problems.map((prob, i) => (
                        <ProblemCard
                            key={i}
                            prob={prob}
                            index={i}
                            total={totalCards} // Usamos el total corregido
                            progress={scrollYProgress}
                        />
                    ))}

                    {/* Usamos el componente especializado para la última carta */}
                    <FinalProblemCard
                        index={problems.length} // índice siguiente al último problema
                        total={totalCards}
                        progress={scrollYProgress}
                    />
                </div>
            </div>
            {/* Buffer final ajustado */}
            <div className="h-[15vh]" />
        </section>
    );
};

const SolutionSection = () => {
    useScrollReveal();
    const { language } = useLanguage();

    return (
        <section id="solution-section" className="py-32 px-6 relative z-20">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16 flex flex-col items-center">
                    <div className="mb-14 inline-flex items-center justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                            <CheckCircle2 className="text-[#F2994B]" size={16} />
                            {language === 'es' ? 'LA SOLUCIÓN' : 'THE SOLUTION'}
                        </div>
                    </div>

                    <h2 className="mb-8 w-full max-w-6xl mx-auto text-center text-[#4F7B8C]">
                        <span className="type-display tracking-tight mb-2">
                            {language === 'es' ? 'Un sistema completo de' : 'A complete ecosystem for'}
                        </span>
                        <br />
                        <span className="type-h2-serif text-[#6599CB]">
                            {language === 'es' ? 'marketing digital inmobiliario' : 'real estate digital marketing'}
                        </span>
                    </h2>
                    <p className="type-body text-[#64748B] text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-0">
                        {language === 'es' 
                            ? 'No somos un proveedor más. Diseñamos ecosistemas donde cada pieza trabaja para captar, cualificar y convertir.' 
                            : 'We are not just another vendor. We design ecosystems where every piece works to attract, qualify, and convert.'}
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Col 1 */}
                    <div className="glass-panel p-8 rounded-[2rem] flex flex-col items-start text-left">
                        <div className="w-14 h-14 bg-[#6599CB]/10 rounded-2xl flex items-center justify-center text-[#6599CB] mb-5">
                            <Target size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-3 uppercase tracking-wider">{language === 'es' ? 'Especialización' : 'Specialization'}</h3>
                        <p className="text-[#6599CB] text-sm font-semibold mb-2">
                            100% Real Estate Premium
                        </p>
                        <p className="text-[#64748B] text-sm leading-relaxed mb-2">
                            {language === 'es' 
                            ? 'Solo trabajamos con inmobiliarias de valor agregado. No hacemos de todo para todos.' 
                            : 'We only work with value-added real estate agencies. We don\'t do everything for everyone.'}
                        </p>
                        <p className="text-[#64748B] text-sm font-medium mb-4">
                            {language === 'es' ? 'Entendemos:' : 'We understand:'}
                        </p>
                        <ul className="text-[#64748B] text-sm space-y-2">
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Tu mercado' : 'Your market'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Tu buyer persona' : 'Your buyer persona'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Tu ciclo de venta largo' : 'Your long sales cycle'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Tus necesidades como negocio inmobiliario' : 'Your needs as a real estate business'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Las últimas tendencias en marketing inmobiliario' : 'The latest trends in real estate marketing'}</li>
                        </ul>
                    </div>

                    {/* Col 2 */}
                    <div className="glass-panel p-8 rounded-[2rem] flex flex-col items-start text-left ring-2 ring-[#6599CB]/20 relative">
                        <div className="absolute top-4 right-4 text-xs font-bold text-[#F2994B] bg-[#F2994B]/10 px-2 py-1 rounded">CORE</div>
                        <div className="w-14 h-14 bg-[#F2994B]/10 rounded-2xl flex items-center justify-center text-[#F2994B] mb-5">
                            <Layout size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-2 uppercase tracking-wider">{language === 'es' ? 'Ecosistema' : 'Ecosystem'}</h3>
                        <p className="text-[#6599CB] text-sm font-semibold mb-2">
                            Web + SEO + {language === 'es' ? 'Publicidad' : 'Ads'} + Email Marketing + CRM + {language === 'es' ? 'Automatización' : 'Automation'}
                        </p>
                        <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                            {language === 'es' ? 'Haremos que todo trabaje sincronizado como un sistema.' : 'We will make everything work synchronized as a system.'}
                        </p>
                        <ul className="text-[#64748B] text-sm space-y-2">
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Web optimizada para conversión' : 'Conversion-optimized website'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'SEO que te posiciona donde tus compradores buscan' : 'SEO that ranks you where your buyers search'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Anuncios que traen clientes cualificados evitando curiosos' : 'Ads that bring qualified clients, avoiding tire kickers'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'CRM que gestiona y nutre cada oportunidad' : 'CRM that manages and nurtures every opportunity'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Automatizaciones que liberan tiempo de tu equipo' : 'Automations that free up your team\'s time'}</li>
                        </ul>
                    </div>

                    {/* Col 3 */}
                    <div className="glass-panel p-8 rounded-[2rem] flex flex-col items-start text-left">
                        <div className="w-14 h-14 bg-[#2C3E50]/10 rounded-2xl flex items-center justify-center text-[#2C3E50] mb-5">
                            <Handshake size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-[#2C3E50] mb-2 uppercase tracking-wider">Partners</h3>
                        <p className="text-[#6599CB] text-sm font-semibold mb-2">
                            {language === 'es' ? 'Relación a Largo Plazo' : 'Long-Term Relationship'}
                        </p>
                        <p className="text-[#64748B] text-sm leading-relaxed mb-4">
                            {language === 'es' ? 'Nos involucramos como un miembro estratégico de tu equipo.' : 'We get involved as a strategic team member.'}
                        </p>
                        <ul className="text-[#64748B] text-sm space-y-2">
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Acceso directo por WhatsApp cuando necesites' : 'Direct WhatsApp access whenever you need us'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Reuniones mensuales para optimizar' : 'Monthly optimization meetings'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Evolución continua basada en datos' : 'Data-driven continuous evolution'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Propiedad total de todo lo que creamos (es tuyo)' : 'Full ownership of everything we create (it\'s yours)'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Sin permanencias: te quedas porque funciona' : 'No lock-in periods: stay because it works'}</li>
                            <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#6599CB] shrink-0 mt-1.5"></span> {language === 'es' ? 'Capacidad de traducir marketing a números empresariales' : 'Ability to translate marketing into business numbers'}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service, index }) => {
    const ref = useRef(null);
    const { language } = useLanguage();

    const serviceLabels = language === 'es' ? [
        'DISEÑO WEB',
        'POSICIONAMIENTO',
        'CAPTACIÓN',
        'AUTOMATIZACIÓN',
        'NURTURING',
        'OPTIMIZACIÓN',
    ] : [
        'WEB DESIGN',
        'SEO',
        'LEAD GENERATION',
        'AUTOMATION',
        'NURTURING',
        'OPTIMIZATION',
    ];

    const accentColors = [
        '#6599CB',
        '#F2994B',
        '#6599CB',
        '#F2994B',
        '#6599CB',
        '#F2994B',
    ];

    const color = accentColors[index];
    const label = serviceLabels[index];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative glass-panel rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-2xl hover:bg-white/50"
        >
            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                style={{ background: `radial-gradient(ellipse at top left, ${color}08 0%, transparent 70%)` }}
            />

            <div className="relative p-10 pb-8">
                {/* Ghost number */}
                <div
                    className="absolute top-4 right-6 text-[9rem] font-black leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                    style={{ color: `${color}12` }}
                >
                    {service.num}
                </div>

                {/* Category badge */}
                <div className="mb-6">
                    <span
                        className="inline-flex items-center gap-2 text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                        style={{ color, background: `${color}12`, border: `1px solid ${color}25` }}
                    >
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: color }}
                        />
                        {label}
                    </span>
                </div>

                {/* Title */}
                <h3
                    className="text-2xl md:text-3xl font-black text-[#2C3E50] mb-4 leading-tight tracking-tight transition-colors duration-300 group-hover:text-[#4F7B8C] max-w-xs"
                >
                    {service.title}
                </h3>



                {/* Description */}
                <p className="text-[#64748B] text-base leading-relaxed max-w-sm">
                    {service.desc}
                </p>

                {/* Bottom row */}
                <div className="mt-8 flex justify-end">
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                        style={{ background: `${color}15`, color }}
                    >
                        <ArrowUpRight size={16} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const ServicesSection = ({ navigateTo }) => {
    const sectionRef = useRef(null);
    const { language } = useLanguage();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    // Subtle parallax on the left image
    const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

    const services = language === 'es' ? [
        { num: "01", title: "Presencia Premium", desc: "Webs alineadas con el nivel de tus propiedades y clientes. Diseño elegante, optimizado para convertir y autoridad." },
        { num: "02", title: "Visibilidad SEO", desc: "Posicionamiento local para que te encuentren los compradores exactos cuando buscan propiedades en tu zona." },
        { num: "03", title: "Publicidad Ads", desc: "Publicidad segmentada en Google y Redes Sociales. Campañas enfocadas en compradores reales, no en tráfico genérico." },
        { num: "04", title: "CRM & Gestión", desc: "Seguimiento inteligente y automatización de leads. Tu equipo solo habla con interesados cualificados." },
        { num: "05", title: "Email Marketing", desc: "Campañas de email segmentadas: nutre tu base de datos, reactiva contactos y convierte prospectos en compradores con secuencias automatizadas." },
        { num: "06", title: "Mejora Continua", desc: "Analítica mensual detallada. Optimizamos cada euro de tu inversión mes a mes basada en datos y comportamiento real del cliente." }
    ] : [
        { num: "01", title: "Premium Presence", desc: "Websites aligned with the level of your properties and clients. Elegant design, optimized to convert and build authority." },
        { num: "02", title: "SEO Visibility", desc: "Local positioning so the exact buyers find you when searching for properties in your area." },
        { num: "03", title: "Ad Campaigns", desc: "Targeted advertising on Google and Social Media. Campaigns strictly focused on real buyers, not generic traffic." },
        { num: "04", title: "CRM & Management", desc: "Intelligent tracking and lead automation. Your team only talks to qualified prospects." },
        { num: "05", title: "Email Marketing", desc: "Segmented email campaigns: nurture your database, reactivate contacts and turn prospects into buyers with automated sequences." },
        { num: "06", title: "Continuous Improvement", desc: "Detailed monthly analytics. We optimize every euro of your investment month by month based on data and real client behavior." }
    ];

    return (
        <section
            id="services-section"
            ref={sectionRef}
            className="relative z-10"
            style={{ minHeight: `${60 + services.length * 22}vh` }}
        >
            <div className="container mx-auto max-w-7xl px-6 py-32">
                <div className="flex flex-col lg:flex-row gap-16 items-start">

                    {/* ── LEFT COLUMN — Sticky ── */}
                    <div className="lg:w-[42%] lg:sticky lg:top-32 flex flex-col gap-8">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex"
                        >
                            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm">
                                <Zap className="text-[#F2994B]" size={14} />
                                {language === 'es' ? 'NUESTRO MÉTODO' : 'OUR METHOD'}
                            </div>
                        </motion.div>

                        {/* Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.55, delay: 0.1 }}
                        >
                            <h2 className="leading-[1.1] mb-4">
                                <span className="type-display block !text-4xl md:!text-5xl !text-[#4F7B8C] font-black uppercase tracking-tight mb-1">
                                    {language === 'es' ? 'Seis pilares.' : 'Six pillars.'}
                                </span>
                                <span className="type-h2 block text-[#6599CB] italic font-light font-serif">
                                    {language === 'es' ? 'Un sistema que vende.' : 'A system that sells.'}
                                </span>
                            </h2>
                            <p className="type-body text-[#64748B] text-base leading-relaxed max-w-sm">
                                {language === 'es' 
                                    ? 'Desde el primer contacto hasta la venta. Cada pieza diseñada para captar, cualificar y convertir.' 
                                    : 'From the first contact to the sale. Every piece designed to attract, qualify, and convert.'}
                            </p>
                        </motion.div>

                        {/* Image with parallax */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/3]"
                        >
                            <motion.img
                                src={villaLujo}
                                alt="Propiedad de lujo gestionada por Ruka Agency"
                                className="w-full h-full object-cover"
                                style={{ y: imageY }}
                            />
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/60 via-transparent to-transparent" />
                            {/* Stat chip */}
                            <div className="absolute bottom-5 left-5 right-5 glass-panel rounded-2xl px-5 py-3 flex items-center justify-between backdrop-blur-md border border-white/30">
                                <div>
                                    <p className="text-white text-xs font-medium opacity-70">{language === 'es' ? 'Resultado medio' : 'Average result'}</p>
                                    <p className="text-white text-lg font-black">{language === 'es' ? '+100% Leads / Año' : '+100% Leads / Year'}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-[#F2994B]/90 flex items-center justify-center">
                                    <TrendingUp size={18} className="text-white" />
                                </div>
                            </div>
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                        >
                            <Button
                                variant="accent"
                                className="w-full justify-center"
                                onClick={() => navigateTo && navigateTo('contacto')}
                            >
                                {language === 'es' ? 'Solicitar Auditoría Gratuita' : 'Request Free Audit'}
                            </Button>
                        </motion.div>
                    </div>

                    {/* ── RIGHT COLUMN — Scrolling cards ── */}
                    <div className="lg:w-[58%] flex flex-col gap-5 pt-4 lg:pt-0">
                        {services.map((service, i) => (
                            <ServiceCard key={i} service={service} index={i} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

const DifferentiatorsSection = () => {
    useScrollReveal();
    const { language } = useLanguage();

    const differentiators = language === 'es' ? [
        { title: "Solo Real Estate", desc: "100% enfocados en tu sector.", icon: <Building2 size={20} /> },
        { title: "Modelo Boutique", desc: "Pocos clientes, máxima atención.", icon: <Users size={20} /> },
        { title: "Ecosistema 360", desc: "Todo integrado, sin parches.", icon: <Layout size={20} /> },
        { title: "Tecnología Avanzada", desc: "Automatización e IA real.", icon: <Bot size={20} /> },
        { title: "Trato Directo", desc: "Hablas con los dueños.", icon: <MessageSquare size={20} /> },
        { title: "Proactividad", desc: "Nos adelantamos al mercado.", icon: <TrendingUp size={20} /> }
    ] : [
        { title: "Only Real Estate", desc: "100% focused on your sector.", icon: <Building2 size={20} /> },
        { title: "Boutique Model", desc: "Few clients, maximum attention.", icon: <Users size={20} /> },
        { title: "360 Ecosystem", desc: "Fully integrated, no patches.", icon: <Layout size={20} /> },
        { title: "Advanced Tech", desc: "Actual automation & AI.", icon: <Bot size={20} /> },
        { title: "Direct Contact", desc: "You talk directly to the owners.", icon: <MessageSquare size={20} /> },
        { title: "Proactivity", desc: "We anticipate market trends.", icon: <TrendingUp size={20} /> }
    ];

    return (
        <section className="py-32 px-6 relative">
            <div className="container mx-auto max-w-7xl">
                <div className="text-center mb-16 reveal">
                    <h2 className="type-h2 text-[#2C3E50] mb-2">{language === 'es' ? 'Por Qué Ruka Agency' : 'Why Ruka Agency'}</h2>
                    <p className="text-[#64748B]">{language === 'es' ? 'Especialización, cercanía y resultados.' : 'Specialization, closeness and results.'}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {differentiators.map((item, i) => (
                        <div key={i} className="glass-panel p-6 rounded-3xl reveal flex flex-col items-center text-center gap-4 hover:bg-white/40">
                            <div className="text-[#6599CB] bg-[#6599CB]/10 p-3 rounded-full">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#2C3E50]">{item.title}</h3>
                                <p className="text-[#64748B] text-sm">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const ResultsSection = () => {
    useScrollReveal();
    const { language } = useLanguage();

    return (
        <section className="py-32 px-6 mx-auto max-w-7xl">
            <div
                className="rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #4F7B8C 0%, #6599CB 55%, #96D9CC 100%)' }}
            >
                {/* Ambient glows */}
                <div className="absolute top-0 right-0 w-[45%] h-[60%] bg-[#6599CB] rounded-full blur-[120px] opacity-15 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-[#96D9CC] rounded-full blur-[100px] opacity-10 pointer-events-none" />

                <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">

                    {/* ── LEFT: Title + Testimonial ── */}
                    <div>
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/40 bg-white/10 text-white text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm mb-5">
                            <Zap className="text-[#F2994B]" size={14} />
                            {language === 'es' ? 'RESULTADOS REALES' : 'REAL RESULTS'}
                        </div>
                        <h2 className="leading-[1.1] mb-6">
                            <span className="block text-3xl md:text-5xl text-white font-black uppercase tracking-tight mb-1">
                                {language === 'es' ? 'Caso de Éxito:' : 'Success Story:'}
                            </span>
                            <span className="block text-2xl md:text-5xl text-white/90 italic font-light font-serif">
                                {language === 'es' ? 'Inmobiliaria Boutique en Costa Brava' : 'Boutique Real Estate in Costa Brava'}
                            </span>
                        </h2>

                        <p className="text-white/70 text-base leading-relaxed mb-10 max-w-sm">
                            {language === 'es' 
                                ? 'Tres años de colaboración continua. De una presencia digital débil a un posicionamiento dominante en su mercado local.' 
                                : 'Three years of continuous collaboration. From a weak digital presence to a dominant positioning in their local market.'}
                        </p>

                        {/* Testimonial card */}
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                            <span className="text-[#F2994B] text-5xl font-serif leading-none block mb-2 -mt-1">"</span>
                            <blockquote className="text-white/90 text-sm italic leading-relaxed mb-5">
                                {language === 'es' 
                                    ? 'La diferencia no es el volumen, es la calidad. Hoy cada lead tiene sentido y nuestro equipo trabaja con foco y tranquilidad.' 
                                    : 'The difference isn\'t the volume, it\'s the quality. Today every lead makes sense and our team works with focus and peace of mind.'}
                            </blockquote>
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-[#6599CB]/60 flex items-center justify-center text-white font-black text-sm shrink-0">R</div>
                                <div>
                                    <p className="text-white font-bold text-sm">Roberto V.</p>
                                    <p className="text-[#96D9CC] text-xs">{language === 'es' ? 'Director Inmobiliaria Boutique' : 'Boutique Real Estate Director'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── RIGHT: Metric cards ── */}
                    <div className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-5">
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300">
                                <TrendingUp className="text-[#F2994B] mb-4" size={26} />
                                <div className="text-white text-4xl font-black mb-2 tracking-tight">+100%</div>
                                <div className="text-[#96D9CC] text-[10px] font-black tracking-[0.2em] uppercase leading-snug">{language === 'es' ? 'Leads Cualificados' : 'Qualified Leads'}</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-colors duration-300">
                                <Star className="text-[#F2994B] mb-4" size={26} />
                                <div className="text-white text-4xl font-black mb-2 tracking-tight">TOP 3</div>
                                <div className="text-[#96D9CC] text-[10px] font-black tracking-[0.2em] uppercase leading-snug">
                                    {language === 'es' ? <p>En Keywords<br />Estratégicas</p> : <p>In Strategic<br />Keywords</p>}
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex items-center justify-between hover:bg-white/15 transition-colors duration-300">
                            <div>
                                <div className="text-[#96D9CC] text-[10px] font-black tracking-[0.2em] uppercase mb-3">{language === 'es' ? 'Tráfico Orgánico' : 'Organic Traffic'}</div>
                                <div className="text-white text-5xl font-black tracking-tight">x3.5</div>
                            </div>
                            <BarChart3 className="text-white/20" size={64} />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    const { language } = useLanguage();

    const steps = language === 'es' ? [
        {
            num: "DIAGNÓSTICO",
            ghost: "01",
            title: "Auditoría estratégica",
            desc: "Radiografiamos tu presencia digital al completo: web, captación, SEO, publicidad y nurturing para identificar exactamente qué frena tu crecimiento.",
            color: "#6599CB",
        },
        {
            num: "PLANIFICACIÓN",
            ghost: "02",
            title: "Estrategia personalizada",
            desc: "Diseñamos un plan a medida con KPIs claros, benchmarks del sector y objetivos de negocio medibles desde el día uno.",
            color: "#F2994B",
        },
        {
            num: "EJECUCIÓN",
            ghost: "03",
            title: "Implementación integral",
            desc: "Configuramos tu ecosistema completo: web, campañas de ads, CRM y automatizaciones integradas y listas para funcionar.",
            color: "#6599CB",
        },
        {
            num: "ESCALADO",
            ghost: "04",
            title: "Optimización continua",
            desc: "Revisamos métricas mensualmente y optimizamos cada elemento del sistema para maximizar el retorno de tu inversión.",
            color: "#F2994B",
        },
    ] : [
        {
            num: "DIAGNOSIS",
            ghost: "01",
            title: "Strategic Audit",
            desc: "We analyze your entire digital presence: website, lead generation, SEO, ads, and nurturing to identify exactly what is holding back your growth.",
            color: "#6599CB",
        },
        {
            num: "PLANNING",
            ghost: "02",
            title: "Custom Strategy",
            desc: "We design a tailor-made plan with clear KPIs, industry benchmarks, and measurable business goals from day one.",
            color: "#F2994B",
        },
        {
            num: "EXECUTION",
            ghost: "03",
            title: "Integral Implementation",
            desc: "We set up your complete ecosystem: website, ad campaigns, CRM, and automations integrated and ready to work.",
            color: "#6599CB",
        },
        {
            num: "SCALING",
            ghost: "04",
            title: "Continuous Optimization",
            desc: "We review metrics monthly and optimize every element of the system to maximize your ROI.",
            color: "#F2994B",
        },
    ];

    return (
        <section id="proceso" className="py-32 px-6 relative z-10">
            <div className="container mx-auto max-w-7xl">

                {/* Header */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-14 inline-flex items-center justify-center"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                            <Clock className="text-[#F2994B]" size={16} />
                            {language === 'es' ? 'PROCESO TRANSPARENTE' : 'TRANSPARENT PROCESS'}
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.55, delay: 0.1 }}
                        className="mb-8 w-full text-center text-[#4F7B8C]"
                    >
                        <span className="type-display mb-2">
                            {language === 'es' ? 'Cómo trabajamos.' : 'How we work.'}
                        </span>
                        <br />
                        <span className="type-h2-serif text-[#6599CB]">
                            {language === 'es' ? 'Cuatro pasos.' : 'Four steps.'}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.18 }}
                        className="type-body text-[#64748B] text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {language === 'es' 
                            ? 'Un proceso claro y sin fricciones, diseñado para agencias que valoran el orden, la estrategia y la eficiencia.' 
                            : 'A clear and frictionless process, designed for agencies that value order, strategy, and efficiency.'}
                    </motion.p>
                </div>

                {/* Steps grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="group relative glass-panel rounded-[2rem] overflow-hidden hover:shadow-2xl hover:bg-white/50 transition-all duration-500"
                        >
                            {/* Hover glow */}
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[2rem]"
                                style={{ background: `radial-gradient(ellipse at top left, ${step.color}10 0%, transparent 70%)` }}
                            />

                            {/* Ghost number */}
                            <div
                                className="absolute top-2 right-4 text-[8rem] font-black leading-none select-none pointer-events-none"
                                style={{ color: `${step.color}12` }}
                            >
                                {step.ghost}
                            </div>

                            <div className="relative p-8 pb-10 flex flex-col h-full">
                                {/* Step label */}
                                <div className="mb-6">
                                    <span
                                        className="inline-flex items-center text-[10px] font-black tracking-[0.2em] uppercase px-3 py-1.5 rounded-full"
                                        style={{ color: step.color, background: `${step.color}12`, border: `1px solid ${step.color}25` }}
                                    >
                                        {step.num}
                                    </span>
                                </div>



                                {/* Title + Description pushed down */}
                                <div className="mt-auto pt-8">
                                    <h3 className="text-xl font-black text-[#2C3E50] mb-3 leading-tight tracking-tight transition-colors duration-300 group-hover:text-[#4F7B8C]">
                                        {step.title}
                                    </h3>
                                    <p className="text-[#64748B] text-sm leading-relaxed">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Insight callout */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-8 py-10 text-center border-t border-b border-slate-200/60"
                >
                    <p className="text-[#4F7B8C] text-lg md:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed">
                        {language === 'es' 
                            ? 'El marketing digital es como el interés compuesto: el mes 6 es mejor que el mes 3, el mes 12 es mejor que el mes 6. La clave es la consistencia.' 
                            : 'Digital marketing is like compound interest: month 6 is better than month 3, month 12 is better than month 6. The key is consistency.'}
                    </p>
                </motion.div>

                {/* Bottom connector belt */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mt-12 glass-panel rounded-[2rem] px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#F2994B]/10 flex items-center justify-center text-[#F2994B]">
                            <Clock size={22} />
                        </div>
                        <div>
                            <p className="text-[#2C3E50] font-bold text-base">{language === 'es' ? 'Primeros resultados visibles' : 'First visible results'}</p>
                            <p className="text-[#64748B] text-sm">{language === 'es' ? 'En las primeras 4 semanas desde el inicio' : 'Within the first 4 weeks from launch'}</p>
                        </div>
                    </div>
                    <div className="h-px md:h-10 w-full md:w-px bg-slate-200/80" />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#6599CB]/10 flex items-center justify-center text-[#6599CB]">
                            <ShieldCheck size={22} />
                        </div>
                        <div>
                            <p className="text-[#2C3E50] font-bold text-base">{language === 'es' ? 'Sin permanencias' : 'No lock-in contracts'}</p>
                            <p className="text-[#64748B] text-sm">{language === 'es' ? 'Te quedas porque funciona, no por contrato' : 'You stay because it works, not because of a contract'}</p>
                        </div>
                    </div>
                    <div className="h-px md:h-10 w-full md:w-px bg-slate-200/80" />
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#4F7B8C]/10 flex items-center justify-center text-[#4F7B8C]">
                            <Users size={22} />
                        </div>
                        <div>
                            <p className="text-[#2C3E50] font-bold text-base">{language === 'es' ? 'Trato directo' : 'Direct interaction'}</p>
                            <p className="text-[#64748B] text-sm">{language === 'es' ? 'Hablas siempre con los fundadores' : 'You always talk to the founders'}</p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

const SpecializationSection = () => {
    useScrollReveal();
    const { language } = useLanguage();
    const areas = ['Costa Brava', 'Costa del Sol', 'Islas Baleares', 'Chile'];

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="text-center mb-16 reveal">
                    <span className="type-label text-[#6599CB] block mb-4">{language === 'es' ? 'ESPECIALIZACIÓN GEOGRÁFICA' : 'GEOGRAPHIC SPECIALIZATION'}</span>
                    <h2 className="type-h2 text-[#2C3E50]">{language === 'es' ? 'Dominamos tu Mercado' : 'We Master Your Market'}</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {areas.map((area, i) => (
                        <div key={i} className="glass-panel p-8 rounded-[2rem] reveal text-center hover:bg-[#6599CB] group transition-all duration-300">
                            <div className="w-12 h-12 bg-[#F2994B]/10 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-white/20">
                                <MapPin size={24} className="text-[#F2994B] group-hover:text-white" />
                            </div>
                            <h3 className="font-bold text-lg text-[#2C3E50] group-hover:text-white">{area}</h3>
                            <p className="text-sm text-[#64748B] mt-2 group-hover:text-white/80">{language === 'es' ? 'Expertos en captación local' : 'Local lead generation experts'}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(0);
    const { language } = useLanguage();

    const faqs = language === 'es' ? [
        { 
            q: "¿Por qué solo trabajáis con un número limitado de inmobiliarias?", 
            a: "Priorizamos la calidad sobre el volumen. A diferencia de las agencias que gestionan decenas de cuentas de forma genérica, nosotros limitamos nuestra capacidad para garantizar una estrategia 100% personalizada, disponibilidad real y respuestas en horas. Si buscas un socio estratégico comprometido, no un proveedor masivo, somos tu opción." 
        },
        { 
            q: "¿Cuánto tiempo toma ver resultados tangibles?", 
            a: "Somos realistas y honestos con los tiempos: Google Ads genera leads cualificados desde las primeras 2 semanas. El SEO es un activo que requiere entre 3 y 6 meses para ser significativo, convirtiéndose en tu canal más rentable a partir del primer año. Por último, las automatizaciones y el CRM impactan en tu ahorro de tiempo de forma inmediata." 
        },
        { 
            q: "¿Quién tendrá la propiedad de la web y de los activos digitales?", 
            a: "Tú. Absolutamente todo lo que construyamos —desde el código de la web hasta las campañas de publicidad— es propiedad 100% de tu inmobiliaria. No creemos en retener a los clientes mediante 'secuestros' técnicos; nuestro objetivo es que elijas quedarte con nosotros por la rentabilidad que generamos, sabiendo que siempre tienes el control total de tu negocio." 
        },
        { 
            q: "¿Existe compromiso de permanencia?", 
            a: "Creemos en los resultados, no en las obligaciones legales. Trabajamos mes a mes porque queremos que te quedes con nosotros por el valor que aportamos a tu inmobiliaria, no por un contrato. Si el sistema no funciona para ti, eres libre de irte en cualquier momento." 
        },
        { 
            q: "¿Cuánto tiempo tendré que dedicarle yo al proyecto?", 
            a: "Nuestro objetivo es liberar vuestro tiempo, no añadiros más trabajo. Tras una fase inicial de auditoría y definición, nosotros nos encargamos de la ejecución total. Tendréis un punto de contacto directo para comunicación ágil y una reunión mensual de 30 minutos para revisar resultados estratégicos. Optimizamos vuestra presencia mientras vosotros os centráis en cerrar operaciones." 
        },
        { 
            q: "¿Cómo sabré si la inversión está siendo rentable?", 
            a: "No os inundaremos con métricas de vanidad como 'seguidores' o 'likes'. Nos enfocamos en el retorno real: leads cualificados, visitas a propiedades y coste de adquisición de cliente. Recibiréis informes mensuales claros donde el marketing se traduce a números de negocio que cualquier empresario entiende perfectamente." 
        },
        { 
            q: "¿Trabajáis con mi competencia directa?", 
            a: "La exclusividad es innegociable. Por contrato, solo trabajamos con una inmobiliaria por zona geográfica y segmento de mercado boutique. No tendría sentido competir contra nosotros mismos. Si vuestra zona ya está cubierta, os lo comunicaremos de inmediato, ya que nuestra prioridad absoluta es garantizar la dominancia digital de nuestro partner actual." 
        }
    ] : [
        { 
            q: "Why do you only work with a limited number of real estate agencies?", 
            a: "We prioritize quality over volume. Unlike agencies that manage dozens of accounts generically, we limit our capacity to guarantee a 100% personalized strategy, real availability, and responses within hours. If you're looking for a committed strategic partner, not a massive provider, we are your option." 
        },
        { 
            q: "How long does it take to see tangible results?", 
            a: "We are realistic and honest with timelines: Google Ads generates qualified leads within the first 2 weeks. SEO is an asset that takes 3 to 6 months to be significant, becoming your most profitable channel from the first year onwards. Finally, automations and CRM impact your time savings immediately." 
        },
        { 
            q: "Who owns the website and digital assets?", 
            a: "You do. Absolutely everything we build—from the website code to the ad campaigns—is 100% owned by your agency. We don't believe in holding clients hostage through technical 'kidnappings'; our goal is for you to choose to stay with us because of the profitability we generate, knowing you always have total control over your business." 
        },
        { 
            q: "Is there a lock-in period?", 
            a: "We believe in results, not in legal obligations. We work month to month because we want you to stay with us for the value we bring to your agency, not because of a contract. If the system doesn't work for you, you are free to leave at any time." 
        },
        { 
            q: "How much time will I have to dedicate to the project?", 
            a: "Our goal is to free up your time, not add more work. After an initial audit and definition phase, we take care of the total execution. You will have a direct point of contact for agile communication and a monthly 30-minute meeting to review strategic results. We optimize your presence while you focus on closing deals." 
        },
        { 
            q: "How will I know if the investment is profitable?", 
            a: "We won't drown you in vanity metrics like 'followers' or 'likes'. We focus on the real return: qualified leads, property visits, and customer acquisition cost. You will receive clear monthly reports where marketing is translated into business numbers that any entrepreneur perfectly understands." 
        },
        { 
            q: "Do you work with my direct competition?", 
            a: "Exclusivity is non-negotiable. By contract, we only work with one real estate agency per geographic area and boutique market segment. It wouldn't make sense to compete against ourselves. If your area is already covered, we will let you know immediately, as our absolute priority is to ensure the digital dominance of our current partner." 
        }
    ];

    return (
        <section className="py-32 px-6 relative z-10">
            <div className="container mx-auto max-w-5xl">
                {/* Header Integrado */}
                <div className="text-center mb-20 flex flex-col items-center">
                    <div className="mb-14 inline-flex items-center justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-[#6599CB]/60 bg-[#6599CB]/5 text-[#4F7B8C] text-xs font-bold tracking-widest uppercase backdrop-blur-sm shadow-sm transition-transform hover:scale-105 cursor-default">
                            <HelpCircle className="text-[#F2994B]" size={16} />
                            {language === 'es' ? 'TRANSPARENCIA TOTAL' : 'TOTAL TRANSPARENCY'}
                        </div>
                    </div>

                    <h2 className="mb-6 w-full text-center text-[#4F7B8C]">
                        <span className="type-display mb-2">
                            {language === 'es' ? 'Resolvamos dudas.' : 'Let\'s resolve doubts.'}
                        </span>
                        <br />
                        <span className="type-h2-serif text-[#6599CB]">
                            {language === 'es' ? 'Antes de avanzar.' : 'Before moving forward.'}
                        </span>
                    </h2>

                    <p className="type-body text-[#64748B] text-xl md:text-2xl max-w-2xl mx-auto font-light leading-relaxed">
                        {language === 'es' 
                            ? 'Queremos que tengas absoluta claridad sobre cómo trabajamos y qué puedes esperar de esta alianza estratégica.' 
                            : 'We want you to have absolute clarity on how we work and what you can expect from this strategic alliance.'}
                    </p>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((f, i) => (
                        <div 
                            key={i} 
                            className="glass-panel p-6 md:p-8 rounded-[2rem] cursor-pointer hover:bg-white/60 transition-all duration-300" 
                            onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                        >
                            <div className="flex justify-between items-center gap-4">
                                <span className="text-lg md:text-xl font-bold text-[#2C3E50] tracking-tight">{f.q}</span>
                                <div className={`w-8 h-8 rounded-full bg-[#6599CB]/10 flex items-center justify-center text-[#6599CB] transition-all duration-300 ${openIndex === i ? 'rotate-180 bg-[#6599CB] text-white' : ''}`}>
                                    <ChevronDown size={20} />
                                </div>
                            </div>
                            <div className={`overflow-hidden transition-all duration-500 ${openIndex === i ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                                <p className="text-gray-500 leading-relaxed text-lg border-t border-slate-100/60 pt-6">
                                    {f.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CTASection = ({ navigateTo }) => {
    const { language } = useLanguage();
    return (
    <section className="py-32 px-6 relative z-10">
        <div className="container mx-auto max-w-7xl">
            <div
                className="rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center border border-white/10 shadow-3xl backdrop-blur-3xl"
                style={{ background: 'rgba(23, 37, 51, 0.85)' }}
            >
                {/* Brand ambient glows inside the card */}
                <div className="absolute top-0 right-0 w-[40%] h-[50%] bg-[#96D9CC] rounded-full blur-[120px] opacity-10 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[30%] h-[40%] bg-[#F2994B] rounded-full blur-[100px] opacity-10 pointer-events-none" />

                <div className="relative z-10">
                    <div className="mb-12 inline-flex items-center justify-center">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F2994B] animate-pulse" />
                            {language === 'es' ? 'Solo 3 proyectos disponibles este mes' : 'Only 3 projects available this month'}
                        </div>
                    </div>

                    <h2 className="mb-8 leading-[1.1] w-full px-2">
                        <span className="block text-4xl sm:text-6xl md:text-8xl font-black text-white uppercase tracking-tighter mb-4 text-center break-words max-w-full">
                            {language === 'es' ? '¿Hablamos?' : 'Let\'s talk'}
                        </span>
                        <span className="block text-xl md:text-3xl text-gray-400 italic font-light tracking-tight max-w-2xl mx-auto font-serif">
                            {language === 'es' ? 'Es momento de (re)iniciar su proyecto' : 'It\'s time to (re)start your project'}
                        </span>
                    </h2>

                    <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed font-light mt-6">
                        {language === 'es' 
                            ? 'Si tienes una inmobiliaria de alto standing y buscas una agencia de marketing digital especializada para potenciar tu presencia online y generar más oportunidades de compra y venta, hablemos. Este es un buen momento.' 
                            : 'If you have a high-end real estate agency and are looking for a specialized digital marketing agency to enhance your online presence and generate more buying and selling opportunities, let’s talk. This is a good time.'}
                    </p>

                    <div className="flex flex-col items-center gap-8">
                        <Button
                            variant="accent"
                            onClick={() => navigateTo('contacto')}
                            className="text-lg px-16 py-6 shadow-[0_20px_50px_rgba(101,153,203,0.3)] hover:scale-105 transition-transform duration-500"
                        >
                            {language === 'es' ? 'Agendar Auditoría Gratuita' : 'Schedule Free Audit'}
                        </Button>

                        <div className="flex gap-10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em]">
                            <span className="flex items-center gap-2.5"><Clock size={12} className="text-[#96D9CC]" /> {language === 'es' ? 'Respuesta 24h' : '24h Response'}</span>
                            <span className="flex items-center gap-2.5"><ShieldCheck size={12} className="text-[#96D9CC]" /> {language === 'es' ? 'Sin compromiso' : 'No commitment'}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

const Footer = ({ navigateTo }) => {
    const { language } = useLanguage();

    return (
    <footer className="bg-[#2C3E50]/70 backdrop-blur-lg border-t border-white/20 text-white pt-36 pb-16 px-6 rounded-t-[3rem] mt-12 relative">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div className="flex flex-col items-start max-w-md">
                <div className="flex items-center justify-start gap-3 mb-8">
                    <RukaLogo className="h-16 brightness-0 invert opacity-90 hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">
                    {language === 'es' 
                        ? 'Agencia especializada en marketing digital para inmobiliarias boutique en España y Chile. Estrategia, captación y sistemas digitales integrados.' 
                        : 'Specialized digital marketing agency for boutique real estate in Spain and Chile. Strategy, lead generation, and integrated digital systems.'}
                </p>
                <Button 
                    variant="accent" 
                    onClick={() => navigateTo('contacto')}
                    className="shadow-[0_10px_30px_rgba(242,153,75,0.3)] hover:scale-105 transition-transform"
                >
                    {language === 'es' ? 'Hablemos de tu proyecto' : 'Let\'s talk about your project'}
                </Button>
            </div>

            <div className="flex flex-col items-start md:items-end justify-start">
                <div className="text-left md:text-right flex flex-col gap-8">
                    <div>
                        <p className="text-[#96D9CC] font-bold text-lg tracking-wider mb-2">Santiago de Chile · Costa Brava</p>
                    </div>
                    <ul className="flex flex-col items-start md:items-end gap-3 text-lg text-gray-300">
                        <li>
                            <a href="#" className="hover:text-[#96D9CC] transition-colors flex items-center justify-end gap-1.5 group">
                                Instagram
                                <ArrowUpRight 
                                    size={16} 
                                    className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                                />
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-[#96D9CC] transition-colors flex items-center justify-end gap-1.5 group">
                                LinkedIn
                                <ArrowUpRight 
                                    size={16} 
                                    className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                                />
                            </a>
                        </li>
                        <li>
                            <a href="mailto:hola@rukaa.es" className="hover:text-[#96D9CC] transition-colors flex items-center justify-end gap-1.5 group">
                                {language === 'es' ? 'Email' : 'Email'}
                                <ArrowUpRight 
                                    size={16} 
                                    className="opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" 
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="container mx-auto max-w-7xl border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400 gap-6 text-center md:text-left">
            <p>© {new Date().getFullYear()} RUKA AGENCY. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
            
            {/* Language toggle at bottom center/right alongside legal texts */}
            <div className="flex-1 flex justify-center md:justify-end md:pr-6">
                <LanguageToggle isFooter={true} className="scale-90" />
            </div>

            <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-white/30">{language === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}</a>
            <p className="italic">{language === 'es' ? 'Agencia de Marketing Digital para Inmobiliarias · España' : 'Digital Marketing Agency for Real Estate · Spain'}</p>
        </div>
    </footer>
    );
};


const SobreNosotrosPage = ({ navigateTo }) => {
    useScrollReveal();
    const { language } = useLanguage();

    return (
        <div className="pt-40 pb-20 px-6 page-fade-in relative overflow-hidden">
            {/* Background Background Layers */}
            <div className="grain-overlay"></div>
            <div className="animated-blob blob-1"></div>
            <div className="animated-blob blob-3"></div>

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Hero Section */}
                <div className="text-center mb-24">
                    <div className="reveal mb-8 inline-flex items-center justify-center">
                        <Badge variant="accent">{language === 'es' ? 'NUESTRA ESENCIA' : 'OUR ESSENCE'}</Badge>
                    </div>
                    <h1 className="reveal mb-8 text-[#4F7B8C]">
                        <span className="type-display font-bold uppercase tracking-tight block">
                            {language === 'es' ? 'Más que una Agencia' : 'More than an Agency'}
                        </span>
                        <span className="type-h2-serif text-[#6599CB]">
                            {language === 'es' ? 'Estrategia y Comunicación' : 'Strategy and Communication'}
                        </span>
                    </h1>
                    <p className="reveal type-body text-[#64748B] max-w-3xl mx-auto text-xl leading-relaxed">
                        {language === 'es' 
                            ? 'Combinamos análisis financiero con experiencia real en el sector inmobiliario de alto standing para entender tanto tus números como a tus clientes.' 
                            : 'We combine financial analysis with real experience in the high-end real estate sector to understand both your numbers and your clients.'}
                    </p>
                </div>

                {/* Founders Section */}
                <div className="grid md:grid-cols-2 gap-12 mb-32">
                    {/* Founder 1 */}
                    <div className="reveal glass-panel p-8 md:p-12 rounded-[3.5rem] flex flex-col items-center text-center group">
                        <div className="w-56 h-72 rounded-[2.5rem] mb-8 overflow-hidden relative shadow-2xl border-4 border-white/50 bg-slate-100">
                            <img 
                                src={diegoImg} 
                                alt="Diego" 
                                loading="lazy"
                                width="224"
                                height="288"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-[#2C3E50] uppercase tracking-wide">Diego</h3>
                            <a 
                                href="https://www.linkedin.com/in/diego-jara-uribe-0028b298/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#6599CB] hover:text-[#4F7B8C] transition-colors p-1 relative z-20"
                                title="LinkedIn Diego"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <p className="text-[#6599CB] font-bold mb-6 text-sm tracking-widest uppercase">{language === 'es' ? 'Estrategia, Analítica y Performance' : 'Strategy, Analytics and Performance'}</p>
                        <p className="text-[#64748B] leading-relaxed font-medium">
                            {language === 'es' 
                                ? 'Analista financiero con visión internacional. Su enfoque se centra en la rentabilidad: cada euro invertido debe tener un propósito estratégico y una métrica de éxito clara.' 
                                : 'Financial analyst with an international vision. His focus is on profitability: every euro invested must have a strategic purpose and a clear success metric.'}
                        </p>
                    </div>

                    {/* Founder 2 */}
                    <div className="reveal glass-panel p-8 md:p-12 rounded-[3.5rem] flex flex-col items-center text-center group">
                        <div className="w-56 h-72 rounded-[2.5rem] mb-8 overflow-hidden relative shadow-2xl border-4 border-white/50 bg-slate-100">
                            <img 
                                src={ievaImg} 
                                alt="Ieva" 
                                loading="lazy"
                                width="224"
                                height="288"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                        <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-2xl font-bold text-[#2C3E50] uppercase tracking-wide">Ieva</h3>
                            <a 
                                href="https://es.linkedin.com/in/ieva-rodovica-281a2a26b" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#6599CB] hover:text-[#4F7B8C] transition-colors p-1 relative z-20"
                                title="LinkedIn Ieva"
                            >
                                <Linkedin size={20} />
                            </a>
                        </div>
                        <p className="text-[#6599CB] font-bold mb-6 text-sm tracking-widest uppercase">{language === 'es' ? 'Comunicación Internacional' : 'International Communication'}</p>
                        <p className="text-[#64748B] leading-relaxed font-medium">
                            {language === 'es' 
                                ? 'Experta en comunicación inmobiliaria de lujo. Habiendo trabajado dentro del sector, entiende el lenguaje y las expectativas del cliente premium para crear conexiones reales.' 
                                : 'Expert in luxury real estate communication. Having worked within the sector, she understands the language and expectations of the premium client to create real connections.'}
                        </p>
                    </div>
                </div>

                {/* Boutique Philosophy */}
                <div className="reveal glass-panel p-10 md:p-20 rounded-[4rem] text-center mb-24 relative overflow-hidden bg-white/40">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#6599CB]/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F2994B]/10 rounded-full blur-[100px] -ml-40 -mb-40"></div>
                    
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="w-16 h-16 bg-[#6599CB]/10 rounded-2xl flex items-center justify-center text-[#6599CB] mx-auto mb-8">
                            <Sparkles size={32} />
                        </div>
                        <h2 className="type-h2 text-[#4F7B8C] mb-8">{language === 'es' ? 'Equipo Boutique' : 'Boutique Team'}</h2>
                        <p className="type-body text-[#64748B] text-xl leading-relaxed mb-10">
                            {language === 'es' 
                                ? 'No somos una corporación masiva. Somos un equipo de dos profesionales que cree en la calidad sobre la cantidad. Solo aceptamos un número limitado de proyectos al año para garantizar que cada inmobiliaria reciba nuestra total atención y excelencia táctica.' 
                                : 'We are not a massive corporation. We are a two-person team that believes in quality over quantity. We only accept a limited number of projects per year to ensure each real estate agency receives our total attention and tactical excellence.'}
                        </p>
                        <Button variant="accent" onClick={() => navigateTo('contacto')} className="mx-auto">
                            {language === 'es' ? 'Hablemos de tu Proyecto' : 'Let\'s talk about your Project'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- PAGES ---

const CasosExitoPage = () => {
    const { language } = useLanguage();
    return (
        <div className="pt-40 pb-20 px-6 page-fade-in">
            <div className="container mx-auto max-w-7xl text-center mb-20">
                <h1 className="type-h1 text-[#2C3E50] mb-6">{language === 'es' ? 'Casos de Éxito' : 'Success Stories'}</h1>
                <p className="type-body max-w-2xl mx-auto">{language === 'es' ? 'Resultados reales. Sin humo.' : 'Real results. No hype.'}</p>
            </div>
            <div className="container mx-auto max-w-5xl">
                {/* Simple placeholder for case studies grid */}
                <div className="glass-panel p-10 rounded-3xl mb-8">
                    <h2 className="type-h2 text-[#4F7B8C] mb-4">Inmobiliaria Costa Brava</h2>
                    <p className="mb-4 text-[#64748B]">
                        {language === 'es' 
                            ? 'Transformación digital completa aumentando leads en un 100%.' 
                            : 'Complete digital transformation increasing leads by 100%.'}
                    </p>
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200">
                        <div><div className="text-2xl font-bold text-[#6599CB]">+100%</div><div className="text-xs text-slate-400">LEADS</div></div>
                        <div><div className="text-2xl font-bold text-[#6599CB]">TOP 3</div><div className="text-xs text-slate-400">SEO</div></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ROICalculator = ({ language }) => {
    const [propertyPrice, setPropertyPrice] = useState(1000000);
    const [targetSales, setTargetSales] = useState(12);
    
    // Métricas constantes basadas en sector lujo
    const leadToViewRate = 0.20; // 20% de los leads visitan
    const viewToSaleRate = 0.05; // 5% de las visitas compran
    const estCPL = 120; // Coste medio por lead cualificado (Lujo)

    // Cálculos
    const totalRevenue = propertyPrice * targetSales;
    const leadsNeeded = Math.ceil(targetSales / (leadToViewRate * viewToSaleRate));
    const estimatedSpend = leadsNeeded * estCPL;
    const grossProfit = totalRevenue * 0.03; // 3% de comisión media
    const netProfitAfterAds = grossProfit - estimatedSpend;
    const roi = (grossProfit / estimatedSpend).toFixed(1);

    return (
        <div className="glass-panel p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden bg-white/60">
            <div className="relative z-10">
                <div className="space-y-8 mb-10">
                    {/* Input 1: Precio Propiedad */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-widest">
                                {language === 'es' ? 'Precio Medio Propiedades' : 'Average Property Price'}
                            </label>
                            <span className="text-lg font-bold text-[#6599CB]">
                                €{propertyPrice.toLocaleString()}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="200000" 
                            max="5000000" 
                            step="50000" 
                            value={propertyPrice} 
                            onChange={(e) => setPropertyPrice(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6599CB]"
                        />
                    </div>

                    {/* Input 2: Objetivo de Ventas */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center px-1">
                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-widest">
                                {language === 'es' ? 'Ventas Objetivas / Año' : 'Target Sales / Year'}
                            </label>
                            <span className="text-lg font-bold text-[#6599CB]">
                                {targetSales}
                            </span>
                        </div>
                        <input 
                            type="range" 
                            min="1" 
                            max="50" 
                            step="1" 
                            value={targetSales} 
                            onChange={(e) => setTargetSales(Number(e.target.value))}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#6599CB]"
                        />
                    </div>
                </div>

                {/* Resultados Grilla */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-[#6599CB]/5 p-5 rounded-3xl border border-[#6599CB]/10">
                        <p className="text-[10px] font-bold text-[#4F7B8C] uppercase tracking-[0.2em] mb-2">{language === 'es' ? 'Leads Necesarios' : 'Required Leads'}</p>
                        <p className="text-3xl font-black text-[#2C3E50]">{leadsNeeded}</p>
                    </div>
                    <div className="bg-[#F2994B]/5 p-5 rounded-3xl border border-[#F2994B]/10">
                        <p className="text-[10px] font-bold text-[#F2994B] uppercase tracking-[0.2em] mb-2">{language === 'es' ? 'Inversión Óptima' : 'Optimal Investment'}</p>
                        <p className="text-3xl font-black text-[#2C3E50]">€{(estimatedSpend/12).toLocaleString()}<span className="text-xs font-normal opacity-60">/mes</span></p>
                    </div>
                </div>

                <div className="bg-[#2C3E50] p-6 rounded-[2rem] text-center text-white shadow-xl">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-light opacity-80">{language === 'es' ? 'ROI Estimado' : 'Estimated ROI'}</span>
                        <span className="bg-[#96D9CC] text-[#2C3E50] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{language === 'es' ? 'ALTO RENDIMIENTO' : 'HIGH PERFORMANCE'}</span>
                    </div>
                    <div className="text-5xl font-black mb-1">x{roi}</div>
                    <p className="text-[10px] opacity-60 uppercase tracking-widest">{language === 'es' ? 'Retorno sobre inversión publicitaria' : 'Return on ad spend'}</p>
                </div>
            </div>

            {/* Blob Decorativo */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6599CB]/5 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
        </div>
    );
};

const RecursosPage = () => {
    const { language } = useLanguage();
    const resources = language === 'es' 
        ? ['Checklist SEO', 'Calculadora ROI', 'Guía Ads'] 
        : ['SEO Checklist', 'ROI Calculator', 'Ads Guide'];

    return (
        <div className="pt-40 pb-20 px-6 page-fade-in">
            <div className="container mx-auto max-w-7xl text-center mb-20">
                <h1 className="type-h1 text-[#2C3E50] mb-6">{language === 'es' ? 'Recursos Gratuitos' : 'Free Resources'}</h1>
                <p className="type-body max-w-2xl mx-auto">{language === 'es' ? 'Guías y herramientas para agentes de alto nivel.' : 'Guides and tools for high-level agents.'}</p>
            </div>
            <div className="container mx-auto max-w-7xl">
                <div className="grid md:grid-cols-2 gap-12 items-start mb-20 px-6">
                    {/* Explicación a la izquierda */}
                    <div className="reveal order-2 md:order-1">
                        <Badge variant="accent" className="mb-6">{language === 'es' ? 'HERRAMIENTA EXCLUSIVA' : 'EXCLUSIVE TOOL'}</Badge>
                        <h2 className="type-h2 text-[#4F7B8C] mb-8">
                            {language === 'es' ? 'Calculadora de Rentabilidad Inmobiliaria' : 'Real Estate Profitability Calculator'}
                        </h2>
                        <div className="space-y-6 text-[#64748B] text-lg leading-relaxed">
                            <p>
                                {language === 'es' 
                                    ? 'Entiende la viabilidad financiera de tu estrategia digital. Esta herramienta calcula cuántos leads cualificados necesitas y qué inversión es óptima según tu ticket medio.' 
                                    : 'Understand the financial viability of your digital strategy. This tool calculates how many qualified leads you need and what investment is optimal according to your average ticket.'}
                            </p>
                            <p>
                                {language === 'es'
                                    ? 'Basada en métricas reales del sector inmobiliario boutique y de alto standing en España y Latinoamérica.'
                                    : 'Based on real metrics from the boutique and high-end real estate sector in Spain and Latin America.'}
                            </p>
                        </div>
                    </div>

                    {/* Calculadora a la derecha */}
                    <div className="reveal order-1 md:order-2">
                        <ROICalculator language={language} />
                    </div>
                </div>

                <div className="px-6 mb-20 text-center">
                    <h3 className="type-h3 text-[#2C3E50] mb-12">{language === 'es' ? 'Otros recursos útiles' : 'Other useful resources'}</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {resources.map((r, i) => (
                            <div key={i} className="glass-panel p-8 rounded-3xl hover:bg-[#6599CB] group transition-colors">
                                <h3 className="text-xl font-bold text-[#4F7B8C] group-hover:text-white mb-2">{r}</h3>
                                <p className="text-sm text-[#64748B] group-hover:text-white/80 mb-6">
                                    {language === 'es' ? 'Recurso descargable exclusivo.' : 'Exclusive downloadable resource.'}
                                </p>
                                <button className="text-xs font-bold uppercase tracking-widest text-[#F2994B] group-hover:text-white">
                                    {language === 'es' ? 'Descargar' : 'Download'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => {
    const { language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        countryCode: '+34',
        phone: '',
        email: '',
        website: '',
        zone: '',
        budget: '',
        challenge: '',
        _honey: '' // Honeypot field
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Anti-spam honeypot check
        if (formData._honey) {
            console.log('Spam detected');
            setStatus('success'); // Pretend it worked
            return;
        }

        setStatus('loading');

        try {
            // Combinar código de país con teléfono para el envío
            const fullPhone = `${formData.countryCode} ${formData.phone}`;
            
            // Separar el nombre en FIRSTNAME y LASTNAME para las etiquetas del correo
            const nameParts = formData.name.trim().split(/\s+/);
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            const submissionData = {
                name: formData.name,
                email: formData.email,
                phone: fullPhone,
                website: formData.website,
                zone: formData.zone,
                budget: formData.budget,
                challenge: formData.challenge
            };
            delete submissionData._honey;

            const response = await fetch('https://whdbgwvqkdfubpbfiaks.supabase.co/functions/v1/subscribe-newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZGJnd3Zxa2RmdWJwYmZpYWtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MTg4MTEsImV4cCI6MjA4MDE5NDgxMX0.jxl3S64vUJKqzVHk6B_yaRccOrCP-1XB_hX95dZxt0g'
                },
                body: JSON.stringify(submissionData)
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', countryCode: '+34', phone: '', email: '', website: '', zone: '', budget: '', challenge: '', _honey: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                console.error('Error submitting form');
                setStatus('idle');
                alert(language === 'es' ? 'Hubo un error al enviar la solicitud. Por favor intenta de nuevo.' : 'There was an error sending the request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            setStatus('idle');
            alert(language === 'es' ? 'Hubo un error al conectar. Por favor intenta de nuevo.' : 'Connection error. Please try again.');
        }
    };

    return (
        <div className="pt-40 pb-20 px-6 page-fade-in">
            <div className="container mx-auto max-w-4xl">
                <div className="glass-panel p-6 md:p-12 rounded-[2.5rem] md:rounded-[3rem] text-center relative overflow-hidden">
                    {/* Decorative background blurs inside the contact card */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#6599CB]/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F2994B]/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />

                    <div className="relative z-10">
                        <h1 className="type-h1 text-[#2C3E50] mb-4">{language === 'es' ? 'Hablemos de tu Proyecto' : 'Let\'s talk about your Project'}</h1>
                        <p className="mb-10 text-[#64748B] text-lg max-w-xl mx-auto">
                            {language === 'es' 
                                ? 'Completa el formulario para solicitar una auditoría gratuita o ' 
                                : 'Fill out the form to request a free audit or '}
                            <strong className="text-[#6599CB] font-semibold">{language === 'es' ? 'reserva una llamada directamente' : 'book a call directly'}</strong>.
                        </p>

                        <div className="max-w-2xl mx-auto bg-white/40 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-white/60 shadow-sm backdrop-blur-sm mb-10 text-left">

                            {status === 'success' ? (
                                <div className="p-8 text-center animate-fade-in">
                                    <div className="w-16 h-16 bg-[#96D9CC]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 size={32} className="text-[#4F7B8C]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#2C3E50] mb-2">{language === 'es' ? '¡Solicitud Enviada!' : 'Request Sent!'}</h3>
                                    <p className="text-[#64748B]">
                                        {language === 'es' 
                                            ? 'Gracias por tu interés. Nos pondremos en contacto contigo lo antes posible para organizar la auditoría.' 
                                            : 'Thank you for your interest. We will contact you as soon as possible to organize the audit.'}
                                    </p>
                                </div>
                            ) : (
                                <form className="space-y-6" onSubmit={handleSubmit}>
                                    {/* Honeypot field (hidden from users) */}
                                    <input type="text" name="_honey" value={formData._honey} onChange={handleInputChange} className="hidden" aria-hidden="true" />

                                    {/* Nombres y Teléfono */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Nombre Completo *' : 'Full Name *'}</label>
                                            <input name="name" value={formData.name} onChange={handleInputChange} type="text" placeholder={language === 'es' ? "Ej. Carlos Mendoza" : "e.g. John Doe"} className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" required />
                                        </div>
                                        <div className="space-y-1.5 min-w-0">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Teléfono *' : 'Phone *'}</label>
                                            <div className="flex gap-2">
                                                <select 
                                                    name="countryCode" 
                                                    value={formData.countryCode} 
                                                    onChange={handleInputChange} 
                                                    className="bg-white/80 border border-white rounded-xl p-3 md:p-4 outline-none focus:border-[#6599CB] text-[10px] md:text-sm font-bold text-[#4F7B8C] appearance-none cursor-pointer shrink-0"
                                                >
                                                    <option value="+34">🇪🇸 +34</option>
                                                    <option value="+56">🇨🇱 +56</option>
                                                    <option value="+1">🇺🇸 +1</option>
                                                    <option value="+52">🇲🇽 +52</option>
                                                    <option value="+54">🇦🇷 +54</option>
                                                    <option value="+57">🇨🇴 +57</option>
                                                    <option value="">{language === 'es' ? 'Otro' : 'Other'}</option>
                                                </select>
                                                <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" placeholder="600 000 000" className="flex-1 min-w-0 bg-white/80 border border-white rounded-xl p-3 md:p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" required />
                                            </div>
                                        </div>

                                    </div>

                                    {/* Email y Web */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Email Profesional *' : 'Professional Email *'}</label>
                                            <input name="email" value={formData.email} onChange={handleInputChange} type="email" placeholder="carlos@tu-inmobiliaria.com" className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" required />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Sitio Web' : 'Website'}</label>
                                            <input name="website" value={formData.website} onChange={handleInputChange} type="text" placeholder={language === 'es' ? "www.tu-inmobiliaria.com" : "www.your-realestate.com"} className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" />
                                        </div>
                                    </div>

                                    {/* Zona y Presupuesto */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Zona de Interés / Actuación *' : 'Area of Interest / Service zone *'}</label>
                                            <input name="zone" value={formData.zone} onChange={handleInputChange} type="text" placeholder={language === 'es' ? "Ej. Costa Brava, Madrid..." : "e.g. Costa Brava, Madrid..."} className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" required />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? 'Presupuesto Estimado *' : 'Estimated Budget *'}</label>
                                            <input name="budget" value={formData.budget} onChange={handleInputChange} type="text" placeholder={language === 'es' ? "Ej. 1.500€/mes" : "e.g. 1.500€/month"} className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50" required />
                                        </div>
                                    </div>

                                    {/* Mensaje */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#4F7B8C] uppercase tracking-wider ml-1">{language === 'es' ? '¿Cual es el principal desafío de tu agencia? *' : 'What is your agency\'s main challenge? *'}</label>
                                        <textarea name="challenge" value={formData.challenge} onChange={handleInputChange} rows="4" placeholder={language === 'es' ? "Ej. Necesitamos captar más propiedades en exclusiva, mejorar nuestro posicionamiento..." : "e.g. We need to capture more exclusive properties, improve our positioning..."} className="w-full bg-white/80 border border-white rounded-xl p-4 outline-none focus:border-[#6599CB] focus:ring-2 focus:ring-[#6599CB]/20 transition-all text-[#2C3E50] placeholder-[#64748B]/50 resize-none" required></textarea>
                                    </div>

                                    <Button disabled={status === 'loading'} type="submit" variant="accent" className="w-full justify-center py-4 text-lg mt-2 shadow-[0_10px_30px_rgba(101,153,203,0.3)] hover:scale-[1.02] transition-transform disabled:opacity-70 disabled:hover:scale-100">
                                        {status === 'loading' ? (language === 'es' ? 'Enviando...' : 'Sending...') : (language === 'es' ? 'Enviar Solicitud' : 'Send Request')}
                                    </Button>
                                    
                                    {/* Trust Indicator */}
                                    <div className="flex items-center justify-center gap-2 mt-6 text-[#64748B]">
                                        <ShieldCheck size={16} className="text-[#96D9CC]" />
                                        <span className="text-xs font-bold tracking-widest uppercase">{language === 'es' ? 'Tus datos son confidenciales y nunca se comparten.' : 'Your data is confidential and never shared.'}</span>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Booking Call Section */}
                        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between bg-[#6599CB]/10 border border-[#6599CB]/20 p-6 rounded-[2rem] gap-6">
                            <div className="text-left flex-1">
                                <h3 className="text-[#2C3E50] font-bold text-lg mb-1">{language === 'es' ? '¿Prefieres agilidad?' : 'Prefer agility?'}</h3>
                                <p className="text-[#64748B] text-sm">{language === 'es' ? 'Reserva 15 minutos en nuestro calendario y vayamos directo al grano.' : 'Book 15 minutes in our calendar and let\'s get straight to the point.'}</p>
                            </div>
                            <a 
                                href="https://cal.eu/rukaa/agendar-llamada" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="shrink-0 bg-white text-[#6599CB] font-bold text-sm px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all border border-[#6599CB]/10 hover:border-[#6599CB]/40 flex items-center gap-2 group"
                            >
                                {language === 'es' ? 'Agendar Llamada' : 'Schedule Call'}
                                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

        // --- MAIN APP ---
        export default function App() {
    const navigate = useNavigate();
    const location = useLocation();

    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('rukaa-language') || 'es';
    });

    const setLanguageStr = (newLang) => {
        setLanguage(newLang);
        localStorage.setItem('rukaa-language', newLang);
    };

    // ── URL ↔ state helpers ───────────────────────────────────────────────────
    // Map a URL pathname to { page, blogSlug }
    const parseLocation = (pathname) => {
        if (pathname === '/' || pathname === '') return { page: 'home', blogSlug: null };
        if (pathname.startsWith('/blog/')) {
            const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
            return { page: 'blog-post', blogSlug: slug || null };
        }
        const pageMap = {
            '/servicios': 'servicios',
            '/proceso': 'proceso',
            '/blog': 'blog',
            '/sobre-nosotros': 'sobre-nosotros',
            '/contacto': 'contacto',
            '/especializacion': 'especializacion',
            '/casos-exito': 'casos-exito',
            '/recursos': 'recursos',
        };
        return { page: pageMap[pathname.replace(/\/$/, '')] || 'home', blogSlug: null };
    };

    // Map a pageId (+ optional slug) to a URL path
    const buildPath = (pageId, slug = null) => {
        if (pageId === 'home') return '/';
        if (pageId === 'blog-post' && slug) return `/blog/${slug}`;
        return `/${pageId}`;
    };

    // Derive current page & slug from the URL
    const { page, blogSlug } = parseLocation(location.pathname);

    // Navegación central: actualiza la URL (react-router sincroniza el estado)
    const navigateTo = (pageId, slug = null) => {
        navigate(buildPath(pageId, slug));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const titles = language === 'es' ? {
            'home': 'Rukaa | Marketing Digital para Inmobiliarias Exclusivas',
            'sobre-nosotros': 'Sobre Rukaa: Equipo Especializado en Marketing Inmobiliario',
            'servicios': 'Nuestros Servicios - Marketing Digital Inmobiliario',
            'especializacion': 'Especialización - Marketing Digital para Inmobiliarias',
            'casos-exito': 'Casos de Éxito - Resultados Reales',
            'proceso': 'Nuestro Proceso de Trabajo',
            'recursos': 'Recursos Gratuitos para Inmobiliarias',
            'contacto': 'Solicita tu Auditoría - Hablemos',
            'blog': 'Blog - Estrategias de Marketing Inmobiliario',
        } : {
            'home': 'Rukaa | Digital Marketing for Exclusive Real Estate',
            'sobre-nosotros': 'About Rukaa: Specialized Real Estate Marketing Team',
            'servicios': 'Our Services - Real Estate Digital Marketing',
            'especializacion': 'Specialization - Digital Marketing for Real Estate',
            'casos-exito': 'Success Stories - Real Results',
            'proceso': 'Our Working Process',
            'recursos': 'Free Resources for Real Estate',
            'contacto': 'Request Your Audit - Let\'s Talk',
            'blog': 'Blog - Real Estate Marketing Strategies',
        };

        const descriptions = language === 'es' ? {
            'home': 'Transformamos agencias en líderes de mercado creando ecosistemas que atraen compradores de alto valor mientras tu equipo cierra más ventas.',
            'sobre-nosotros': 'Conoce al equipo de Rukaa, expertos en marketing digital especializados exclusivamente en el sector inmobiliario boutique y de lujo.',
            'contacto': 'Solicita una auditoría gratuita de tu estrategia digital y descubre cómo podemos ayudarte a captar propiedades y leads de calidad.',
        } : {
            'home': 'We transform agencies into market leaders by creating ecosystems that attract high-value buyers while your team closes more sales.',
            'sobre-nosotros': 'Meet the Rukaa team, digital marketing experts specialized exclusively in the boutique and luxury real estate sector.',
            'contacto': 'Request a free audit of your digital strategy and discover how we can help you capture quality properties and leads.',
        };
        
        if (page !== 'blog-post') {
            document.title = titles[page] || (language === 'es' ? titles.home : titles.home);
            
            // Actualizar meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', descriptions[page] || (language === 'es' ? descriptions.home : descriptions.home));
            }
        }
    }, [page, blogSlug, language]);

        return (
        <LanguageContext.Provider value={{ language, setLanguageStr }}>
        <HelmetProvider>
        <div className="min-h-screen">
            <GlobalStyles />
            <Navigation navigateTo={navigateTo} currentPage={page} />

            <main>
                {page === 'home' && (
                    <>
                        <Hero navigateTo={navigateTo} />
                        <ProblemSection />
                        <SolutionSection />
                        <ServicesSection navigateTo={navigateTo} />
                        <ResultsSection />
                        <ProcessSection />
                        <FAQSection />
                        <CTASection navigateTo={navigateTo} />
                    </>
                )}

                {page === 'servicios' && (
                    <div className="pt-32 page-fade-in">
                        <ServicesSection navigateTo={navigateTo} />
                        <FAQSection />
                        <CTASection navigateTo={navigateTo} />
                    </div>
                )}

                {page === 'especializacion' && (
                    <div className="pt-32 page-fade-in">
                        <div className="container mx-auto max-w-7xl px-6 mb-20 text-center">
                            <h1 className="type-h1 text-[#2C3E50] mb-6">Especialización Geográfica</h1>
                            <p className="type-body text-[#64748B] max-w-2xl mx-auto">Conocemos el mercado local de alto standing como nadie.</p>
                        </div>
                        <SpecializationSection />
                        <CTASection navigateTo={navigateTo} />
                    </div>
                )}

                {page === 'casos-exito' && <CasosExitoPage />}

                {page === 'proceso' && (
                    <div className="pt-32 page-fade-in">
                        <ProcessSection />
                        <FAQSection />
                        <CTASection navigateTo={navigateTo} />
                    </div>
                )}

                {page === 'recursos' && <RecursosPage />}
                {page === 'sobre-nosotros' && <SobreNosotrosPage navigateTo={navigateTo} />}
                {page === 'contacto' && <ContactPage />}

                {/* Blog */}
                {page === 'blog' && !blogSlug && (
                    <BlogPage onNavigate={navigateTo} />
                )}
                {page === 'blog-post' && blogSlug && (
                    <BlogPostPage slug={blogSlug} onNavigate={navigateTo} />
                )}
            </main>

            <Footer navigateTo={navigateTo} />
            <CookieConsent />
        </div>
        </HelmetProvider>
        </LanguageContext.Provider>
        );
}
