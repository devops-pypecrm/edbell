'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Tag,
  Share2,
  BookOpen,
  ThumbsUp,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  CheckCircle,
  Sparkles,
  Zap,
  Download
} from 'lucide-react';
import Newsletter from '@/components/Newsletter';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  readTime: string;
  featured: boolean;
  views: number;
  likes: number;
}

interface BlogArticleClientProps {
  post: BlogPost;
  blogPosts: BlogPost[];
}

export default function BlogArticleClient({ post, blogPosts }: BlogArticleClientProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [copied, setCopied] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLike = () => {
    if (!liked) {
      setLikes(prev => prev + 1);
      setLiked(true);
    }
  };

  const handleShare = async (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const title = post.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (err) {
          console.error('Failed to copy URL');
        }
        break;
    }
  };

  const relatedPosts = blogPosts
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.tags.some(tag => post.tags.includes(tag))))
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32 overflow-hidden px-6 lg:px-12">
        {/* Dynamic Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/about-professional.jpg"
            alt="Intelligence Background"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-transparent"></div>
          <div className="absolute inset-0 bg-white"></div>
        </div>

        {/* Global Glows */}
        <div className="hidden"></div>
        <div className="hidden"></div>

        <div className="relative z-10 max-w-5xl mx-auto w-full space-y-10">
          <Link href="/blog" className="inline-flex items-center space-x-3 text-base font-bold text-brand-700 hover:text-brand-700 transition-colors group">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-2 transition-transform" />
            <span>Back to Intelligence Hub</span>
          </Link>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <span className="bg-brand-50 border border-brand-200 text-brand-700 text-base font-semibold px-4 py-2 rounded-lg">{post.category}</span>
              {post.featured && <span className="text-base font-semibold text-amber-500 flex items-center"><Sparkles className="h-3 w-3 mr-2" /> Featured Logic</span>}
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-[1]">
              {post.title}
            </h1>

            <p className="text-xl lg:text-2xl text-black font-normal leading-relaxed max-w-4xl">
              {post.excerpt}
            </p>
          </div>

          <div className="pt-10 border-t border-gray-200 flex flex-wrap items-center gap-10">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-brand-700 rounded-[10px] flex items-center justify-center text-white font-bold text-xl">
                {post.author[0]}
              </div>
              <div>
                <p className="text-base font-semibold text-black mb-1">Architecture Lead</p>
                <p className="text-lg font-bold text-gray-900">{post.author}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-base font-semibold text-black mb-1">Compute Time</span>
                <span className="text-base font-semibold text-black flex items-center"><Clock className="h-3 w-3 mr-2" /> {post.readTime}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-black mb-1">Traffic Node</span>
                <span className="text-base font-semibold text-black flex items-center"><BookOpen className="h-3 w-3 mr-2" /> {post.views} Views</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Architecture Node */}
      <section className="py-16 lg:py-24 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            {/* Primary Data Stream */}
            <div className="lg:col-span-8">
              <article className="bg-white border border-gray-200 rounded-lg p-8 lg:p-16 relative overflow-hidden">
                {/* Article Content with Premium Prose */}
                <div
                  className="prose prose-invert prose-xl max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-500 prose-p:font-normal prose-p:leading-relaxed prose-strong:text-brand-700 prose-strong:font-bold prose-li:text-gray-500 prose-h2:text-4xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-6 prose-h2:mt-16 prose-h3:text-2xl prose-h3:text-blue-300"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Metadata Tags */}
                <div className="mt-20 pt-12 border-t border-gray-200">
                  <div className="flex items-center space-x-3 text-sm font-bold text-brand-700 mb-6">
                    <Tag className="h-4 w-4" />
                    <span>Metadata Alignment</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {post.tags.map((t, i) => (
                      <span key={i} className="px-5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-base font-semibold text-black hover:text-brand-700 hover:border-brand-200 transition-all cursor-default">
                        #{t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Engagement Matrix */}
                <div className="mt-12 pt-12 border-t border-gray-200 flex flex-wrap items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-4 px-8 py-4 rounded-lg font-bold text-base transition-all ${liked
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-50 border border-gray-200 text-black hover:bg-gray-50 hover:text-white'
                        }`}
                    >
                      <ThumbsUp className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                      <span>{likes} Nodes</span>
                    </button>
                    <div className="flex items-center space-x-3 text-sm font-bold text-slate-600">
                      <MessageCircle className="h-4 w-4" />
                      <span>Signal Shared</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button onClick={() => handleShare('facebook')} className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-[10px] flex items-center justify-center text-black hover:bg-brand-700 hover:text-white transition-all"><Facebook className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('twitter')} className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-[10px] flex items-center justify-center text-black hover:bg-brand-700 hover:text-white transition-all"><Twitter className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('linkedin')} className="w-12 h-12 bg-gray-50 border border-gray-200 rounded-[10px] flex items-center justify-center text-black hover:bg-brand-700 hover:text-white transition-all"><Linkedin className="h-5 w-5" /></button>
                    <button onClick={() => handleShare('copy')} className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${copied ? 'bg-emerald-500 text-white' : 'bg-gray-50 border border-gray-200 text-black hover:bg-gray-50'}`}>
                      {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </article>

              {/* Related Intelligence Nodes */}
              {relatedPosts.length > 0 && (
                <div className="mt-24 space-y-12">
                  <div className="flex items-center space-x-4">
                    <Zap className="h-6 w-6 text-brand-700" />
                    <h3 className="text-3xl font-bold text-brand-900">Synchronized Intelligence</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {relatedPosts.map((p) => (
                      <Link key={p.id} href={`/blog/${p.slug}`} className="sk-card group relative p-8 transition-all">
                        <span className="text-base font-semibold text-brand-700 block mb-4">{p.category}</span>
                        <h4 className="text-xl font-bold text-brand-900 group-hover:text-brand-700 transition-colors mb-4">{p.title}</h4>
                        <ArrowRight className="h-5 w-5 text-slate-700 group-hover:translate-x-2 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Interface Nodes */}
            <div className="lg:col-span-4 space-y-10">
              <div className="sk-card p-8 lg:p-10 space-y-8">
                <h4 className="text-sm font-bold text-brand-700">Intelligence Lead</h4>
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-brand-700 rounded-[10px] flex items-center justify-center mx-auto text-white font-bold text-4xl">
                    {post.author[0]}
                  </div>
                  <div>
                    <h5 className="text-xl font-bold text-gray-900">{post.author}</h5>
                    <p className="text-base font-semibold text-black mt-2">{post.category} SPECIALIST</p>
                  </div>
                  <Link href="/contact" className="block w-full py-4 bg-gray-50 border border-gray-200 rounded-lg text-base font-bold text-gray-900 hover:bg-white hover:text-black transition-all">
                    Request Briefing
                  </Link>
                </div>
              </div>

              <Newsletter variant="sidebar" />

              <div className="sk-card p-8 lg:p-10 space-y-8">
                <h4 className="text-sm font-bold text-brand-700">High Frequency Data</h4>
                <div className="space-y-6">
                  {blogPosts.slice(0, 3).map((p) => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="block group">
                      <p className="text-base font-semibold text-black group-hover:text-brand-700 transition-colors leading-snug">{p.title}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-base font-semibold text-slate-600">{p.views} REACH</span>
                        <ArrowRight className="h-3 w-3 text-slate-700 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Newsletter Node */}
      <section className="py-20 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>
    </div>
  );
}