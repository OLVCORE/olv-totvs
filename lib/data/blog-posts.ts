export interface BlogPost {
  id: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  categoria: string;
  autor: {
    nome: string;
    cargo: string;
    avatar: string;
  };
  data_publicacao: string;
  tempo_leitura: string;
  imagem_destaque: string;
  resumo: string;
  conteudo: string;
  tags: string[];
  destaque: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'transformacao-digital-erp',
    titulo: 'Transformação Digital: Como o ERP TOTVS Revoluciona Sua Gestão',
    subtitulo: 'Descubra como a tecnologia pode otimizar seus processos empresariais',
    categoria: 'Gestão Empresarial',
    autor: {
      nome: 'Carlos Silva',
      cargo: 'Especialista em ERP',
      avatar: '/images/avatars/carlos.jpg',
    },
    data_publicacao: '2025-01-15',
    tempo_leitura: '8 min',
    imagem_destaque: '/images/blog/transformacao-digital.jpg',
    resumo: 'A transformação digital não é mais uma opção, mas uma necessidade para empresas que desejam se manter competitivas. Neste artigo, exploramos como o ERP TOTVS pode ser o catalisador dessa mudança.',
    conteudo: `
      <p>A transformação digital tem se tornado cada vez mais essencial para empresas de todos os tamanhos. Com a evolução tecnológica acelerada, processos manuais e sistemas desconectados podem significar a perda de competitividade no mercado.</p>
      
      <h2>O que é Transformação Digital?</h2>
      <p>Transformação digital é a integração de tecnologia digital em todas as áreas de um negócio, mudando fundamentalmente como você opera e entrega valor aos clientes.</p>
      
      <h2>Como o ERP TOTVS Ajuda</h2>
      <ul>
        <li>Centralização de dados em tempo real</li>
        <li>Automação de processos manuais</li>
        <li>Análises preditivas com IA</li>
        <li>Integração com outros sistemas</li>
      </ul>
      
      <h2>Resultados Comprovados</h2>
      <p>Empresas que implementaram o ERP TOTVS reportam redução de até 40% no tempo de fechamento contábil e aumento de 35% na produtividade operacional.</p>
    `,
    tags: ['ERP', 'Transformação Digital', 'Gestão', 'TOTVS'],
    destaque: true,
  },
  {
    id: '2',
    slug: 'automacao-processos-fluig',
    titulo: 'Automação de Processos: 5 Casos de Uso do Fluig',
    subtitulo: 'Elimine papel e ganhe eficiência com workflows inteligentes',
    categoria: 'Automação',
    autor: {
      nome: 'Maria Santos',
      cargo: 'Consultora de BPM',
      avatar: '/images/avatars/maria.jpg',
    },
    data_publicacao: '2025-01-10',
    tempo_leitura: '6 min',
    imagem_destaque: '/images/blog/automacao-fluig.jpg',
    resumo: 'Descubra 5 casos práticos de como o Fluig pode automatizar processos críticos da sua empresa, reduzindo tempo e custos operacionais.',
    conteudo: `
      <p>O Fluig é a plataforma de automação de processos da TOTVS que permite criar workflows inteligentes sem necessidade de programação complexa.</p>
      
      <h2>5 Casos de Uso Essenciais</h2>
      
      <h3>1. Aprovação de Compras</h3>
      <p>Automatize todo o fluxo de solicitação, cotação e aprovação de compras com múltiplos níveis de aprovação baseados em valores.</p>
      
      <h3>2. Gestão de Documentos</h3>
      <p>Digitalize e organize todos os documentos da empresa com controle de versão e rastreabilidade completa.</p>
      
      <h3>3. Onboarding de Funcionários</h3>
      <p>Crie um processo estruturado de integração que garante que todos os passos sejam seguidos.</p>
      
      <h3>4. Solicitações de Férias</h3>
      <p>Simplifique pedidos e aprovações de férias com validação automática de saldo.</p>
      
      <h3>5. Controle de Qualidade</h3>
      <p>Implemente checklists e inspeções com registro fotográfico e assinaturas digitais.</p>
    `,
    tags: ['Fluig', 'Automação', 'BPM', 'Workflows'],
    destaque: true,
  },
  {
    id: '3',
    slug: 'inteligencia-artificial-negocios',
    titulo: 'IA nos Negócios: Como Começar Sua Jornada',
    subtitulo: 'Guia prático para implementar inteligência artificial na sua empresa',
    categoria: 'Inteligência Artificial',
    autor: {
      nome: 'Rafael Costa',
      cargo: 'Especialista em IA',
      avatar: '/images/avatars/rafael.jpg',
    },
    data_publicacao: '2025-01-05',
    tempo_leitura: '10 min',
    imagem_destaque: '/images/blog/ia-negocios.jpg',
    resumo: 'A Inteligência Artificial não é mais ficção científica. Veja como aplicar IA de forma prática e acessível no seu negócio.',
    conteudo: `
      <p>Inteligência Artificial (IA) está transformando a maneira como as empresas operam, desde atendimento ao cliente até análise de dados complexos.</p>
      
      <h2>Por Onde Começar?</h2>
      <p>A implementação de IA deve ser gradual e focada em resolver problemas específicos do seu negócio.</p>
      
      <h2>Aplicações Práticas de IA</h2>
      <ul>
        <li><strong>Chatbots Inteligentes:</strong> Atendimento 24/7 automatizado</li>
        <li><strong>Análise Preditiva:</strong> Previsão de demanda e vendas</li>
        <li><strong>Detecção de Fraudes:</strong> Identificação automática de anomalias</li>
        <li><strong>Recomendações:</strong> Personalização da experiência do cliente</li>
      </ul>
      
      <h2>ROI da IA</h2>
      <p>Empresas que implementaram IA reportam redução de até 70% em custos operacionais e aumento de 45% na satisfação do cliente.</p>
    `,
    tags: ['IA', 'Machine Learning', 'Inovação', 'Tecnologia'],
    destaque: true,
  },
  {
    id: '4',
    slug: 'cloud-computing-vantagens',
    titulo: 'Cloud Computing: 7 Vantagens para Seu Negócio',
    subtitulo: 'Entenda por que migrar para a nuvem é estratégico',
    categoria: 'Cloud',
    autor: {
      nome: 'Ana Paula',
      cargo: 'Arquiteta de Soluções Cloud',
      avatar: '/images/avatars/ana.jpg',
    },
    data_publicacao: '2025-01-01',
    tempo_leitura: '7 min',
    imagem_destaque: '/images/blog/cloud-vantagens.jpg',
    resumo: 'Descubra as principais vantagens de migrar seus sistemas para a nuvem e como isso pode impulsionar seu negócio.',
    conteudo: `
      <p>A computação em nuvem deixou de ser tendência para se tornar padrão de mercado. Empresas de todos os portes estão migrando para a cloud.</p>
      
      <h2>7 Vantagens Principais</h2>
      
      <h3>1. Redução de Custos</h3>
      <p>Elimine investimentos em infraestrutura física e pague apenas pelo que usar.</p>
      
      <h3>2. Escalabilidade</h3>
      <p>Aumente ou reduza recursos conforme a demanda, sem desperdícios.</p>
      
      <h3>3. Disponibilidade 99.9%</h3>
      <p>Garanta que seus sistemas estejam sempre disponíveis.</p>
      
      <h3>4. Segurança Avançada</h3>
      <p>Proteção de dados com criptografia e compliance garantido.</p>
      
      <h3>5. Trabalho Remoto</h3>
      <p>Acesse seus sistemas de qualquer lugar, com segurança.</p>
      
      <h3>6. Backup Automático</h3>
      <p>Nunca perca dados com backups contínuos e disaster recovery.</p>
      
      <h3>7. Atualizações Automáticas</h3>
      <p>Sempre na última versão, sem downtime.</p>
    `,
    tags: ['Cloud', 'Infraestrutura', 'Segurança', 'TOTVS Cloud'],
    destaque: false,
  },
  {
    id: '5',
    slug: 'crm-vendas-b2b',
    titulo: 'CRM para Vendas B2B: Guia Completo',
    subtitulo: 'Como escolher e implementar um CRM que aumenta suas vendas',
    categoria: 'Vendas',
    autor: {
      nome: 'Pedro Oliveira',
      cargo: 'Consultor de Vendas',
      avatar: '/images/avatars/pedro.jpg',
    },
    data_publicacao: '2024-12-28',
    tempo_leitura: '9 min',
    imagem_destaque: '/images/blog/crm-b2b.jpg',
    resumo: 'Um CRM bem implementado pode aumentar suas vendas em até 30%. Veja como escolher a ferramenta certa e implementar com sucesso.',
    conteudo: `
      <p>No mundo B2B, onde os ciclos de vendas são longos e complexos, um CRM robusto é essencial para gerenciar relacionamentos e oportunidades.</p>
      
      <h2>O que Procurar em um CRM B2B</h2>
      <ul>
        <li>Gestão de pipeline visual</li>
        <li>Automação de follow-ups</li>
        <li>Integração com e-mail e WhatsApp</li>
        <li>Relatórios de performance</li>
        <li>Previsão de vendas com IA</li>
      </ul>
      
      <h2>Implementação de Sucesso</h2>
      <p>A chave para o sucesso está na adoção pela equipe. Treinamento e processos claros são fundamentais.</p>
      
      <h2>Resultados Esperados</h2>
      <p>Empresas que implementaram CRM adequadamente reportam aumento de 30% na conversão e redução de 50% no ciclo de vendas.</p>
    `,
    tags: ['CRM', 'Vendas', 'B2B', 'Automação'],
    destaque: false,
  },
  {
    id: '6',
    slug: 'analytics-tomada-decisao',
    titulo: 'Analytics: Decisões Baseadas em Dados',
    subtitulo: 'Como usar análise de dados para impulsionar resultados',
    categoria: 'Business Intelligence',
    autor: {
      nome: 'Juliana Ferreira',
      cargo: 'Analista de BI',
      avatar: '/images/avatars/juliana.jpg',
    },
    data_publicacao: '2024-12-20',
    tempo_leitura: '8 min',
    imagem_destaque: '/images/blog/analytics-decisao.jpg',
    resumo: 'Transforme dados brutos em insights acionáveis e tome decisões estratégicas com confiança usando Analytics.',
    conteudo: `
      <p>Em um mundo orientado por dados, a capacidade de analisar e interpretar informações é um diferencial competitivo crucial.</p>
      
      <h2>O Poder do Analytics</h2>
      <p>Analytics permite identificar padrões, prever tendências e tomar decisões baseadas em evidências, não em intuição.</p>
      
      <h2>KPIs Essenciais para Acompanhar</h2>
      <ul>
        <li>Taxa de conversão de leads</li>
        <li>Ticket médio</li>
        <li>CAC (Custo de Aquisição de Cliente)</li>
        <li>LTV (Lifetime Value)</li>
        <li>Churn rate</li>
      </ul>
      
      <h2>Implementando uma Cultura Data-Driven</h2>
      <p>A transformação começa com a democratização dos dados e capacitação das equipes.</p>
    `,
    tags: ['Analytics', 'BI', 'Data', 'Estratégia'],
    destaque: false,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug);
}

export function getFeaturedPosts(): BlogPost[] {
  return BLOG_POSTS.filter(post => post.destaque);
}

export function getPostsByCategory(categoria: string): BlogPost[] {
  return BLOG_POSTS.filter(post => post.categoria === categoria);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(BLOG_POSTS.map(post => post.categoria)));
}

