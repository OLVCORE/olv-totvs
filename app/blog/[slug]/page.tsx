import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Tag, Share2, ExternalLink } from 'lucide-react';
import { getBlogPostBySlug, BLOG_POSTS } from '@/lib/data/blog-posts';
import { AnimatedSection, AnimatedHero } from '@/components/shared/AnimatedSection';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }

  return {
    title: `${post.titulo} | Blog OLV Internacional`,
    description: post.resumo,
    keywords: post.tags.join(', '),
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Posts relacionados (mesma categoria)
  const postsRelacionados = BLOG_POSTS
    .filter(p => p.categoria === post.categoria && p.id !== post.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 md:pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent" />
        
        <div className="container-custom relative z-10">
          <AnimatedHero>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-8 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Voltar ao Blog
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-semibold">
                {post.categoria}
              </span>
              {post.destaque && (
                <span className="px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full text-yellow-300 text-sm font-semibold">
                  ⭐ DESTAQUE
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                {post.titulo}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl">
              {post.subtitulo}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(post.data_publicacao).toLocaleDateString('pt-BR', { 
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{post.tempo_leitura} de leitura</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.autor.nome} · {post.autor.cargo}</span>
              </div>
            </div>
          </AnimatedHero>
        </div>
      </section>

      {/* Conteúdo do Post */}
      <section className="py-16 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="sticky top-32 space-y-8">
                  {/* Autor */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">Sobre o Autor</h3>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-bold text-white">{post.autor.nome}</div>
                        <div className="text-sm text-slate-400">{post.autor.cargo}</div>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 text-sm hover:bg-slate-600/50 transition-colors"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Compartilhar */}
                  <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/50">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Compartilhar
                    </h3>
                    <div className="flex flex-col gap-3">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-semibold">
                        LinkedIn
                      </button>
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm font-semibold">
                        Twitter
                      </button>
                      <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-semibold">
                        WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Conteúdo Principal */}
            <div className="lg:col-span-9">
              <AnimatedSection>
                <div className="bg-slate-800/30 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-slate-700/30">
                  {/* Resumo */}
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 rounded-r-xl p-6 mb-12">
                    <p className="text-lg text-slate-200 leading-relaxed italic">
                      {post.resumo}
                    </p>
                  </div>

                  {/* Conteúdo HTML */}
                  <div
                    className="prose prose-invert prose-lg max-w-none
                      prose-headings:font-black prose-headings:text-white prose-headings:mb-4
                      prose-h2:text-3xl prose-h2:mt-12 prose-h2:bg-gradient-to-r prose-h2:from-cyan-300 prose-h2:to-blue-300 prose-h2:bg-clip-text prose-h2:text-transparent
                      prose-h3:text-2xl prose-h3:mt-8
                      prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
                      prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
                      prose-strong:text-white prose-strong:font-bold
                      prose-ul:text-slate-300 prose-ul:list-disc prose-ul:ml-6
                      prose-li:mb-2
                      prose-code:text-cyan-300 prose-code:bg-slate-900 prose-code:px-2 prose-code:py-1 prose-code:rounded"
                    dangerouslySetInnerHTML={{ __html: post.conteudo }}
                  />

                  {/* Fonte Original */}
                  {post.fonte && (
                    <div className="mt-12 pt-8 border-t border-slate-700/50">
                      <div className="flex items-center gap-3 mb-4">
                        <ExternalLink className="w-5 h-5 text-cyan-400" />
                        <h4 className="text-lg font-bold text-white">Fonte Original</h4>
                      </div>
                      <a
                        href={post.fonte.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 text-cyan-300 hover:text-cyan-200 rounded-lg transition-all duration-300 border border-cyan-500/30 hover:border-cyan-500/50"
                      >
                        <span className="font-semibold">{post.fonte.nome}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* CTA no Final do Post */}
              <AnimatedSection delay={0.2}>
                <div className="mt-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-xl rounded-2xl p-8 border border-cyan-500/20">
                  <h3 className="text-2xl font-black text-white mb-4">
                    Gostou deste conteúdo?
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Agende uma consultoria gratuita e descubra como nossas soluções podem transformar seu negócio
                  </p>
                  <Link
                    href="/diagnostico"
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl shadow-glow hover:shadow-futuristic transition-all duration-300 hover:scale-105"
                  >
                    AGENDAR CONSULTORIA GRATUITA
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Posts Relacionados */}
      {postsRelacionados.length > 0 && (
        <section className="py-16 relative">
          <div className="container-custom">
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-12">
                Artigos Relacionados
              </h2>
            </AnimatedSection>

            <div className="grid md:grid-cols-3 gap-8">
              {postsRelacionados.map((relatedPost, index) => (
                <AnimatedSection key={relatedPost.id} delay={index * 0.1}>
                  <Link href={`/blog/${relatedPost.slug}`}>
                    <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-premium h-full">
                      <div className="relative h-48 bg-gradient-to-br from-cyan-500/20 to-blue-500/20">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-xs font-semibold">
                            {relatedPost.categoria}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 hover:text-cyan-300 transition-colors">
                          {relatedPost.titulo}
                        </h3>

                        <p className="text-slate-300 text-sm line-clamp-2 mb-4">
                          {relatedPost.resumo}
                        </p>

                        <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                          Ler artigo
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

