import { Calendar, User, ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BLOG_POSTS } from '../data/blogPosts';

export default function Blog() {
  return (
    <div className="pt-20">
      <Helmet>
        <title>Blog Oculistica | Consigli e News – Dott.ssa Di Sanzo</title>
        <meta 
          name="description" 
          content="Articoli su salute occhi, prevenzione e patologie. Consigli della Dott.ssa Maria Di Sanzo, oculista a Bologna." 
        />
        <link rel="canonical" href="https://www.mariadisanzo.com/blog" />
        {/* Open Graph Tags */}
        <meta property="og:title" content="Blog Oculistica | Consigli e News – Dott.ssa Di Sanzo" />
        <meta property="og:description" content="Articoli e approfondimenti su salute degli occhi e prevenzione." />
        <meta property="og:image" content="https://www.mariadisanzo.com/oculista-bologna-di-sanzo.jpg" />
        <meta property="og:url" content="https://www.mariadisanzo.com/blog" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header Section */}
      <section className="bg-blue-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Blog & News
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Approfondimenti, consigli e novità dal mondo dell'oculistica per prenderti cura della tua vista.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                {/* Image */}
                <Link to={`/blog/${post.slug}`} className="relative h-48 overflow-hidden block">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {post.category}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <Link to={`/blog/${post.slug}`} className="block group">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span className="truncate max-w-[100px]">{post.author}</span>
                    </div>
                    <Link 
                      to={`/blog/${post.slug}`}
                      className="text-blue-600 font-semibold flex items-center hover:text-blue-800 transition-colors py-2 px-2 -mr-2"
                    >
                      Leggi tutto <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA Section (Mobile Friendly) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center bg-white rounded-3xl p-8 md:p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Hai bisogno di una visita?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Prenota un appuntamento presso l'Ospedale Maggiore di Bologna per un controllo completo.
          </p>
          <Link
            to="/prenotazione"
            className="inline-block w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Prenota Ora
          </Link>
        </div>
      </section>
    </div>
  );
}
