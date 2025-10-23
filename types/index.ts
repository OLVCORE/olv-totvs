// ==========================================
// TYPES - Sistema OLV + TOTVS
// ==========================================

export interface Lead {
  _id?: string;
  nome: string;
  empresa: string;
  setor: Setor;
  porte: Porte;
  modulos_interesse: Modulo[];
  dores: string[];
  contato: {
    email: string;
    telefone: string;
  };
  status: LeadStatus;
  historico: HistoricoAcao[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type Setor = 
  | 'Agro'
  | 'Construção'
  | 'Distribuição'
  | 'Financial Services'
  | 'Logística'
  | 'Manufatura'
  | 'Prestadores de Serviços'
  | 'Varejo'
  | 'Outro';

export type Porte = 
  | 'Micro (1-10 funcionários)'
  | 'Pequeno (11-50 funcionários)'
  | 'Médio (51-250 funcionários)'
  | 'Grande (251-1000 funcionários)'
  | 'Enterprise (1000+ funcionários)';

export type Modulo = 
  | 'Sistema de Gestão (ERP)'
  | 'Fluig'
  | 'iPaaS'
  | 'CRM / Automação'
  | 'Techfin'
  | 'Analytics'
  | 'Assinatura Eletrônica'
  | 'Cloud'
  | 'RH';

export type LeadStatus = 
  | 'novo'
  | 'em_analise'
  | 'qualificado'
  | 'enviado_totvs'
  | 'descartado';

export interface HistoricoAcao {
  data: Date;
  acao: string;
  usuario?: string;
  detalhes?: string;
}

export interface User {
  _id?: string;
  email: string;
  nome: string;
  password: string; // hashed
  role: UserRole;
  ativo: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserRole = 
  | 'super_admin'
  | 'admin'
  | 'sales'
  | 'marketing';

export interface DiagnosticoFormData {
  step1?: {
    setor: Setor;
  };
  step2?: {
    porte: Porte;
  };
  step3?: {
    modulos: Modulo[];
  };
  step4?: {
    dores: string[];
  };
  step5?: {
    nome: string;
    empresa: string;
    email: string;
    telefone: string;
  };
}

export interface SolucaoTOTVS {
  id: string;
  nome: string;
  slug: string;
  titulo: string;
  subtitulo: string;
  descricao: string;
  funcionalidades: string[];
  beneficios: string[];
  casos_uso: string[];
  icone: string;
  cor: string;
  imagem_hero: string;
  ordem: number;
}

export interface SetorVertical {
  id: string;
  nome: Setor;
  slug: string;
  titulo: string;
  descricao: string;
  desafios: string[];
  solucoes_aplicaveis: string[];
  cases: CaseDeSuccesso[];
  imagem_hero: string;
}

export interface CaseDeSuccesso {
  id: string;
  titulo: string;
  empresa: string;
  setor: Setor;
  desafio: string;
  solucao: string;
  resultados: string[];
  depoimento?: string;
  autor_depoimento?: string;
  cargo_autor?: string;
  imagem?: string;
}

export interface BlogPost {
  _id?: string;
  titulo: string;
  slug: string;
  resumo: string;
  conteudo: string;
  imagem_destaque: string;
  categorias: string[];
  autor: string;
  seo_title: string;
  seo_description: string;
  data_publicacao: Date;
  publicado: boolean;
  visualizacoes?: number;
}

export interface IntegracaoTOTVS {
  _id?: string;
  lead_id: string;
  payload: any;
  status: 'pendente' | 'enviado' | 'sucesso' | 'erro';
  resposta?: any;
  erro?: string;
  tentativas: number;
  data_envio?: Date;
  createdAt?: Date;
}

export interface DashboardStats {
  total_leads: number;
  leads_novos: number;
  leads_qualificados: number;
  leads_enviados: number;
  taxa_conversao: number;
  setores_top: { setor: string; count: number }[];
  modulos_top: { modulo: string; count: number }[];
  leads_por_mes: { mes: string; count: number }[];
}

