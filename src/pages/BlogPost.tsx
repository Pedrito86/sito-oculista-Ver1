import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, User, Clock, ArrowLeft, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';

export default function BlogPost() {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="pt-20">
      <Helmet>
        <title>{post.title} | Blog Dott.ssa Di Sanzo</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.mariadisanzo.com/blog/${post.slug}`} />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={`https://www.mariadisanzo.com${post.image}`} />
        <meta property="og:url" content={`https://www.mariadisanzo.com/blog/${post.slug}`} />
        <meta property="og:type" content="article" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px] w-full">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 max-w-4xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Torna al Blog
          </Link>
          <div className="flex items-center space-x-4 mb-4 text-white/90 text-sm md:text-base">
            <span className="bg-blue-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
              {post.category}
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {post.date}
            </span>
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {post.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between py-6 border-b border-gray-100 mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <p className="text-sm text-gray-500">Oculista Specialista</p>
            </div>
          </div>
          <button 
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Condividi articolo"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        <div 
          className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        >
        </div>

        {/* Author Bio Box */}
        <div className="mt-16 bg-blue-50 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="w-20 h-20 bg-blue-200 rounded-full flex-shrink-0 overflow-hidden">
            {/* Placeholder for author image if available, or icon */}
            <img src="/oculista-bologna-di-sanzo.jpg" alt="Dott.ssa Di Sanzo" className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Dott.ssa Maria Di Sanzo</h3>
            <p className="text-gray-600 mb-4">
              Medico Chirurgo specialista in Oftalmologia. Si occupa di prevenzione, diagnosi e cura delle patologie oculari presso l'AUSL di Bologna.
            </p>
            <Link 
              to="/prenotazione" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Prenota una visita
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}
