
document.addEventListener('DOMContentLoaded', () => {

    // Nuvem de Pílulas - Seção 9
    const nuvemContainer = document.querySelector('.funciona-nuvem');
    if (nuvemContainer) {
        const linhasData = [
            ['Engenheiros', 'Médicos', 'Advogados', 'Professores', 'Enfermeiros', 'Empresários'],
            ['Autônomos', 'Servidores públicos', 'Gerentes', 'Vendedores', 'Motoristas'],
            ['Designers', 'Programadores', 'Psicólogos', 'Arquitetos', 'Contadores'],
            ['Bancários', 'Militares', 'Mães', 'Pais', 'Estudantes', 'Aposentados'],
            ['Quem diz "eu tenho que" o dia todo', 'Quem nunca leu filosofia', 'Quem já tentou de tudo', 'Quem quer aprender junto']
        ];

        let html = '';
        linhasData.forEach((linha, index) => {
            const linhaStr = linha.map(t => `<span class="funciona-pilula">${t}</span>`).join('');
            const repetitions = 4;
            const groupHtml = linhaStr.repeat(repetitions);
            
            const delay = index * 0.9;
            html += `
                <div class="funciona-linha anim-linha" style="--linha-delay: ${delay};">
                    <div class="funciona-track track-${index + 1}">
                        <div class="funciona-group">${groupHtml}</div>
                        <div class="funciona-group funciona-track-copy" aria-hidden="true">${groupHtml}</div>
                    </div>
                </div>
            `;
        });
        nuvemContainer.innerHTML = html;
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementosAnimados = document.querySelectorAll('.framework-diagram, .framework-text, .problema-header, .problema-fechamento, .mudanca-cartao, .tudo-sec, .viver-sec, .emais-sec, .fundadores-sec, .funciona-sec, .anim-autoridade, .oferta-sec, .anim-garantia, .anim-faq, .anim-final');
    elementosAnimados.forEach(el => observer.observe(el));

    // Remove will-change após a animação
    document.querySelectorAll('.mudanca-anim, .anim-tudo, .anim-viver, .anim-emais, .anim-fundador, .fundadores-fill, .anim-funciona, .anim-linha, .anim-autoridade, .anim-oferta, .anim-garantia, .anim-faq, .anim-final').forEach(el => {
        el.addEventListener('animationend', (e) => {
            if (e.target === el) {
                el.style.willChange = 'auto';
            }
        });
    });

    // Seção de Oferta, Garantia e Fundadores (Variáveis compartilhadas)
    const TOTAL_VAGAS = 100;
    const VAGAS_PREENCHIDAS = 60;
    const LINK_CHECKOUT = "https://pay.hotmart.com/checkout"; // URL de exemplo se não houver no design.md, o form já prevê
    const PARCELAS = 12;
    const VALOR_PARCELA = "59,70";
    const PRECO_A_VISTA = "597";
    const DIAS_GARANTIA = 15;
    const DIAS_GARANTIA_LEI = 15;
    const ANOS_GARANTIA_2 = "1";
    
    // WhatsApp
    const WHATSAPP_NUMERO = "551131970897";
    const WHATSAPP_TEXTO = "Olá! Vi a página da Escola Natureza Filosófica e tenho uma dúvida.";
    const LINK_WHATSAPP = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_TEXTO)}`;
    
    // Cálculos
    const percentual = Math.round((VAGAS_PREENCHIDAS / TOTAL_VAGAS) * 100);
    const restantes = TOTAL_VAGAS - VAGAS_PREENCHIDAS;
    
    document.querySelectorAll('.fundadores-total').forEach(el => el.textContent = TOTAL_VAGAS);
    document.querySelectorAll('.fundadores-numero-grande').forEach(el => el.textContent = TOTAL_VAGAS);
    document.querySelectorAll('.fundadores-preenchidas').forEach(el => el.textContent = VAGAS_PREENCHIDAS);
    document.querySelectorAll('.fundadores-restantes').forEach(el => el.textContent = restantes);
    document.querySelectorAll('.fundadores-percentual-bold').forEach(el => el.textContent = percentual);
    
    // Garantia e Oferta
    document.querySelectorAll('.var-parcelas').forEach(el => el.textContent = PARCELAS);
    document.querySelectorAll('.var-valor-parcela').forEach(el => el.textContent = VALOR_PARCELA);
    document.querySelectorAll('.var-link-checkout').forEach(el => { 
        if(el.tagName === 'A') {
            const url = new URL(LINK_CHECKOUT);
            const params = new URLSearchParams(window.location.search);
            params.forEach((value, key) => {
                url.searchParams.set(key, value);
            });
            el.href = url.toString();
        }
    });
    document.querySelectorAll('.var-dias-garantia').forEach(el => el.textContent = DIAS_GARANTIA);
    document.querySelectorAll('.var-dias-garantia-lei').forEach(el => el.textContent = DIAS_GARANTIA_LEI);
    document.querySelectorAll('.var-preco-avista').forEach(el => el.textContent = PRECO_A_VISTA);
    document.querySelectorAll('.var-anos-garantia-2').forEach(el => el.textContent = ANOS_GARANTIA_2);
    document.querySelectorAll('.var-vagas-restantes').forEach(el => el.textContent = restantes);
    
    // Botões do WhatsApp
    document.querySelectorAll('.var-link-whatsapp').forEach(el => {
        if(el.tagName === 'A') {
            el.setAttribute('href', LINK_WHATSAPP);
        }
    });
    
    document.querySelectorAll('.fundadores-fill').forEach(fill => {
        fill.style.setProperty('--target-width', `${percentual}%`);
    });

    // ==========================================
    // Lógica do Acordeão (FAQ)
    // ==========================================
    const faqBtns = document.querySelectorAll('.faq-btn');
    faqBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Fecha todos os outros
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('is-open');
                    otherItem.querySelector('.faq-btn').setAttribute('aria-expanded', 'false');
                }
            });

            // Alterna o atual
            if (isExpanded) {
                btn.setAttribute('aria-expanded', 'false');
                item.classList.remove('is-open');
            } else {
                btn.setAttribute('aria-expanded', 'true');
                item.classList.add('is-open');
            }
        });

        // Navegação por teclado
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                const nextBtn = faqBtns[index + 1] || faqBtns[0];
                nextBtn.focus();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                const prevBtn = faqBtns[index - 1] || faqBtns[faqBtns.length - 1];
                prevBtn.focus();
            } else if (e.key === 'Home') {
                e.preventDefault();
                faqBtns[0].focus();
            } else if (e.key === 'End') {
                e.preventDefault();
                faqBtns[faqBtns.length - 1].focus();
            } else if (e.key === 'Escape') {
                // Fecha o próprio se estiver aberto
                if (btn.getAttribute('aria-expanded') === 'true') {
                    btn.setAttribute('aria-expanded', 'false');
                    btn.closest('.faq-item').classList.remove('is-open');
                }
            }
        });
    });

    document.querySelectorAll('.fundadores-bar-container').forEach(bar => {
        bar.setAttribute('aria-valuenow', percentual);
        bar.setAttribute('aria-valuetext', `${percentual}% das vagas preenchidas`);
    });

    // Carrossel
    const track = document.getElementById('problema-track');
    if (track) {
        let autoplayInterval;
        let isDesktop = window.innerWidth >= 1024;

        const startAutoplay = () => {
            if (isDesktop) return;
            autoplayInterval = setInterval(() => {
                const card = track.querySelector('.card-tentativa');
                if (!card) return;
                const cardWidth = card.offsetWidth + 12; // + gap
                let nextScroll = track.scrollLeft + cardWidth;
                
                if (nextScroll >= track.scrollWidth - track.clientWidth - 5) {
                    nextScroll = 0; // volta do início
                }
                track.scrollTo({ left: nextScroll, behavior: 'smooth' });
            }, 5000);
        };

        const stopAutoplay = () => clearInterval(autoplayInterval);

        track.addEventListener('touchstart', stopAutoplay, {passive: true});
        track.addEventListener('mouseenter', stopAutoplay);
        track.addEventListener('mouseleave', startAutoplay);
        track.addEventListener('focusin', stopAutoplay);
        track.addEventListener('focusout', startAutoplay);

        const prevBtn = document.querySelector('.prev-seta');
        const nextBtn = document.querySelector('.next-seta');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoplay();
                const cardWidth = track.querySelector('.card-tentativa').offsetWidth + 12;
                track.scrollBy({ left: -cardWidth, behavior: 'smooth' });
                startAutoplay();
            });
            nextBtn.addEventListener('click', () => {
                stopAutoplay();
                const cardWidth = track.querySelector('.card-tentativa').offsetWidth + 12;
                track.scrollBy({ left: cardWidth, behavior: 'smooth' });
                startAutoplay();
            });
        }

        window.addEventListener('resize', () => {
            isDesktop = window.innerWidth >= 1024;
            stopAutoplay();
            if (isDesktop) {
                track.scrollTo({ left: 0 }); // reset no desktop
            } else {
                if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                    startAutoplay();
                }
            }
        });

        if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            startAutoplay();
        }
    }
});
