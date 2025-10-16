export interface Depoimento {
  id: string;
  nome: string;
  cargo: string;
  empresa: string;
  setor: string;
  foto: string;
  depoimento: string;
  resultados: {
    metrica: string;
    valor: string;
  }[];
  solucoes: string[];
}

export const DEPOIMENTOS: Depoimento[] = [
  {
    id: '1',
    nome: 'Roberto Almeida',
    cargo: 'Diretor de TI',
    empresa: 'AgriTech Solutions',
    setor: 'Agronegócio',
    foto: '/images/depoimentos/roberto.jpg',
    depoimento: 'A implementação do ERP TOTVS transformou completamente nossa operação. Conseguimos integrar todas as filiais e ter visibilidade em tempo real de estoque, vendas e finanças. O ROI foi alcançado em apenas 8 meses.',
    resultados: [
      { metrica: 'Redução de Custos', valor: '35%' },
      { metrica: 'Aumento de Produtividade', valor: '45%' },
      { metrica: 'Tempo de Fechamento', valor: '-60%' },
    ],
    solucoes: ['ERP', 'Analytics', 'Cloud'],
  },
  {
    id: '2',
    nome: 'Mariana Costa',
    cargo: 'CEO',
    empresa: 'Construtora Horizonte',
    setor: 'Construção Civil',
    foto: '/images/depoimentos/mariana.jpg',
    depoimento: 'O Fluig revolucionou nossa gestão de processos. Eliminamos 90% do papel da empresa e os processos de aprovação que levavam semanas agora são concluídos em horas. A equipe da OLV foi fundamental nessa jornada.',
    resultados: [
      { metrica: 'Redução de Tempo', valor: '70%' },
      { metrica: 'Economia de Papel', valor: '90%' },
      { metrica: 'Satisfação Interna', valor: '95%' },
    ],
    solucoes: ['Fluig', 'Assinatura Eletrônica'],
  },
  {
    id: '3',
    nome: 'Carlos Henrique',
    cargo: 'Gerente Comercial',
    empresa: 'Distribuidora Nacional',
    setor: 'Distribuição',
    foto: '/images/depoimentos/carlos-h.jpg',
    depoimento: 'Com o CRM e SFA da TOTVS, nossa equipe de vendas dobrou a produtividade. A integração com o ERP nos deu uma visão 360º do cliente e conseguimos aumentar o ticket médio em 40%. Recomendo fortemente!',
    resultados: [
      { metrica: 'Aumento de Vendas', valor: '+120%' },
      { metrica: 'Ticket Médio', valor: '+40%' },
      { metrica: 'Produtividade', valor: '+100%' },
    ],
    solucoes: ['CRM', 'SFA', 'ERP'],
  },
  {
    id: '4',
    nome: 'Ana Paula Silva',
    cargo: 'CFO',
    empresa: 'FinServ Brasil',
    setor: 'Financial Services',
    foto: '/images/depoimentos/ana-paula.jpg',
    depoimento: 'O TOTVS Techfin otimizou completamente nossa gestão financeira. A antecipação de recebíveis melhorou nosso fluxo de caixa e a conciliação bancária automática economiza 20 horas por mês da nossa equipe.',
    resultados: [
      { metrica: 'Melhoria de Fluxo de Caixa', valor: '50%' },
      { metrica: 'Economia de Tempo', valor: '80 horas/mês' },
      { metrica: 'Redução de Erros', valor: '98%' },
    ],
    solucoes: ['Techfin', 'Analytics', 'ERP'],
  },
  {
    id: '5',
    nome: 'Pedro Oliveira',
    cargo: 'Diretor de Operações',
    empresa: 'Indústria Moderna',
    setor: 'Manufatura',
    foto: '/images/depoimentos/pedro-o.jpg',
    depoimento: 'A migração para TOTVS Cloud foi a melhor decisão que tomamos. Temos 99.9% de disponibilidade, nossos sistemas estão sempre atualizados e conseguimos escalar recursos conforme a demanda. Segurança e performance impecáveis.',
    resultados: [
      { metrica: 'Disponibilidade', valor: '99.9%' },
      { metrica: 'Redução de Custos TI', valor: '45%' },
      { metrica: 'Uptime', valor: '100%' },
    ],
    solucoes: ['Cloud', 'ERP', 'IPAAS'],
  },
  {
    id: '6',
    nome: 'Juliana Ferreira',
    cargo: 'Gerente de RH',
    empresa: 'Tech Startup SP',
    setor: 'Prestadores de Serviços',
    foto: '/images/depoimentos/juliana-f.jpg',
    depoimento: 'O módulo de RH da TOTVS simplificou toda nossa gestão de pessoas. Desde recrutamento até folha de pagamento, tudo integrado. O onboarding digital reduziu o tempo de integração de novos colaboradores em 80%.',
    resultados: [
      { metrica: 'Redução Onboarding', valor: '80%' },
      { metrica: 'Satisfação RH', valor: '92%' },
      { metrica: 'Economia', valor: 'R$ 50k/ano' },
    ],
    solucoes: ['RH', 'Fluig'],
  },
];

export function getDepoimentosBySetor(setor: string): Depoimento[] {
  return DEPOIMENTOS.filter(d => d.setor === setor);
}

export function getDepoimentoBySolucao(solucao: string): Depoimento[] {
  return DEPOIMENTOS.filter(d => d.solucoes.includes(solucao));
}

