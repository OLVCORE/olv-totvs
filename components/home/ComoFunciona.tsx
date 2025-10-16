'use client';

import { CheckCircle, Search, Users, Rocket, BarChart } from 'lucide-react';
import { motion } from 'framer-motion';

const ComoFunciona = () => {
  const etapas = [
    {
      numero: '01',
      titulo: 'Diagnóstico Inicial',
      descricao:
        'Realizamos um diagnóstico completo da sua operação, identificando necessidades, desafios e oportunidades de melhoria.',
      icon: Search,
      cor: 'from-cyan-500 to-blue-600',
      bgGlow: 'from-cyan-400/20 to-blue-400/20',
    },
    {
      numero: '02',
      titulo: 'Mapeamento de Soluções',
      descricao:
        'Desenvolvemos uma proposta personalizada com as soluções TOTVS mais adequadas para o seu negócio e setor.',
      icon: BarChart,
      cor: 'from-purple-500 to-indigo-600',
      bgGlow: 'from-purple-400/20 to-indigo-400/20',
    },
    {
      numero: '03',
      titulo: 'Implementação Guiada',
      descricao:
        'Nossa equipe acompanha toda a implementação, garantindo integração perfeita e capacitação do seu time.',
      icon: Users,
      cor: 'from-emerald-500 to-teal-600',
      bgGlow: 'from-emerald-400/20 to-teal-400/20',
    },
    {
      numero: '04',
      titulo: 'Go-Live & Suporte',
      descricao:
        'Após o go-live, oferecemos suporte contínuo e acompanhamento para garantir resultados e evolução constante.',
      icon: Rocket,
      cor: 'from-orange-500 to-rose-600',
      bgGlow: 'from-orange-400/20 to-rose-400/20',
    },
  ];

  return (
    <section id="como-funciona" className="section relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 overflow-hidden">
      {/* Futuristic Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-pattern-grid" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container-custom relative z-10">
        {/* Premium Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 backdrop-blur-sm border border-emerald-400/30 text-emerald-300 px-6 py-3 rounded-full text-sm font-bold mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="tracking-wide">METODOLOGIA COMPROVADA</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            <span className="block">Como</span>
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Funciona
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Nossa metodologia comprovada para transformação digital de sucesso
          </p>
        </motion.div>

        {/* Premium Timeline */}
        <div className="relative mb-20">
          {/* Futuristic Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1">
            <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 via-emerald-500 to-orange-500 opacity-30 rounded-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 via-emerald-400 to-orange-400 opacity-20 blur-xl" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {etapas.map((etapa, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="relative group"
              >
                {/* Premium Card */}
                <div className="card-premium hover:shadow-futuristic transition-all duration-300 relative overflow-hidden h-full">
                  {/* Premium Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${etapa.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Premium Number Badge */}
                  <div className="absolute -top-4 -right-4 z-10">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${etapa.cor} flex items-center justify-center text-white font-black shadow-glow text-xl`}
                    >
                      {etapa.numero}
                    </motion.div>
                  </div>

                  {/* Premium Icon */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${etapa.cor} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-glow`}>
                      <etapa.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className={`absolute -inset-2 bg-gradient-to-r ${etapa.bgGlow} rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`} />
                  </div>

                  {/* Premium Content */}
                  <h3 className="text-2xl font-black text-white mb-4 tracking-wide">
                    {etapa.titulo}
                  </h3>
                  <p className="text-slate-300 text-base leading-relaxed mb-6">
                    {etapa.descricao}
                  </p>

                  {/* Premium Validation Badge */}
                  <div className="flex items-center gap-3 text-emerald-300 font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-5 h-5" />
                    <span className="tracking-wide">PROCESSO VALIDADO</span>
                  </div>

                  {/* Premium Hover Border */}
                  <div className={`absolute inset-0 border-2 bg-gradient-to-r ${etapa.cor} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-300`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Premium Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card-premium relative overflow-hidden"
        >
          {/* Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5" />
          
          <div className="grid md:grid-cols-3 gap-12 text-center relative z-10">
            <div className="group">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-3"
              >
                3-6 meses
              </motion.div>
              <div className="text-slate-300 font-bold text-lg tracking-wide">
                Prazo médio de implementação
              </div>
            </div>
            <div className="group">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3"
              >
                95%
              </motion.div>
              <div className="text-slate-300 font-bold text-lg tracking-wide">
                Taxa de sucesso em projetos
              </div>
            </div>
            <div className="group">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3"
              >
                24/7
              </motion.div>
              <div className="text-slate-300 font-bold text-lg tracking-wide">
                Suporte contínuo disponível
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComoFunciona;
