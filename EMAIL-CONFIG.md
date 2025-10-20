# 📧 Configuração de Email - OLV Internacional

## 🔧 Configuração SMTP/IMAP

### Servidor de Email
- **Host:** `mail.olvinternacional.com.br`
- **IMAP Port:** `993` (SSL/TLS)
- **SMTP Port:** `465` (SSL/TLS)

### Configuração para .env.local

```env
# ==========================================
# CONFIGURAÇÃO DE EMAIL
# ==========================================

# Habilitar envio de emails
EMAIL_ENABLED=true

# Configurações SMTP
SMTP_HOST=mail.olvinternacional.com.br
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=parceiro-totvs@olvinternacional.com.br
SMTP_PASSWORD=sua_senha_aqui

# Configurações de envio
EMAIL_FROM=parceiro-totvs@olvinternacional.com.br
EMAIL_FROM_NAME=OLV Internacional - Parceiro TOTVS
EMAIL_REPLY_TO=parceiro-totvs@olvinternacional.com.br

# Configurações IMAP (para recebimento)
IMAP_HOST=mail.olvinternacional.com.br
IMAP_PORT=993
IMAP_SECURE=true
IMAP_USER=parceiro-totvs@olvinternacional.com.br
IMAP_PASSWORD=sua_senha_aqui
```

## 📋 Checklist de Configuração

### ✅ 1. Variáveis de Ambiente
- [ ] Adicionar configurações acima no `.env.local`
- [ ] Definir senha do email `parceiro-totvs@olvinternacional.com.br`
- [ ] Testar conexão SMTP

### ✅ 2. Implementação de Envio
- [ ] Criar API route para envio de emails
- [ ] Integrar com formulários de contato
- [ ] Configurar templates de email

### ✅ 3. Testes
- [ ] Testar envio de email de contato
- [ ] Testar envio de leads para TOTVS
- [ ] Verificar recebimento de emails

## 🚀 Próximos Passos

1. **Configurar senha do email** no `.env.local`
2. **Implementar API de envio** de emails
3. **Integrar com formulários** existentes
4. **Testar funcionalidade** completa

## 📞 Contatos Atualizados

- **Email:** `parceiro-totvs@olvinternacional.com.br`
- **WhatsApp:** `+55 (11) 91007-4444`
- **Telefone:** `+55 (11) 2675-1446`
- **Website:** `https://olvinternacional.com.br/`

---

**Status:** ✅ Configuração preparada - Aguardando senha do email
