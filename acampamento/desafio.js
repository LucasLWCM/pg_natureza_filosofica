// ==========================================================================
// SEÇÃO 10B: Desafio de Lançamento (Suas Meditações em 30 dias)
// ==========================================================================

(function () {
    // 1. CONSTANTES EXIGIDAS
    const DATA_FIM_OFERTA = "2026-10-17T23:59:59-03:00";
    const ANOS_ACESSO_PADRAO = 1;
    const ANOS_ACESSO_LANCAMENTO = 2;
    const BRINDE_ACESSO_ATIVO = true;
    const BRINDE_BOX_ATIVO = true;
    const BRINDE_LIVRO_ATIVO = true;
    const DESCRICAO_BOX = "Box Biblioteca Estoica, Grandes Mestres Vol. I: 4 livros físicos em casa";
    const TEXTO_REGRAS_BRINDES = "";

    // Reaproveitar constantes existentes com fallback seguro
    const LINK_CHECKOUT = window.LINK_CHECKOUT || "https://checkout.thebank.com.br/pt-BR/7517299358646747136?cc=BR";
    const PARCELAS = window.PARCELAS || 12;
    const VALOR_PARCELA = window.VALOR_PARCELA || "69,70";
    const PRECO_A_VISTA = window.PRECO_A_VISTA || "697";

    // Função única reaproveitável em toda a página
    function anosAcesso() {
        const agora = Date.now();
        const fim = new Date(DATA_FIM_OFERTA).getTime();
        if (agora < fim && BRINDE_ACESSO_ATIVO) {
            return ANOS_ACESSO_LANCAMENTO;
        }
        return ANOS_ACESSO_PADRAO;
    }
    window.anosAcesso = anosAcesso;

    const secaoDesafio = document.getElementById('desafio');
    if (!secaoDesafio) return;

    // 2. Configuração dos 4 Brindes
    // Card 1: 2 anos de acesso
    const cardAcesso = document.getElementById('brinde-card-acesso');
    if (cardAcesso) {
        if (!BRINDE_ACESSO_ATIVO || anosAcesso() !== ANOS_ACESSO_LANCAMENTO) {
            cardAcesso.remove();
        } else {
            const elLancamento = cardAcesso.querySelector('.var-anos-lancamento');
            const elPadrao = cardAcesso.querySelector('.var-anos-padrao');
            if (elLancamento) elLancamento.textContent = ANOS_ACESSO_LANCAMENTO;
            if (elPadrao) elPadrao.textContent = ANOS_ACESSO_PADRAO;
        }
    }

    // Atualiza outras menções na página (ex: FAQ item 5) para refletir anosAcesso() dinamicamente
    const faqPanel5P = document.querySelector('#faq-painel-5 p');
    if (faqPanel5P) {
        if (anosAcesso() === 2) {
            faqPanel5P.textContent = "Você terá dois anos completos de acesso a todo o conteúdo. Nesse período, as séries que eu lançar entram para você sem custo nenhum.";
        } else {
            faqPanel5P.textContent = "Você terá um ano completo de acesso a todo o conteúdo. Nesse período, as séries que eu lançar entram para você sem custo nenhum.";
        }
    }

    // Card 3: Box Estoico
    const cardBox = document.getElementById('brinde-card-box');
    if (cardBox) {
        if (!BRINDE_BOX_ATIVO) {
            cardBox.remove();
        } else {
            const descEl = cardBox.querySelector('.desafio-brinde-desc');
            if (descEl) descEl.textContent = DESCRICAO_BOX;
        }
    }

    // Card 4: Livro Meditações do Rafa
    const cardLivro = document.getElementById('brinde-card-livro');
    if (cardLivro && !BRINDE_LIVRO_ATIVO) {
        cardLivro.remove();
    }

    // Imagens dos brindes: esconde se não existir
    document.querySelectorAll('.desafio-brinde-img').forEach(img => {
        img.addEventListener('error', function () {
            const wrap = this.closest('.desafio-brinde-img-wrap');
            if (wrap) wrap.style.display = 'none';
        });
    });

    // Letra pequena (regras dos brindes físicos)
    const regrasEl = document.getElementById('desafio-regras-brindes');
    if (regrasEl) {
        if (TEXTO_REGRAS_BRINDES && TEXTO_REGRAS_BRINDES.trim() !== "") {
            regrasEl.textContent = TEXTO_REGRAS_BRINDES;
            regrasEl.style.display = 'block';
        } else {
            regrasEl.style.display = 'none';
        }
    }

    // 3. Formatação do horário de DATA_FIM_OFERTA no fuso America/Sao_Paulo
    function formatarHorarioSP(isoDate) {
        try {
            const d = new Date(isoDate);
            const fmt = new Intl.DateTimeFormat('pt-BR', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            const parts = fmt.formatToParts(d);
            const h = parts.find(p => p.type === 'hour')?.value || '23';
            const m = parts.find(p => p.type === 'minute')?.value || '59';
            return `${h}h${m}`;
        } catch (e) {
            return "23h59";
        }
    }

    const horarioFormatado = formatarHorarioSP(DATA_FIM_OFERTA);
    document.querySelectorAll('.desafio-horario-fim').forEach(el => {
        el.textContent = horarioFormatado;
    });

    // Atualiza valores de parcelamento no microtexto
    document.querySelectorAll('.desafio-var-parcelas').forEach(el => el.textContent = PARCELAS);
    document.querySelectorAll('.desafio-var-valor-parcela').forEach(el => el.textContent = VALOR_PARCELA);

    // Botão Principal (preservando utm e sck)
    const btnCheckout = secaoDesafio.querySelector('.desafio-btn');
    if (btnCheckout) {
        try {
            const url = new URL(LINK_CHECKOUT);
            const params = new URLSearchParams(window.location.search);
            params.forEach((value, key) => {
                url.searchParams.set(key, value);
            });
            btnCheckout.href = url.toString();
        } catch (e) {
            btnCheckout.href = LINK_CHECKOUT;
        }
    }

    // 4. Timer e Estado Encerrado
    const elHoras = document.getElementById('timer-horas');
    const elMinutos = document.getElementById('timer-minutos');
    const elSegundos = document.getElementById('timer-segundos');
    const timerContainer = secaoDesafio.querySelector('.desafio-timer-bloco');

    const targetTimestamp = new Date(DATA_FIM_OFERTA).getTime();

    function atualizarTimer() {
        const agora = Date.now();
        const diff = targetTimestamp - agora;

        if (diff <= 0) {
            // Estado encerrado: esconde a seção inteira sem deixar espaço
            secaoDesafio.style.display = 'none';
            if (elHoras) elHoras.textContent = '00';
            if (elMinutos) elMinutos.textContent = '00';
            if (elSegundos) elSegundos.textContent = '00';
            return false;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (elHoras) elHoras.textContent = String(hours).padStart(2, '0');
        if (elMinutos) elMinutos.textContent = String(minutes).padStart(2, '0');
        if (elSegundos) elSegundos.textContent = String(seconds).padStart(2, '0');

        return { hours, minutes };
    }

    const resInicial = atualizarTimer();
    if (resInicial !== false) {
        if (timerContainer) {
            timerContainer.setAttribute('aria-label', `Tempo restante da oferta de lançamento: ${resInicial.hours} horas e ${resInicial.minutes} minutos`);
        }

        let contagemSegundos = 0;
        const timerInterval = setInterval(() => {
            const res = atualizarTimer();
            if (res === false) {
                clearInterval(timerInterval);
            } else {
                contagemSegundos++;
                if (contagemSegundos >= 60) {
                    contagemSegundos = 0;
                    if (timerContainer) {
                        timerContainer.setAttribute('aria-label', `Tempo restante da oferta de lançamento: ${res.hours} horas e ${res.minutes} minutos`);
                    }
                }
            }
        }, 1000);
    }

    // 5. Ajuste de altura entre coluna direita e esquerda no Desktop
    function ajustarAlturaColunas() {
        if (window.innerWidth >= 1024) {
            const colEsq = secaoDesafio.querySelector('.desafio-col-esq');
            const colDir = secaoDesafio.querySelector('.desafio-col-dir');
            const listaBrindes = secaoDesafio.querySelector('.desafio-brindes-lista');
            if (colEsq && colDir && listaBrindes) {
                listaBrindes.classList.remove('desafio-brindes-compacto');
                const altEsq = colEsq.offsetHeight;
                const altDir = colDir.offsetHeight;
                if (altDir - altEsq > 120) {
                    listaBrindes.classList.add('desafio-brindes-compacto');
                }
            }
        }
    }

    // Executa no carregamento e ao redimensionar
    window.addEventListener('load', ajustarAlturaColunas);
    window.addEventListener('resize', ajustarAlturaColunas);
    setTimeout(ajustarAlturaColunas, 300);

    // 6. IntersectionObserver de Animação de Entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -15% 0px',
        threshold: 0
    };

    const animObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('desafio-card-principal')) {
                    entry.target.querySelectorAll('.anim-desafio-item').forEach(item => {
                        item.classList.add('in-view');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const cardPrincipal = secaoDesafio.querySelector('.desafio-card-principal');
    if (cardPrincipal) {
        animObserver.observe(cardPrincipal);
    }

    secaoDesafio.querySelectorAll('.anim-desafio-avulso').forEach(el => {
        animObserver.observe(el);
    });

    secaoDesafio.querySelectorAll('.anim-desafio, .anim-desafio-item, .anim-desafio-avulso').forEach(el => {
        el.addEventListener('animationend', (e) => {
            if (e.target === el) {
                el.style.willChange = 'auto';
            }
        });
    });

})();
