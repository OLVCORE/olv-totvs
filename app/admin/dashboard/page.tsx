'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  Send,
  XCircle,
  Search,
  Filter,
  LogOut,
  Menu,
  X as CloseIcon,
} from 'lucide-react';
import { Lead, DashboardStats } from '@/types';
import { formatDate, formatPhone } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterSetor, setFilterSetor] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    checkAuth();
    loadLeads();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) {
        router.push('/admin/login');
        return;
      }

      const response = await fetch('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Não autenticado');
      }

      const data = await response.json();
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      router.push('/admin/login');
    }
  };

  const loadLeads = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      const response = await fetch('/api/leads', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao carregar leads');
      }

      const data = await response.json();
      setLeads(data.leads);
      calculateStats(data.leads);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = (leadsData: Lead[]) => {
    const stats: DashboardStats = {
      total_leads: leadsData.length,
      leads_novos: leadsData.filter((l) => l.status === 'novo').length,
      leads_qualificados: leadsData.filter((l) => l.status === 'qualificado')
        .length,
      leads_enviados: leadsData.filter((l) => l.status === 'enviado_totvs')
        .length,
      taxa_conversao: 0,
      setores_top: [],
      modulos_top: [],
      leads_por_mes: [],
    };
    setStats(stats);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    router.push('/admin/login');
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string }> = {
      novo: { color: 'badge-primary', label: 'Novo' },
      em_analise: { color: 'badge-warning', label: 'Em Análise' },
      qualificado: { color: 'badge-success', label: 'Qualificado' },
      enviado_totvs: { color: 'badge bg-purple-100 text-purple-700', label: 'Enviado TOTVS' },
      descartado: { color: 'badge-danger', label: 'Descartado' },
    };
    const badge = badges[status] || badges.novo;
    return <span className={`badge ${badge.color}`}>{badge.label}</span>;
  };

  const filteredLeads = leads.filter((lead) => {
    const matchSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contato.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchStatus = !filterStatus || lead.status === filterStatus;
    const matchSetor = !filterSetor || lead.setor === filterSetor;

    return matchSearch && matchStatus && matchSetor;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="spinner w-12 h-12 border-4" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-2 hover:bg-neutral-100 rounded-lg"
            >
              {isSidebarOpen ? (
                <CloseIcon className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">OLV</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-neutral-900">
                  Painel Administrativo
                </h1>
                <p className="text-xs text-neutral-500">OLV + TOTVS</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <p className="text-sm font-medium text-neutral-900">{user?.nome}</p>
              <p className="text-xs text-neutral-500">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="btn btn-ghost text-sm"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar (se necessário no futuro) */}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">
                  {stats.total_leads}
                </div>
                <div className="text-sm text-neutral-600">Total de Leads</div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">
                  {stats.leads_novos}
                </div>
                <div className="text-sm text-neutral-600">Leads Novos</div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">
                  {stats.leads_qualificados}
                </div>
                <div className="text-sm text-neutral-600">Qualificados</div>
              </div>

              <div className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Send className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-neutral-900 mb-1">
                  {stats.leads_enviados}
                </div>
                <div className="text-sm text-neutral-600">Enviados TOTVS</div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="card p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar por nome, empresa ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-12 w-full"
                />
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="input w-full md:w-48"
              >
                <option value="">Todos os Status</option>
                <option value="novo">Novo</option>
                <option value="em_analise">Em Análise</option>
                <option value="qualificado">Qualificado</option>
                <option value="enviado_totvs">Enviado TOTVS</option>
                <option value="descartado">Descartado</option>
              </select>

              <select
                value={filterSetor}
                onChange={(e) => setFilterSetor(e.target.value)}
                className="input w-full md:w-48"
              >
                <option value="">Todos os Setores</option>
                <option value="Agro">Agro</option>
                <option value="Construção">Construção</option>
                <option value="Distribuição">Distribuição</option>
                <option value="Financial Services">Financial Services</option>
                <option value="Logística">Logística</option>
                <option value="Manufatura">Manufatura</option>
                <option value="Prestadores de Serviços">Prestadores de Serviços</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Empresa / Setor
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Contato
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <p className="text-neutral-500">Nenhum lead encontrado</p>
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr
                        key={lead._id as string}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-medium text-neutral-900">
                            {lead.nome}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {lead.modulos_interesse.slice(0, 2).join(', ')}
                            {lead.modulos_interesse.length > 2 &&
                              ` +${lead.modulos_interesse.length - 2}`}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-neutral-900">
                            {lead.empresa}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {lead.setor} • {lead.porte}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-neutral-900">
                            {lead.contato.email}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {formatPhone(lead.contato.telefone)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(lead.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-neutral-600">
                          {lead.createdAt && formatDate(lead.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

