# OLV Internacional + TOTVS - Website Institucional

Website corporativo de alta qualidade desenvolvido com Next.js 14, TypeScript e Tailwind CSS para a OLV Internacional, Agente de Negócio TOTVS.

## 🚀 Características

- **Next.js 14** (App Router) com TypeScript
- **Tailwind CSS** para estilização
- **MongoDB** para persistência de dados
- **Autenticação JWT** para dashboard administrativo
- **Sistema de Diagnóstico** de 5 etapas
- **Dashboard** completo para gestão de leads
- **Integração TOTVS** (estrutura mock preparada)
- **9 Módulos de Soluções** TOTVS
- **7 Páginas Setoriais** especializadas
- **Responsivo** e otimizado para todos os dispositivos

## 📋 Pré-requisitos

- Node.js 18+ instalado
- MongoDB instalado ou conta no MongoDB Atlas
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd OLV-TOTVS
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.local.example .env.local
```

Edite `.env.local` com suas configurações:
```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/olv-totvs
MONGODB_DB=olv-totvs

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# JWT
JWT_SECRET=your-jwt-secret-key-here

# API TOTVS (futura integração)
TOTVS_API_URL=https://api.totvs.com.br/v1
TOTVS_API_TOKEN=your-totvs-api-token
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

5. Acesse http://localhost:3000

## 🗂️ Estrutura do Projeto

```
OLV-TOTVS/
├── app/                          # App Router (Next.js 14)
│   ├── (pages)/
│   │   ├── page.tsx             # Homepage
│   │   ├── sobre/               # Sobre nós
│   │   ├── contato/             # Contato
│   │   ├── solucoes/            # Soluções TOTVS
│   │   ├── setores/             # Setores verticais
│   │   └── diagnostico/         # Sistema de diagnóstico
│   ├── admin/                   # Dashboard administrativo
│   │   ├── login/
│   │   └── dashboard/
│   ├── api/                     # API Routes
│   │   ├── auth/                # Autenticação
│   │   ├── leads/               # Gestão de leads
│   │   └── totvs/               # Integração TOTVS
│   ├── layout.tsx               # Layout global
│   └── globals.css              # Estilos globais
├── components/                   # Componentes React
│   ├── home/                    # Componentes da homepage
│   ├── diagnostico/             # Steps do diagnóstico
│   ├── Header.tsx               # Cabeçalho
│   └── Footer.tsx               # Rodapé
├── lib/                         # Utilitários e configurações
│   ├── mongodb.ts               # Conexão MongoDB
│   ├── auth.ts                  # Funções de autenticação
│   ├── utils.ts                 # Funções auxiliares
│   └── data/                    # Dados estáticos
│       ├── solucoes.ts          # Soluções TOTVS
│       └── setores.ts           # Setores verticais
├── models/                      # Modelos MongoDB
│   ├── Lead.ts
│   ├── User.ts
│   ├── BlogPost.ts
│   └── IntegracaoTOTVS.ts
├── types/                       # TypeScript types
│   └── index.ts
├── public/                      # Arquivos estáticos
├── tailwind.config.ts           # Config Tailwind
├── next.config.mjs              # Config Next.js
└── package.json
```

## 🎨 Páginas Implementadas

### Públicas
- **Homepage** - Hero, Soluções, Setores, Como Funciona, Cases, Parceria, CTA
- **Soluções** - Listagem e páginas detalhadas de 9 módulos TOTVS
- **Setores** - 7 páginas setoriais especializadas
- **Diagnóstico** - Formulário de 5 etapas para qualificação de leads
- **Sobre** - Informações institucionais
- **Contato** - Informações de contato

### Administrativas (requer autenticação)
- **Login** - Autenticação JWT
- **Dashboard** - Visualização e gestão de leads

## 🔐 Usuários Demo

Para acessar o dashboard administrativo:

```
Email: admin@olv.com
Senha: admin123
```

**⚠️ IMPORTANTE:** Criar usuário real via seed ou script de setup antes do deploy em produção.

## 📊 API Endpoints

### Públicos
- `POST /api/leads` - Criar novo lead (diagnóstico)
- `GET /api/leads` - Listar leads (requer auth)

### Autenticação
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Verificar autenticação

### Integração TOTVS
- `POST /api/totvs/send-lead` - Enviar lead para TOTVS (mock)
- `GET /api/totvs/send-lead?leadId=X` - Histórico de integrações

## 🚀 Deploy (Vercel)

1. Faça push para o GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [seu-repositorio]
git push -u origin main
```

2. Importe no Vercel:
   - Acesse [vercel.com](https://vercel.com)
   - Import Git Repository
   - Configure as variáveis de ambiente

3. Deploy automático a cada push!

## 📝 Variáveis de Ambiente (Produção)

Configure no Vercel Dashboard:

```env
MONGODB_URI=mongodb+srv://...
NEXTAUTH_URL=https://seu-dominio.com
NEXTAUTH_SECRET=[gerar novo secret]
JWT_SECRET=[gerar novo secret]
TOTVS_API_URL=https://api.totvs.com.br/v1
TOTVS_API_TOKEN=[token fornecido pela TOTVS]
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Lint do código
```

## 🎯 Próximos Passos (Roadmap)

- [ ] Implementar Blog com Sanity CMS
- [ ] Criar usuários admin via script/seed
- [ ] Conectar API real da TOTVS (substituir mock)
- [ ] Implementar envio de emails (notificações)
- [ ] Analytics (Google Analytics / Vercel Analytics)
- [ ] Testes automatizados (Jest + React Testing Library)
- [ ] Melhorias de SEO (sitemap, robots.txt)
- [ ] Páginas de Política de Privacidade e Termos de Uso

## 📄 Licença

© 2024 OLV Internacional. Todos os direitos reservados.

## 👥 Suporte

Para suporte, entre em contato:
- Email: contato@olvinternacional.com.br
- Telefone: +55 (11) 99999-9999

---

**Desenvolvido com Next.js 14, TypeScript e Tailwind CSS**

