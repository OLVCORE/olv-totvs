'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, Linkedin, Instagram, Facebook, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContatoPage() {
  return (
    <>
      {/* Premium Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-pattern-grid" />
        </div>

        {/* Animated Gradient Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 text-purple-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
              <Mail className="w-5 h-5" />
              <span className="tracking-wide">ENTRE EM CONTATO</span>
            </div>

            <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-tight">
              <span className="block">Vamos Transformar</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
                Seu Negócio Juntos
              </span>
            </h1>
            <p className="text-2xl text-slate-200 leading-relaxed font-medium">
              Nossa equipe está pronta para atendê-lo e ajudar na transformação
              digital da sua empresa
            </p>
          </motion.div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
        {/* Futuristic Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-pattern-dots" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Premium Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-12 tracking-wide">
                INFORMAÇÕES DE CONTATO
              </h2>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'EMAIL',
                    value: 'consultores@olvinternacional.com.br',
                    href: 'mailto:consultores@olvinternacional.com.br',
                    subtitle: 'Resposta em até 24 horas',
                    gradient: 'from-cyan-500 to-blue-600',
                  },
                  {
                    icon: Phone,
                    title: 'TELEFONE FIXO',
                    value: '+55 (11) 2675-1446',
                    href: 'tel:+551126751446',
                    subtitle: 'Horário comercial',
                    gradient: 'from-purple-500 to-pink-600',
                  },
                  {
                    icon: Phone,
                    title: 'WHATSAPP',
                    value: '+55 (11) 96846-2655',
                    href: 'https://wa.me/5511968462655',
                    subtitle: 'Atendimento prioritário',
                    gradient: 'from-green-500 to-emerald-600',
                  },
                  {
                    icon: MapPin,
                    title: 'ENDEREÇO',
                    value: 'Av. Paulista, 1471 - Conj 1110',
                    href: 'https://maps.google.com/?q=Avenida+Paulista+1471+São+Paulo',
                    subtitle: 'Bela Vista - São Paulo/SP - CEP 01311-927',
                    gradient: 'from-orange-500 to-rose-600',
                  },
                  {
                    icon: Clock,
                    title: 'HORÁRIO DE ATENDIMENTO',
                    value: 'Segunda a Sexta - 8h às 18h',
                    href: null,
                    subtitle: 'Sábado: 8h às 12h',
                    gradient: 'from-orange-500 to-rose-600',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ x: 10, scale: 1.02 }}
                  >
                    <div className="card-premium hover:shadow-glow transition-all duration-300 relative overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 hover:opacity-10 transition-opacity duration-300`} />
                      
                      <div className="flex gap-4 relative z-10">
                        <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${item.gradient} rounded-2xl flex items-center justify-center shadow-glow`}>
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-bold text-slate-400 mb-2 tracking-wider">
                            {item.title}
                          </div>
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-white hover:text-cyan-300 font-bold text-lg transition-colors"
                            >
                              {item.value}
                            </a>
                          ) : (
                            <div className="text-white font-bold text-lg">
                              {item.value}
                            </div>
                          )}
                          <p className="text-sm text-slate-400 mt-1 font-medium">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Premium Social Media */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12"
              >
                <div className="card-premium">
                  <h3 className="font-black text-white mb-6 text-xl tracking-wide">
                    SIGA-NOS NAS REDES SOCIAIS
                  </h3>
                  <div className="flex gap-4">
                    {[
                      { icon: Linkedin, href: 'https://linkedin.com', gradient: 'from-cyan-500 to-blue-600' },
                      { icon: Instagram, href: 'https://instagram.com', gradient: 'from-purple-500 to-pink-600' },
                      { icon: Facebook, href: 'https://facebook.com', gradient: 'from-blue-500 to-indigo-600' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, y: -5 }}
                        className={`w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-2xl flex items-center justify-center shadow-glow hover:shadow-futuristic transition-all`}
                      >
                        <social.icon className="w-7 h-7 text-white" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Premium Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="card-premium relative overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-rose-500/10" />
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-white mb-6 tracking-wide">
                    ENTRE EM CONTATO
                  </h3>
                  <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                    Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
                  </p>

                  <form className="space-y-6" action="https://formspree.io/f/xpwnqjqr" method="POST">
                    {/* Dados Pessoais */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Nome Completo *
                        </label>
                        <input
                          type="text"
                          name="nome"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="Seu nome completo"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          E-mail *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          name="telefone"
                          required
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Empresa
                        </label>
                        <input
                          type="text"
                          name="empresa"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="Nome da sua empresa"
                        />
                      </div>
                    </div>

                    {/* Dropdowns */}
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Solução de Interesse
                        </label>
                        <select
                          name="solucao"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          <option value="">Selecione uma solução</option>
                          <option value="ERP">ERP</option>
                          <option value="Fluig">Fluig</option>
                          <option value="iPaaS">iPaaS</option>
                          <option value="CRM de Vendas">CRM de Vendas</option>
                          <option value="Techfin">Techfin</option>
                          <option value="Analytics">Analytics</option>
                          <option value="Assinatura Eletrônica">Assinatura Eletrônica</option>
                          <option value="Cloud">Cloud</option>
                          <option value="RH">RH</option>
                          <option value="Atendimento e Chatbot">Atendimento e Chatbot</option>
                          <option value="Crédito">Crédito</option>
                          <option value="Inteligência Artificial">Inteligência Artificial</option>
                          <option value="Marketing Digital">Marketing Digital</option>
                          <option value="Pagamentos">Pagamentos</option>
                          <option value="SFA">SFA</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Setor de Atuação
                        </label>
                        <select
                          name="setor"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          <option value="">Selecione um setor</option>
                          <option value="Agro">Agro</option>
                          <option value="Construção">Construção</option>
                          <option value="Distribuição">Distribuição</option>
                          <option value="Serviços Financeiros">Serviços Financeiros</option>
                          <option value="Logística">Logística</option>
                          <option value="Manufatura">Manufatura</option>
                          <option value="Prestadores de Serviços">Prestadores de Serviços</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-300 mb-2">
                          Tipo de Consultoria
                        </label>
                        <select
                          name="consultoria"
                          className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        >
                          <option value="">Selecione o tipo</option>
                          <option value="Diagnóstico Estratégico">Diagnóstico Estratégico</option>
                          <option value="Planejamento Inteligente">Planejamento Inteligente</option>
                          <option value="Implementação Ágil">Implementação Ágil</option>
                          <option value="Otimização Contínua">Otimização Contínua</option>
                          <option value="Consultoria Completa">Consultoria Completa</option>
                        </select>
                      </div>
                    </div>

                    {/* Mensagem */}
                    <div>
                      <label className="block text-sm font-bold text-slate-300 mb-2">
                        Mensagem *
                      </label>
                      <textarea
                        name="mensagem"
                        required
                        rows={5}
                        className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                        placeholder="Conte-nos sobre seu projeto, desafios ou necessidades..."
                      />
                    </div>

                    {/* Botão de Envio */}
                    <div className="pt-4">
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-glow hover:shadow-futuristic transition-all hover:scale-105"
                      >
                        ENVIAR MENSAGEM
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
