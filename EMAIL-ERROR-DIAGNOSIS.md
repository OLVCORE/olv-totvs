# ❌ ERRO DE AUTENTICAÇÃO EMAIL

## 🔍 Diagnóstico do Erro

**Erro:** `535 Incorrect authentication data`
**Causa:** Credenciais de email incorretas ou configuração SMTP inadequada

## 🔧 Soluções Possíveis

### 1. Verificar Credenciais
- ✅ **Email:** `parceiro-totvs@olvinternacional.com.br`
- ❓ **Senha:** `s#Bliss2711@` - **VERIFICAR SE ESTÁ CORRETA**

### 2. Configurações SMTP Alternativas

#### Opção A: Porta 587 (TLS)
```env
SMTP_HOST=mail.olvinternacional.com.br
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=parceiro-totvs@olvinternacional.com.br
SMTP_PASSWORD=s#Bliss2711@
```

#### Opção B: Porta 25 (Não Seguro)
```env
SMTP_HOST=mail.olvinternacional.com.br
SMTP_PORT=25
SMTP_SECURE=false
SMTP_USER=parceiro-totvs@olvinternacional.com.br
SMTP_PASSWORD=s#Bliss2711@
```

### 3. Verificações Necessárias

#### ✅ Checklist de Verificação:
- [ ] **Senha do email está correta?**
- [ ] **Email existe e está ativo?**
- [ ] **Servidor SMTP está funcionando?**
- [ ] **Porta 465 está liberada?**
- [ ] **Firewall não está bloqueando?**

### 4. Teste Manual

#### Via Outlook/Thunderbird:
1. Configurar conta manualmente
2. Servidor: `mail.olvinternacional.com.br`
3. Porta: `465` (SSL) ou `587` (TLS)
4. Usuário: `parceiro-totvs@olvinternacional.com.br`
5. Senha: `s#Bliss2711@`

## 🚀 Próximos Passos

### 1. Confirmar Credenciais
- Verificar senha do email
- Testar login no webmail
- Confirmar se email está ativo

### 2. Testar Configurações Alternativas
- Tentar porta 587 com TLS
- Verificar se servidor aceita conexões externas

### 3. Contatar Suporte do Provedor
- Verificar configurações SMTP
- Confirmar se autenticação externa está habilitada
- Verificar se não há bloqueios de segurança

## 📞 Ação Imediata Necessária

**Por favor, confirme:**
1. ✅ A senha `s#Bliss2711@` está correta?
2. ✅ O email `parceiro-totvs@olvinternacional.com.br` está ativo?
3. ✅ O servidor `mail.olvinternacional.com.br` está funcionando?

**Assim que confirmar, posso testar novamente!** 🔧
