# design.md: Página de vendas da Escola Natureza Filosófica

Página de vendas mobile first. O layout, a ordem dos blocos e os componentes copiam a página de referência (Escola do Jonas). O que muda é a paleta (preto e laranja quente) e as fontes (Oswald e Montserrat).

Regra geral para a ferramenta: onde este arquivo definir uma escolha, siga exatamente. Não substitua por padrões genéricos (cards cinza iguais, gradientes decorativos, fontes do sistema).

---

## 1. Cores

### Paleta base (definida pelo cliente)

| Token | Hex | Papel |
|---|---|---|
| `--preto` | `#080808` | Fundo escuro principal, texto sobre fundos claros |
| `--laranja` | `#E87524` | Cor de ação: botões, ícones, destaques sobre fundo escuro |
| `--laranja-queimado` | `#B85A20` | Fim do degradê do botão, destaques sobre fundo claro |
| `--branco-quente` | `#F5F1E8` | Fundo claro das seções, texto sobre fundo escuro |
| `--marrom` | `#65422F` | Texto secundário sobre fundo claro, bordas, apoio |
| `--dourado` | `#B88A38` | Detalhes finos: divisores, selos, estrelas, contornos |

### Cores derivadas (usar só estas, não inventar outras)

| Token | Hex | Como nasce | Uso |
|---|---|---|---|
| `--superficie-escura` | `#191310` | preto com 18% de marrom | Cards sobre fundo preto |
| `--areia` | `#E5DBCB` | branco quente com 12% de marrom | Cards sobre fundo claro (papel dos cards verde-sálvia da referência) |
| `--linha-escura` | `rgba(245,241,232,0.12)` | branco quente a 12% | Borda de cards escuros |
| `--linha-clara` | `rgba(101,66,47,0.25)` | marrom a 25% | Borda de cards claros e divisores |

### Regras de contraste (obrigatórias)

- Sobre `--preto`: texto em `--branco-quente`, destaques em `--laranja`. Contraste ok.
- Sobre `--branco-quente`: texto em `--preto`, texto secundário em `--marrom`. Destaque de títulos em `--laranja-queimado`, só em texto grande (a partir de 24px).
- Nunca usar `--laranja` como cor de texto sobre fundo claro. Não passa no contraste.
- Texto sobre botão laranja é sempre `--preto` (branco não passa).
- `--dourado` só em elementos decorativos e ícones. Não usar para texto corrido.

```css
:root {
  --preto: #080808;
  --laranja: #E87524;
  --laranja-queimado: #B85A20;
  --branco-quente: #F5F1E8;
  --marrom: #65422F;
  --dourado: #B88A38;
  --superficie-escura: #191310;
  --areia: #E5DBCB;
  --linha-escura: rgba(245, 241, 232, 0.12);
  --linha-clara: rgba(101, 66, 47, 0.25);
}
```

---

## 2. Tipografia

| Papel | Fonte | Peso | Observações |
|---|---|---|---|
| Títulos (h1, h2, h3), números grandes | Oswald | 600 e 700 | Frase normal (sem caixa alta), `letter-spacing: 0` a `0.01em`, `line-height: 1.08` |
| Destaque dentro do título | Montserrat itálico | 600 | Substitui o itálico serifado da referência. Sem caixa alta |
| Corpo, botões, listas, FAQ | Montserrat | 400, 500, 700 | Corpo `line-height: 1.6` |

Carregar pelo Google Fonts: Oswald 500..700 e Montserrat 400, 500, 600 (normal e itálico), 700, com `display=swap` e fallback `system-ui, sans-serif`.

### Escala (mobile, com `clamp` para desktop)

| Elemento | Mobile | Desktop |
|---|---|---|
| h1 (hero) | 40px | 64px |
| h2 (títulos de seção) | 32px | 48px |
| h3 (títulos de card) | 24px | 28px |
| Corpo | 16px | 18px |
| Texto pequeno e microtexto | 14px | 14px |
| Botão | 17px, Montserrat 700 | 18px |

