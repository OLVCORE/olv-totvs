# 🔐 Variáveis de Ambiente - OLV TOTVS

## 📋 Configuração Completa

Este documento lista todas as variáveis de ambiente necessárias para o projeto.

---

## 🚀 Quick Start

### 1. Criar arquivo `.env.local`

```bash
# Copiar template
cp .env.local.example .env.local

# Ou criar manualmente
touch .env.local
```

### 2. Gerar Secrets Seguros

```bash
# Gerar JWT_SECRET
openssl rand -base64 32

# Gerar NEXTAUTH_SECRET
openssl rand -base64 32
```

---

## 📝 Variáveis Obrigatórias

### Database

```env
# MongoDB Connection String
MONGODB_URI=mongodb://localhost:27017/olv-totvs

# Produção (MongoDB Atlas):
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/olv-totvs

# Nome do banco
MONGODB_DB=olv-totvs
```

### Autenticação

```env
# Secret JWT (mínimo 32 caracteres)
JWT_SECRET=your-jwt-secret-min-32-chars

# Secret NextAuth (mínimo 32 caracteres)
NEXTAUTH_SECRET=your-nextauth-secret-min-32-chars

# URL da aplicação
NEXTAUTH_URL=http://localhost:3000

# Expiração do token
JWT_EXPIRY=7d
```

---

## 🔌 Variáveis Opcionais

### Integração TOTVS

```env
# URL da API TOTVS
TOTVS_API_URL=https://api.totvs.com.br/v1

# Token de acesso
TOTVS_API_TOKEN=your-token-here

# Habilitar integração (false = mock)
TOTVS_INTEGRATION_ENABLED=false
```

### Analytics

```env
# Google Tag Manager
NEXT_PUBLIC_GTM_ID=GTM-T3P68DR

# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Sentry Error Tracking
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SENTRY_ENABLED=true
```

### Email (Futuro)

```env
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your-api-key
EMAIL_FROM=contato@olvinternacional.com.br
EMAIL_FROM_NAME=OLV Internacional
```

### Rate Limiting (Redis)

```env
# Upstash Redis (opcional)
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token
REDIS_ENABLED=false
```

### App Config

```env
NEXT_PUBLIC_APP_URL=https://olvinternacional.com.br
NODE_ENV=development
```

---

## 🏗️ Ambientes

### Development

```env
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/olv-totvs
JWT_SECRET=dev-secret-change-in-production
NEXTAUTH_SECRET=dev-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
TOTVS_INTEGRATION_ENABLED=false
REDIS_ENABLED=false
SENTRY_ENABLED=false
```

### Staging

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...atlas.mongodb.net/olv-totvs-staging
JWT_SECRET=<gerar-secret-seguro-32-chars>
NEXTAUTH_SECRET=<gerar-secret-seguro-32-chars>
NEXTAUTH_URL=https://staging.olvinternacional.com.br
TOTVS_INTEGRATION_ENABLED=false
REDIS_ENABLED=false
SENTRY_ENABLED=true
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

### Production

```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://...atlas.mongodb.net/olv-totvs
JWT_SECRET=<secret-seguro-unico-32-chars>
NEXTAUTH_SECRET=<secret-seguro-unico-32-chars>
NEXTAUTH_URL=https://olvinternacional.com.br
TOTVS_INTEGRATION_ENABLED=true
TOTVS_API_URL=https://api.totvs.com.br/v1
TOTVS_API_TOKEN=<token-real-totvs>
REDIS_ENABLED=true
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=<token-redis>
SENTRY_ENABLED=true
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
SMTP_HOST=smtp.sendgrid.net
SMTP_USER=apikey
SMTP_PASS=<api-key-sendgrid>
```

---

## 🔒 Segurança

### ✅ Boas Práticas

1. **Nunca** commitar `.env.local` no Git
2. Usar **secrets manager** em produção (Vercel, AWS)
3. **Rotacionar** secrets regularmente (3-6 meses)
4. Secrets com **mínimo 32 caracteres**
5. **Diferentes secrets** para cada ambiente

### ⚠️ Validação

O arquivo `lib/config.ts` valida automaticamente:

- Variáveis obrigatórias em produção
- Tamanho mínimo de secrets (32 chars)
- Formato de URLs

### 🔐 Gerar Secrets Seguros

```bash
# Método 1: OpenSSL
openssl rand -base64 32

# Método 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Método 3: Online (use com cautela)
# https://generate-secret.vercel.app/32
```

---

## 🚀 Deploy no Vercel

### Via CLI

```bash
# Adicionar variáveis
vercel env add MONGODB_URI production
vercel env add JWT_SECRET production
vercel env add NEXTAUTH_SECRET production

# Listar variáveis
vercel env ls

# Remover variável
vercel env rm VARIABLE_NAME production
```

### Via Dashboard

1. Acessar: https://vercel.com/dashboard
2. Selecionar projeto
3. Settings → Environment Variables
4. Adicionar cada variável

---

## 📊 Checklist de Configuração

### Desenvolvimento

- [ ] `.env.local` criado
- [ ] `MONGODB_URI` configurado (local ou Atlas)
- [ ] `JWT_SECRET` definido (dev fallback OK)
- [ ] `NEXTAUTH_SECRET` definido (dev fallback OK)

### Staging

- [ ] Variáveis no Vercel configuradas
- [ ] Secrets seguros gerados (32+ chars)
- [ ] MongoDB Atlas cluster criado
- [ ] Sentry DSN configurado
- [ ] TOTVS integration = false (mock)

### Produção

- [ ] **Todos** os secrets gerados novamente (únicos)
- [ ] MongoDB Atlas cluster de produção
- [ ] Backup automático configurado
- [ ] TOTVS credentials reais configuradas
- [ ] Redis configurado (Upstash)
- [ ] Sentry configurado
- [ ] SMTP configurado (SendGrid/Mailgun)
- [ ] Alertas configurados

---

## 🆘 Troubleshooting

### Erro: "Missing required environment variable"

```bash
# Verificar se .env.local existe
ls -la .env.local

# Verificar se variável está definida
echo $JWT_SECRET

# Restartar servidor Next.js
npm run dev
```

### Erro: "Invalid configuration"

- Verificar comprimento de secrets (mínimo 32 chars)
- Verificar formato de URLs (https://)
- Verificar MongoDB connection string

### MongoDB não conecta

```bash
# Testar conexão
mongosh "mongodb://localhost:27017/olv-totvs"

# Ou com Atlas
mongosh "mongodb+srv://..."
```

---

## 📚 Recursos

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Upstash Redis](https://upstash.com/)
- [Sentry](https://sentry.io/)
- [SendGrid](https://sendgrid.com/)

---

*Última atualização: 20 de Outubro de 2025*

