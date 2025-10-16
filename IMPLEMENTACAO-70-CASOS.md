# 🔧 GUIA DE IMPLEMENTAÇÃO - 70 CASOS TOTVS

## 📋 ÍNDICE
1. [Arquitetura de Dados](#arquitetura)
2. [Componente Principal](#componente)
3. [Implementação por Página](#páginas)
4. [Checklist de QA](#qa)
5. [Performance & SEO](#performance)

---

## 🏗️ ARQUITETURA DE DADOS {#arquitetura}

### Estrutura do arquivo `lib/data/cases-master.ts`

```typescript
export interface CaseTOTVS {
  produto: string;        // "Inteligência Artificial", "ERP", etc.
  setor: string;          // "Manufatura", "Multi-setores", etc.
  area: string;           // "Supply", "BPM", "Vendas", etc.
  titulo: string;         // Título descritivo do caso
  resumoCurto: string;    // 1 linha para cards
  resumoLongo: string;    // 2-3 linhas para expansão
  ctaLabel: string;       // "Ver case", "Ler guia", etc.
  ctaLink: string;        // Texto do link
  ctaUrl: string;         // URL completa
  tags: string[];         // Para filtros futuros
}
```

### Funções auxiliares disponíveis:

```typescript
// Filtrar por produto
getCasesByProduto('Inteligência Artificial') 
// retorna: CaseTOTVS[]

// Filtrar por setor
getCasesBySetor('Manufatura')
// retorna: CaseTOTVS[]

// Filtrar por área
getCasesByArea('Supply')
// retorna: CaseTOTVS[]

// Listar todos os produtos únicos
getAllProdutos()
// retorna: string[]

// Listar todos os setores únicos
getAllSetores()
// retorna: string[]

// Listar todas as áreas únicas
getAllAreas()
// retorna: string[]
```

---

## 🎨 COMPONENTE PRINCIPAL {#componente}

### Localização: `components/consultoria/ExemploDeAplicacao.tsx`

**Props atuais**:
```typescript
interface Props {
  setor: string;
  tipoEmpresa: string;
  desafioComum: string;
  contextoMercado: string;
  resultadosReaisMercado: Array<{
    metrica: string;
    ganho: string;
    fonte: string;
    link: string;
  }>;
  comoPodemos: Array<{
    etapa: string;
    descricao: string;
  }>;
}
```

### Formato do link (OBRIGATÓRIO):

```tsx
<a 
  href={resultado.link}
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
>
  {resultado.fonte}
</a>
<span className="text-gray-500 text-sm ml-1">
  ({resultado.link})
</span>
```

**Por que este formato?**
- ✅ Link clicável e visível
- ✅ URL auditável sem precisar inspecionar código
- ✅ Conformidade com pedido do usuário
- ✅ Acessibilidade (`rel="noopener noreferrer"`)
- ✅ UX: hover states claros

---

## 📄 IMPLEMENTAÇÃO POR PÁGINA {#páginas}

### Estrutura padrão de página de produto:

```tsx
// app/solucoes/[produto]/page.tsx
import { getCasesByProduto } from '@/lib/data/cases-master';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';

export default function PaginaProduto() {
  const cases = getCasesByProduto('Inteligência Artificial');

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        {/* ... conteúdo hero ... */}
      </section>

      {/* Introdução OLV (OBRIGATÓRIA) */}
      <IntroducaoInstitucionalOLV />

      {/* Cases de Mercado */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Exemplos Reais de Aplicação no Mercado
          </h2>

          {cases.map((caso, index) => (
            <ExemploDeAplicacao
              key={index}
              setor={caso.setor}
              tipoEmpresa={`${caso.setor} - ${caso.area}`}
              desafioComum={caso.resumoLongo}
              contextoMercado={`Case real de aplicação: ${caso.titulo}`}
              resultadosReaisMercado={[
                {
                  metrica: caso.area,
                  ganho: caso.resumoCurto,
                  fonte: caso.ctaLink,
                  link: caso.ctaUrl
                }
              ]}
              comoPodemos={[
                {
                  etapa: "Diagnóstico estratégico",
                  descricao: "Avaliamos sua operação e identificamos como aplicar tecnologia TOTVS no seu contexto."
                },
                {
                  etapa: "Roadmap de implementação",
                  descricao: "Desenhamos fases de adoção alinhadas à sua maturidade e prioridades."
                }
              ]}
            />
          ))}
        </div>
      </section>

      {/* Features do Produto (manter existente) */}
      {/* CTA Final (manter existente) */}
    </div>
  );
}
```

---

## ✅ CHECKLIST DE QA {#qa}

### Para cada página de produto:

#### Estrutura:
- [ ] Hero section presente e responsivo
- [ ] `<IntroducaoInstitucionalOLV />` logo após hero
- [ ] Seção "Exemplos Reais" com título centralizado
- [ ] Mínimo de 3 casos por produto (ideal: 5)
- [ ] Casos mapeados do `CASES_MASTER` correto

#### Links:
- [ ] Todos os links abrem em nova aba (`target="_blank"`)
- [ ] `rel="noopener noreferrer"` presente
- [ ] URL visível entre parênteses após link
- [ ] Hover states funcionando (azul → azul escuro + underline)
- [ ] Nenhum link quebrado (testar manualmente)

#### Conteúdo:
- [ ] Tom consultivo (OLV como facilitador, não implementador)
- [ ] Sem linguagem de "vendas/conversão/leads"
- [ ] Foco em "ajudar empresas a entenderem"
- [ ] Exemplos reais e verificáveis
- [ ] CTAs apropriados ("Ver case", "Ler guia", não "Comprar")

#### Responsividade:
- [ ] Layout mobile-first funcionando
- [ ] Cards de casos empilhados em mobile
- [ ] Links clicáveis em telas touch
- [ ] Imagens/ícones dimensionados corretamente
- [ ] Espaçamentos proporcionais (padding/margin)

#### Performance:
- [ ] Componentes sem imports desnecessários
- [ ] Imagens otimizadas (Next.js Image)
- [ ] Lazy loading em componentes pesados
- [ ] Build sem erros TypeScript
- [ ] Build sem warnings de hidratação

---

## ⚡ PERFORMANCE & SEO {#performance}

### Meta Tags (para cada página):

```tsx
export const metadata: Metadata = {
  title: 'Inteligência Artificial TOTVS | OLV Internacional',
  description: '5 casos reais de IA aplicada a negócios: atendimento, vendas conversacionais e CX. Entenda como aplicar IA na sua operação com consultoria OLV + tecnologia TOTVS.',
  keywords: 'IA, inteligência artificial, TOTVS, consultoria, automação, CX',
  openGraph: {
    title: 'IA para Negócios - Cases Reais TOTVS',
    description: 'Exemplos práticos de como empresas aplicam IA em atendimento, vendas e experiência do cliente.',
    images: ['/images/og-ia-totvs.jpg'],
  },
};
```

### Otimizações de código:

```tsx
// ❌ NÃO FAZER (re-busca a cada render)
function Pagina() {
  const cases = getCasesByProduto('IA');
  // ...
}

// ✅ FAZER (busca única no build)
const cases = getCasesByProduto('IA');

export default function Pagina() {
  // ...
}
```

### Lazy loading para componentes pesados:

```tsx
import dynamic from 'next/dynamic';

const ExemploDeAplicacao = dynamic(
  () => import('@/components/consultoria/ExemploDeAplicacao'),
  { 
    loading: () => <p>Carregando exemplos...</p>,
    ssr: true // manter SSR para SEO
  }
);
```

---

## 🗂️ MAPA DE PRODUTOS E ARQUIVOS

| Produto | Arquivo | Casos |
|---------|---------|-------|
| Inteligência Artificial | `app/solucoes/inteligencia-artificial/page.tsx` | 5 |
| ERP / Sistema de Gestão | `app/solucoes/sistema-de-gestao/page.tsx` | 5 |
| Analytics | `app/solucoes/analytics/page.tsx` | 4 |
| Assinatura Eletrônica | `app/solucoes/assinatura-eletronica/page.tsx` | 4 |
| Fluig | `app/solucoes/fluig/page.tsx` | 5 |
| iPaaS | `app/solucoes/ipaas/page.tsx` | 5 |
| CRM | `app/solucoes/crm-automacao/page.tsx` | 3 |
| Techfin | `app/solucoes/techfin/page.tsx` | 4 |
| RH | `app/solucoes/rh/page.tsx` | 3 |
| Cloud | `app/solucoes/cloud/page.tsx` | 3 |
| Pagamentos | `app/solucoes/pagamentos/page.tsx` | 3 |
| Marketing Digital | `app/solucoes/marketing-digital/page.tsx` | 3 |
| SFA | `app/solucoes/sfa/page.tsx` | 1 |

**Total**: 13 páginas de produto com 48 casos distribuídos  
**Nota**: Os outros 22 casos são transversais (Supply, Logística, Distribuição) e serão usados em páginas de setor.

---

## 🎯 EXEMPLO COMPLETO: PÁGINA DE IA

```tsx
// app/solucoes/inteligencia-artificial/page.tsx
import { Metadata } from 'next';
import { getCasesByProduto } from '@/lib/data/cases-master';
import IntroducaoInstitucionalOLV from '@/components/consultoria/IntroducaoInstitucionalOLV';
import ExemploDeAplicacao from '@/components/consultoria/ExemploDeAplicacao';

export const metadata: Metadata = {
  title: 'Inteligência Artificial TOTVS | OLV Internacional',
  description: '5 casos reais de IA: atendimento, vendas e CX com tecnologia TOTVS.',
};

const cases = getCasesByProduto('Inteligência Artificial');

export default function InteligenciaArtificialPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Inteligência Artificial Aplicada a Negócios
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Transforme atendimento, vendas e experiência do cliente com IA integrada ao seu ERP
          </p>
        </div>
      </section>

      {/* Introdução OLV */}
      <IntroducaoInstitucionalOLV />

      {/* Cases */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Exemplos Reais de Aplicação no Mercado
          </h2>
          <p className="text-lg text-gray-600 mb-12 text-center max-w-3xl mx-auto">
            Veja como empresas de diferentes setores estão aplicando IA com TOTVS para acelerar decisões, 
            melhorar experiência e reduzir custos operacionais.
          </p>

          <div className="space-y-8">
            {cases.slice(0, 5).map((caso, index) => (
              <ExemploDeAplicacao
                key={index}
                setor={caso.setor}
                tipoEmpresa={`${caso.setor} - ${caso.area}`}
                desafioComum={caso.resumoLongo}
                contextoMercado={`Evidência de mercado: ${caso.titulo}. ${caso.resumoLongo}`}
                resultadosReaisMercado={[
                  {
                    metrica: caso.area,
                    ganho: caso.resumoCurto,
                    fonte: caso.ctaLink,
                    link: caso.ctaUrl
                  }
                ]}
                comoPodemos={[
                  {
                    etapa: "Mapeamento de oportunidades",
                    descricao: "Identificamos onde IA pode gerar maior impacto na sua operação (atendimento, vendas, logística)."
                  },
                  {
                    etapa: "Piloto orientado a resultados",
                    descricao: "Desenhamos prova de conceito com métricas claras antes de escalar."
                  },
                  {
                    etapa: "Integração com seu ERP",
                    descricao: "Conectamos IA aos seus dados de gestão para decisões contextualizadas e em tempo real."
                  }
                ]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-blue-600 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Pronto para aplicar IA na sua operação?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Agende um diagnóstico estratégico com a OLV Internacional
          </p>
          <a
            href="/diagnostico"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition"
          >
            Iniciar Diagnóstico
          </a>
        </div>
      </section>
    </div>
  );
}
```

---

## 🚦 STATUS DE IMPLEMENTAÇÃO

### ✅ COMPLETO:
- [x] Arquivo `cases-master.ts` criado com 70 casos
- [x] Interface TypeScript definida
- [x] Funções auxiliares de filtro
- [x] Componente `ExemploDeAplicacao` com links clicáveis
- [x] Componente `IntroducaoInstitucionalOLV` institucional

### 🔄 EM PROGRESSO:
- [ ] Implementar casos em todas as 13 páginas de produto
- [ ] Testar links (validação 404)
- [ ] Ajustar tom consultivo em textos remanescentes
- [ ] Criar páginas de setor com filtros cruzados

### 📋 PRÓXIMOS PASSOS:
1. Implementar `IA`, `ERP`, `Analytics`, `Assinatura` (pilares)
2. Implementar `Fluig`, `iPaaS`, `CRM`, `Techfin` (complementares)
3. Implementar `RH`, `Cloud`, `Pagamentos`, `Marketing`, `SFA` (finalizadores)
4. Criar páginas de setor (Manufatura, Varejo, Logística, etc.)
5. Configurar sitemap.xml com todas as URLs
6. Deploy e validação de links em produção

---

## 📞 SUPORTE

**Dúvidas técnicas**: Consultar este guia e `DADOS-MASTER-70-CASOS.md`  
**Dúvidas de conteúdo**: Consultar `IMPLEMENTACAO-CONSULTIVA.md`  
**Validação de links**: Rodar script de validação (a criar)  

---

**Última atualização**: 16 de outubro de 2025  
**Versão**: 1.0.0  
**Status**: ✅ DOCUMENTAÇÃO MASTER COMPLETA