### Destaque em título (assinatura visual da referência)

Toda h1 e h2 tem uma parte em Oswald e uma frase de destaque em Montserrat itálico na cor de destaque.

```html
<h2>Tudo o que você precisa para <em>voltar a se sentir vivo</em></h2>
```

```css
h1 em, h2 em {
  font-family: 'Montserrat', sans-serif;
  font-style: italic;
  font-weight: 600;
  color: var(--laranja);            /* fundo escuro */
}
.secao-clara h1 em, .secao-clara h2 em { color: var(--laranja-queimado); }
```

O destaque é uma frase (2 a 5 palavras), nunca uma palavra solta.

### Alinhamento

- Títulos, subtítulos e textos curtos: centralizados (como na referência).
- Textos longos (mais de 5 linhas, como o bloco de autoridade e os depoimentos longos): alinhados à esquerda dentro de uma coluna centralizada, largura máxima de 62 caracteres. É o único desvio intencional da referência.

---

## 3. Forma, espaço e profundidade

- Raio grande em tudo. Cards: 24px. Botões: 16px. Seções escuras que sobem por cima da anterior: 40px nos cantos superiores. Fotos: 20px.
- Espaçamento vertical entre seções: 72px mobile, 112px desktop. Padding lateral: 16px mobile.
- Sem sombras cinzas. Profundidade vem de contraste de fundo e de borda de 1px. A única sombra é o brilho laranja do botão: `0 10px 30px rgba(232, 117, 36, 0.25)`.
- Fundos alternam entre `--preto` e `--branco-quente`. Nas trocas, a seção nova sobe alguns pixels sobre a anterior com canto superior arredondado (margem negativa de -40px).
- Ruído: camada de granulado sobre o hero e sobre as seções pretas, opacidade 6%, para evitar o preto chapado.

```css
.ruido {
  position: absolute; inset: 0; pointer-events: none; opacity: .06;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
```

---

## 4. Componentes

### 4.1 Botão principal

Retângulo de cantos arredondados, largura total no mobile (máx. 420px no desktop), altura 64px.

- Fundo: `linear-gradient(90deg, #E87524, #B85A20)`.
- Texto: Montserrat 700, `--preto`, centralizado. Sem seta escrita no texto.
- Ícone à direita: círculo de 45px, fundo `--branco-quente`, contorno de 1.6px em degradê `--dourado` para `--marrom`, seta reta `--preto` dentro.
- Hover: brilho sobe (`filter: brightness(1.06)`) e o círculo desloca 3px para a direita. Foco visível: anel de 3px `--branco-quente` com offset de 3px.
- Abaixo do botão, microtexto em Montserrat 500 14px, cor `--branco-quente` a 75% (fundo escuro) ou `--marrom` (fundo claro).
- Comportamento: os botões de todas as seções, exceto oferta e fechamento, rolam suavemente até `#oferta`. Só os botões da oferta e do fechamento levam ao checkout.

### 4.2 Prova de rostos (hero)

Quatro fotos circulares de 40px, sobrepostas em 12px, borda de 2px `--branco-quente`, seguidas do texto de prova em Montserrat 500 14px.

### 4.3 Card escuro

Fundo `--superficie-escura`, borda 1px `--linha-escura`, raio 24px, padding 24px. Título em Oswald 600 24px `--branco-quente`. Descrição em Montserrat 400 16px, `--branco-quente` a 75%.

### 4.4 Card de módulo (com número fantasma)

Igual ao card escuro, mais:
- Ícone de linha (traço 1.5px) em `--laranja`, 34px, no topo à esquerda.
- Número grande atrás do texto, canto inferior direito, cortado pela borda: Oswald 700, 160px, `rgba(245, 241, 232, 0.06)`. Só usar numeração quando o conteúdo for de fato uma sequência ou uma lista fechada de módulos.

### 4.5 Card claro (depoimentos, público)

