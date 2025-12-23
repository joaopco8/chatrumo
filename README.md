# Waltinho Responde - Assistente Técnico Ferroviário

Assistente técnico em engenharia ferroviária para suporte ao revistamento de vagões ZTO.

## 🚀 Tecnologias

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Lucide React** (ícones)

## 📋 Funcionalidades

- Chat interface similar ao WhatsApp Web
- Base de conhecimento técnica sobre revistamento ZTO
- Sistema de matching inteligente para encontrar respostas
- Autenticação por matrícula (CS)
- Design responsivo (mobile e desktop)
- 144+ itens na base de conhecimento

## 🏗️ Estrutura do Projeto

```
my-app/
├── data/                          # Bases de conhecimento
│   ├── knowledge_base.json       # Base original (17 itens)
│   ├── knowledge_base_zto_extended.json  # Base estendida (113 itens)
│   └── knowledge_base_comprehensive.json # Respostas completas (14 itens)
├── public/                        # Assets estáticos
│   ├── chat-background.jpg       # Background da conversa
│   ├── verification-badge.png    # Badge de verificação
│   └── waltinho-profile.jpg      # Foto de perfil
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts      # API endpoint /api/chat
│   │   ├── globals.css           # Estilos globais
│   │   ├── layout.tsx            # Layout raiz
│   │   └── page.tsx              # Página principal
│   ├── components/               # Componentes React
│   │   ├── ChatLayout.tsx        # Layout principal do chat
│   │   ├── ChatHeader.tsx        # Cabeçalho do chat
│   │   ├── Sidebar.tsx           # Barra lateral (desktop)
│   │   ├── MessageBubble.tsx     # Bolha de mensagem
│   │   └── MessageInput.tsx      # Campo de input
│   ├── lib/                      # Bibliotecas utilitárias
│   │   ├── text-normalizer.ts    # Normalização de texto
│   │   └── knowledge-matcher.ts   # Sistema de matching
│   └── types/                    # Tipos TypeScript
│       ├── api.ts                # Tipos da API
│       └── message.ts            # Tipos de mensagem
└── zto.md                        # Documento de referência ZTO
```

## 🚦 Como Executar

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

### Build de Produção

```bash
npm run build
npm start
```

## 🔐 Autenticação

O chat requer autenticação por matrícula (CS):
- **Matrícula padrão:** `123456`
- Informe a matrícula na primeira mensagem
- Após autenticação, não é necessário informar novamente na sessão

## 📚 Base de Conhecimento

O sistema possui **144 itens** de conhecimento técnico sobre:
- Procedimentos de revistamento ZTO
- Sistema de freio (mangueiras, sapatas, DDV, etc.)
- Inspeção de rodas e eixos
- Truques e componentes
- Engates e ACTs
- Longarinas e estrutura
- Classificação de vagões (Isolado, Retido, Crítico, Monitorado)
- Segurança e bloqueio

## 🎨 Design

- Interface inspirada no WhatsApp Web
- Cores: #0b141a (background), #111b21 (sidebar), #005c4b (mensagens usuário)
- Responsivo: sidebar oculta no mobile
- Background personalizado com overlay escuro

## 📝 Licença

Este projeto é de uso interno.

## 👤 Autor

Desenvolvido para suporte técnico ferroviário - RUMO
