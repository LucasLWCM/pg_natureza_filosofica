# Sistema de Design - Landing Page "Premium Clássica"

Este documento define as diretrizes visuais e de design para a criação da página web. O objetivo é alcançar uma estética **elegante, premium, sofisticada e clássica**, fugindo do aspecto genérico de páginas criadas por IA. Qualquer ferramenta ou IA utilizada no projeto deve seguir estritamente este guia.

## 1. Vibe e Estética Geral
- **Estilo:** Clássico, High-Ticket, Sofisticado.
- **Sensação:** Transmite confiança, autoridade e exclusividade.
- **Foco:** Minimalismo focado no conteúdo, com uso generoso de espaços em branco (negative space) para dar respiro aos elementos.
- **Detalhes:** Uso de bordas sutis, ornamentos clássicos discretos e sombras suaves para criar profundidade sem pesar o visual.

## 2. Paleta de Cores
A paleta baseia-se em tons terrosos, cremes e dourados, contrastando com um tom escuro profundo para legibilidade.

| Cor | Hexadecimal | Uso |
| :--- | :--- | :--- |
| **Fundo Principal (Creme/Bege Claro)** | `#F7F4ED` ou `#Fdfbf7` | Background geral da página. |
| **Fundo Secundário (Bege Médio)** | `#EAE3D2` ou `#E1D5C1` | Background de seções de destaque ou cards. |
| **Texto Principal (Azul Marinho/Quase Preto)** | `#1A2530` ou `#222222` | Títulos principais e textos de corpo (garante alto contraste). |
| **Dourado Principal (Acentos)** | `#B58E4E` | Botões, ícones, bordas de destaque e palavras-chave. |
| **Dourado Escuro/Sombra** | `#8A6B38` | Hover de botões, sombras de elementos dourados. |
| **Branco** | `#FFFFFF` | Textos dentro de botões escuros, fundos de cards flutuantes. |

*Dica de Gradiente Dourado (para detalhes premium):*
`linear-gradient(135deg, #DFBD69 0%, #926F34 100%)`

## 3. Tipografia
Para manter a elegância, utilizaremos uma combinação clássica de Serif (para títulos) e Sans-Serif (para textos longos).

- **Títulos e Headings (H1, H2, H3):**
  - **Fonte:** `Playfair Display`, `Merriweather` ou `Lora` (Google Fonts).
  - **Estilo:** Serif, pesos Variados (Normal 400, Bold 700 para ênfase).
  - **Características:** Letras capitulares charmosas, ideal para transmitir autoridade (ex: "A CHAVE").

- **Corpo de Texto (Parágrafos, listas, botões):**
  - **Fonte:** `Inter`, `Lato` ou `Montserrat` (Google Fonts).
  - **Estilo:** Sans-Serif clean, peso Regular (400) ou Light (300).
  - **Características:** Altamente legível em tamanhos menores, visual moderno que equilibra o classicismo dos títulos.

## 4. Elementos de Interface (UI)

### Botões (CTAs - Call to Action)
- **Formato:** Arredondados (Pill-shape), `border-radius: 50px;`.
- **Cores (Opção 1):** Fundo Dourado Principal com texto escuro (`#1A2530`).
- **Cores (Opção 2):** Fundo Escuro (`#1A2530`) com texto Dourado Principal.
- **Efeitos:** Sombra suave (Drop Shadow) para dar a sensação de flutuação. Efeito de `hover` sutil escurecendo o fundo.
- **Tipografia:** Fonte Sans-serif, caixa alta (uppercase), tracking (espaçamento entre letras) levemente aumentado.

### Imagens e Cards
- **Bordas:** Cantos levemente arredondados (`border-radius: 8px` a `12px`).
- **Sombras:** Sombras muito difusas e quentes (ex: `box-shadow: 0 10px 30px rgba(138, 107, 56, 0.1);`).
- **Molduras:** Imagens importantes podem ter uma fina borda dupla ou simples em tom dourado ou bege escuro.

### Ornamentos e Divisores
- Linhas horizontais sutis (`1px solid #D4C5A9`).
- Elementos gráficos como pequenos losangos (♦) ou pontilhados finos dividindo seções para reforçar o tom clássico (como visto na imagem acima de "Casos de Sucesso").

## 5. Layout e Espaçamento
- **Espaçamento (Padding/Margin):** Extremamente generoso. Elementos não devem parecer espremidos. Usar grandes margens entre seções (ex: `80px` a `120px` no desktop).
- **Alinhamento:** Predominância de alinhamento centralizado para títulos e chamadas principais, dando um ar de editorial de revista.

## 6. Instruções para IAs de Programação (Cursor, Copilot, etc.)
Ao gerar código HTML/CSS/JS baseado neste documento, a IA DEVE:
1. Usar **Vanilla CSS** ou classes utilitárias de forma extremamente controlada, priorizando a semântica.
2. Importar as fontes do Google Fonts (`Playfair Display` e `Inter`).
3. Criar variáveis CSS (`:root`) para todas as cores definidas acima antes de estilizar qualquer elemento.
4. Evitar efeitos extravagantes (bounce, flash); focar em micro-interações elegantes (fades lentos, transições de opacidade de `0.3s ease`).
5. Não adicionar placeholders genéricos. Fazer o layout estruturado perfeitamente pronto para receber o conteúdo final.
