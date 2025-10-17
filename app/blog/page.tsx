'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowRight, Search, Filter, ExternalLink } from 'lucide-react';
import { BLOG_POSTS, getAllCategories } from '@/lib/data/blog-posts';

export default function BlogPage() {
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');
  const [busca, setBusca] = useState('');

  const categorias = ['Todas', ...getAllCategories()];

  const postsFiltrados = BLOG_POSTS.filter(post => {
    const matchCategoria = categoriaFiltro === 'Todas' || post.categoria === categoriaFiltro;
    const matchBusca = busca === '' || 
      post.titulo.toLowerCase().includes(busca.toLowerCase()) ||
      post.resumo.toLowerCase().includes(busca.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(busca.toLowerCase()));
    return matchCategoria && matchBusca;
  });

  const postsDestaque = BLOG_POSTS.filter(post => post.destaque);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Premium - Responsivo */}
      <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Animated Orbs - Responsivo */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 180, 270, 360],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 30, repeat: Infinity }}
          className="absolute top-10 left-5 sm:top-20 sm:left-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 270, 180, 90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />

        <div className="container-custom relative z-10 px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 sm:px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full mb-4 sm:mb-6"
            >
              <span className="text-cyan-300 font-semibold tracking-wider text-xs sm:text-sm">
                INSIGHTS & TENDÊNCIAS
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Blog OLV Internacional
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 sm:mb-12 leading-relaxed">
              Conhecimento, inovação e tecnologia para transformar seu negócio
            </p>

            {/* Search Bar - Responsivo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="absolute inset-y-0 left-0 pl-4 sm:pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Buscar artigos, tags ou temas..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-5 bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-sm sm:text-lg"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Barra de Filtros - Clean e Funcional - Responsivo */}
      <section className="relative z-10 -mt-4 sm:-mt-8 mb-12 sm:mb-16">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide"
          >
            <div className="flex items-center gap-1 sm:gap-2 text-slate-400 whitespace-nowrap">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base">Filtrar:</span>
            </div>
            {categorias.map((categoria) => (
              <button
                key={categoria}
                onClick={() => setCategoriaFiltro(categoria)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold whitespace-nowrap transition-all duration-300 text-xs sm:text-sm ${
                  categoriaFiltro === categoria
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-glow'
                    : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                }`}
              >
                {categoria}
                {categoria !== 'Todas' && (
                  <span className="ml-1 sm:ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-slate-600/50 rounded-full text-xs">
                    {BLOG_POSTS.filter(post => post.categoria === categoria).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Posts em Destaque - Responsivo */}
      {categoriaFiltro === 'Todas' && busca === '' && (
        <section className="py-12 sm:py-16 relative">
          <div className="container-custom px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 sm:mb-12"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
                Em Destaque
              </h2>
              <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {postsDestaque.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative bg-slate-800/50 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-premium">
                      {/* Badge Destaque - Responsivo */}
                      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full">
                        <span className="text-white font-bold text-xs tracking-wider">DESTAQUE</span>
                      </div>

                      {/* Imagem - Responsivo */}
                      <div className="relative h-48 sm:h-56 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      </div>

                      {/* Conteúdo - Responsivo */}
                      <div className="p-4 sm:p-6">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                          <span className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold">
                            {post.categoria}
                          </span>
                          <div className="flex items-center gap-1 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            {new Date(post.data_publicacao).toLocaleDateString('pt-BR')}
                          </div>
                        </div>

                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2">
                          {post.titulo}
                        </h3>

                        <p className="text-slate-300 mb-3 sm:mb-4 line-clamp-3 text-sm sm:text-base">
                          {post.resumo}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                            {post.tempo_leitura}
                          </div>

                          <div className="flex items-center gap-1 sm:gap-2 text-cyan-300 font-semibold group-hover:gap-2 sm:group-hover:gap-4 transition-all duration-300 text-xs sm:text-sm">
                            Ler artigo
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </div>

                        {/* Botão da Fonte Original - Responsivo */}
                        {post.fonte && (
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-slate-700/50">
                            <a
                              href={post.fonte.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-colors duration-300"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                              Fonte: {post.fonte.nome}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Todos os Posts - Responsivo */}
      <section className="py-12 sm:py-16 relative">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 sm:mb-4">
              {busca ? `Resultados para "${busca}"` : categoriaFiltro === 'Todas' ? 'Todos os Artigos' : categoriaFiltro}
            </h2>
            <div className="h-1 w-24 sm:w-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full" />
            <p className="text-slate-400 mt-3 sm:mt-4 text-sm sm:text-base">
              {postsFiltrados.length} {postsFiltrados.length === 1 ? 'artigo encontrado' : 'artigos encontrados'}
            </p>
          </motion.div>

          {postsFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {postsFiltrados.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative bg-slate-800/30 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/30 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-premium p-4 sm:p-6">
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                            <span className="px-2 sm:px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded-full text-slate-300 text-xs font-semibold">
                              {post.categoria}
                            </span>
                            <div className="flex items-center gap-1 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              {new Date(post.data_publicacao).toLocaleDateString('pt-BR')}
                            </div>
                          </div>

                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                            {post.titulo}
                          </h3>

                          <p className="text-slate-300 mb-3 sm:mb-4 line-clamp-2 text-sm sm:text-base">
                            {post.resumo}
                          </p>

                          <div className="flex items-center justify-between mb-3 sm:mb-4">
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                              {post.tags.slice(0, 3).map((tag) => (
                                <span key={tag} className="inline-flex items-center gap-1 text-slate-400 text-xs">
                                  <Tag className="w-2 h-2 sm:w-3 sm:h-3" />
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2 text-slate-400 text-xs sm:text-sm">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                              {post.tempo_leitura}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 sm:gap-2 text-cyan-300 font-semibold group-hover:gap-2 sm:group-hover:gap-4 transition-all duration-300 text-xs sm:text-sm">
                          Continuar lendo
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        {/* Botão da Fonte Original - Responsivo */}
                        {post.fonte && (
                          <a
                            href={post.fonte.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 sm:gap-2 text-xs text-slate-500 hover:text-amber-400 transition-colors duration-300"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {post.fonte.nome}
                          </a>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 sm:py-20"
            >
              <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Nenhum artigo encontrado</h3>
              <p className="text-slate-400 text-sm sm:text-base">Tente ajustar seus filtros ou busca</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Final - Responsivo */}
      <section className="py-16 sm:py-20 relative">
        <div className="container-custom px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-8 sm:p-12 border border-cyan-500/20 text-center overflow-hidden"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"
            />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 relative z-10">
              Quer saber mais sobre nossas soluções?
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto relative z-10">
              Agende uma consultoria gratuita e descubra como a TOTVS pode transformar seu negócio
            </p>

            <Link
              href="/diagnostico"
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105 relative z-10 text-sm sm:text-base"
            >
              AGENDAR CONSULTORIA GRATUITA
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