Fundo `--areia`, sem borda, raio 24px, padding 24px. Foto redonda de 56px, nome em Montserrat 700, cargo em Montserrat 400 `--marrom`. Depoimento em Montserrat 400 16px. Tags no rodapé do card: pílulas com fundo `--marrom`, texto `--branco-quente`, Montserrat 600 13px, sentence case.

### 4.6 Card de bônus ("E mais")

Card escuro com uma área de imagem no topo: retângulo de raio 20px, fundo `--laranja` chapado, com o mockup (notebook, tablet ou celular) inclinado ou recortado, ocupando a largura toda. Abaixo, título Oswald 600 24px e descrição.

### 4.7 Lista de benefícios com selo

Item: selo de 32px à esquerda, texto à direita. O selo tem forma de estrela arredondada (seal) em `--laranja` com check em `--preto`. Texto em Montserrat 500 17px. A primeira palavra ou expressão de cada item vai em Montserrat 700.

### 4.8 Carrossel (depoimentos e público)

- 1 card por vez no mobile, com o próximo aparecendo 10% na lateral. Gap de 12px. 2 cards no tablet, 3 no desktop.
- Autoplay a cada 5s, pausa ao tocar ou passar o mouse. Loop infinito.
- Setas abaixo do carrossel: dois círculos de 44px, fundo `--marrom`, seta `--branco-quente`.

### 4.9 Acordeão (FAQ)

Item fechado: fundo `--areia`, raio 20px, padding 18px 20px, pergunta em Montserrat 700 16px, chevron à direita em `--marrom`. Item aberto: chevron gira 180 graus, resposta em Montserrat 400 16px abaixo. Um item aberto por vez, todos começam fechados. Animação de altura de 300ms.

### 4.10 Card da oferta

Foto do Rafa no topo com canto superior arredondado em 40px. O card escuro sobe 60px por cima da foto. Borda de 1px `--laranja`, raio 28px, padding 24px, fundo em degradê de transparente para `--preto`. Dentro:
1. Título em Oswald 600 28px, centralizado.
2. Lista de itens (4.7).
3. Preço: "12x de" em Montserrat 500 18px, valor em Oswald 700 64px `--branco-quente`, "sem juros" ao lado, ou o texto conforme a copy.
4. Botão principal (4.1).
5. Linha do preço à vista em Montserrat 500 16px.
6. Texto da garantia logo abaixo do card, Montserrat 400 14px, com "Compra garantida:" em negrito.

### 4.11 Card de WhatsApp

Fundo `--superficie-escura`, raio 24px, ícone do WhatsApp verde oficial de 64px no topo (única exceção à paleta), título Oswald 600 26px centralizado, subtítulo em Montserrat 400 16px. O card inteiro é o link.

### 4.12 Divisores e detalhes

Linhas de 1px em `--dourado` a 60% de opacidade. O selo da garantia, se existir, usa `--dourado` e `--laranja`.

---

## 5. Seções (ordem fixa, igual à referência)

