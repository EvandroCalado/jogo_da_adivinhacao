# Jogo da Adivinhação

Jogo de adivinhação de palavras em português. O jogador tenta adivinhar letra por letra uma palavra sorteada, com dicas e número limitado de tentativas.

## Funcionalidades

- Mais de 500 palavras em português com dicas
- Sistema de tentativas (maxAttempts = `round(word.length * 1.7)`)
- Contagem total de palpites (incluindo repetidos)
- Confetes ao vencer
- Modal de fim de jogo ao esgotar tentativas ou desistir
- Suporte a acentos (normalização NFD)
- Atalho de teclado (Enter para confirmar)
- Botão de reiniciar com confirmação (mostra a palavra antes de reiniciar)

## Tech Stack

- **React 19** com TypeScript
- **Vite 8** (bundler)
- **CSS Modules** (estilização)
- **react-confetti** (efeito de vitória)

## Comandos

```bash
pnpm dev       # Servidor de desenvolvimento
pnpm build     # Build de produção
pnpm lint      # ESLint
pnpm preview   # Preview do build
```

## Estrutura

```
src/
├── hooks/        # Lógica do jogo (useGame)
├── components/   # Componentes React (Button, Header, Input, Letter, Letters, Tip)
├── utils/        # Utilitários (normalize, words)
├── App.tsx       # Componente principal (UI)
└── main.tsx      # Entry point
```

## Licença

MIT