| # | Seção | Fundo | Componentes |
|---|---|---|---|
| 1 | Hero | Vídeo em loop escurecido sobre `--preto`, ruído, degradê até preto na base | Logo, prova de rostos (4.2), h1 com destaque, subtítulo, botão (4.1), microtexto |
| 2 | Framework (diagrama de 3 círculos) | `--branco-quente`, sobe sobre o hero com raio de 40px | h2, 2 linhas de texto, diagrama SVG de 3 círculos sobrepostos em `--areia` com borda `--marrom`, interseção central em `--laranja`. Rótulo em Oswald 600 dentro de cada círculo |
| 3 | Quem já faz parte | `--branco-quente` | Divisor (4.12), h2, carrossel (4.8) de cards claros (4.5) |
| 4 | O que muda | Foto de fundo do Rafa com overlay `--preto` a 70%, ou `--preto` chapado se não houver foto | h2 e lista com selos (4.7), 4 itens |
| 5 | Tudo o que você precisa | `--preto`, sobe com raio de 40px | h2, pilha de 3 cards sobrepostos (o do meio maior e na frente, os outros recuados, imagens 16:9 com borda de 1px `--laranja`), h3 curto, texto, botão, seta para baixo |
| 6 | O que você irá aprender | `--preto` | h2 e cards de módulo (4.4) empilhados, 12px de gap |
| 7 | E mais | `--preto` | h2 curto e cards de bônus (4.6) empilhados |
| 8 | Números | `--preto` | Números em Oswald 700 56px `--laranja`, rótulo em Montserrat 500 16px abaixo, um por linha, separados por divisor. Depois o botão |
| 9 | Para quem é | `--branco-quente`, sobe com raio de 40px | h2, frase de posicionamento com primeira linha em negrito, carrossel (4.8) de cards claros por perfil |
| 10 | Autoridade | `--branco-quente` | Foto do Rafa (raio 20px, largura total), h2 com destaque, texto longo em coluna |
| 11 | Oferta (`id="oferta"`) | `--preto` com raio superior de 40px | Card da oferta (4.10) |
| 12 | FAQ | `--branco-quente` | h2, acordeões (4.9) |
| 13 | Fechamento | `--branco-quente` | Frase final em Oswald 600 32px, botão (4.1), card de WhatsApp (4.11), divisor, logo, direitos reservados |

---

## 6. Movimento

- Entrada ao rolar, como na referência: o elemento nasce com `opacity: 0`, `filter: blur(10px)` e `translateY(-30px)`, e chega a `opacity: 1`, `blur(0)` e `translateY(0)` em 1s quando passa de 85% da altura da tela. Aplicar em títulos, cards e imagens principais. Disparar uma vez só.
- Rolagem suave em toda a página (biblioteca Lenis ou `scroll-behavior: smooth`).
- Vídeo do hero em loop, sem som, `playsinline`, com imagem de reserva (`poster`) para conexões lentas.
- Carrossel com transição de 500ms.
- Respeitar `prefers-reduced-motion: reduce`: desligar blur, deslocamento, autoplay e rolagem suave. Os elementos aparecem já visíveis.

---

## 7. Imagens e ícones

- Mockups, fotos e capas ficam sobre fundo `--laranja` chapado nos cards de bônus, raio 20px.
- Ícones de linha, traço de 1.5px, cantos arredondados, sempre em `--laranja` sobre fundo escuro. Sem emoji na interface.
- Fotos de pessoas: recorte quadrado com raio, sem filtro colorido, levemente quentes.
- Cada imagem com `alt` descritivo, `loading="lazy"` abaixo da primeira dobra e dimensões definidas para evitar salto de layout.

---

## 8. Qualidade mínima

- Mobile primeiro. Testar em 360px e 390px de largura. Sem rolagem lateral.
- Áreas de toque de 44px ou mais.
- Contraste mínimo de 4.5:1 para texto corrido e 3:1 para texto grande.
- Foco visível por teclado em todos os elementos interativos.
- Acordeão e carrossel acessíveis por teclado, com `aria-expanded` e rótulos nas setas.
- Peso da página: imagens em WebP, vídeo do hero em webm e mp4 com no máximo 3 MB.

---

## 9. O que não fazer

- Não usar gradientes decorativos fora do botão e do fundo do card da oferta.
- Não usar sombra cinza em cards.
- Não colocar rótulo em caixa alta acima dos títulos.
- Não usar numeração fora do bloco de módulos e dos passos.
- Não usar outras cores além das listadas neste arquivo, com exceção do verde do ícone do WhatsApp.
- Não usar mais de duas famílias tipográficas.

---

## 10. Componentes extras da copy (a definir quando chegarmos neles)

A copy tem elementos que a referência não tem: tabela comparativa, passos numerados e lista "É / NÃO é para você". Quando entrarem, seguir os mesmos tokens: tabela em card claro com cabeçalho `--preto` e a coluna da escola destacada por borda `--laranja-queimado`; passos em cards escuros com número em Oswald `--laranja`; listas com selo (4.7) para o "é" e ícone de X em `--marrom` para o "não é".