'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Newsletter from '@/components/Newsletter';
import {
  X,
  Camera,
  Users,
  GraduationCap,
  Award,
  Calendar,
  MapPin,
  Eye,
  ArrowRight,
  Zap,
  LayoutGrid,
  Layers
} from 'lucide-react';

interface GalleryImage {
  _id?: string;
  imageUrl: string;
  imageAlt: string;
  title: string;
  category: string;
  eventDate?: string;
  location?: string;
  description: string;
  published?: boolean;
}

export default function Gallery() {
  const [mounted, setMounted] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    setMounted(true);
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/gallery?published=true');
      const data = await response.json();
      
      if (data.success && data.images) {
        setGalleryImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', name: 'Global Data', icon: LayoutGrid },
    { id: 'events', name: 'Summits', icon: Calendar },
    { id: 'campus', name: 'Infrastructure', icon: Layers },
    { id: 'graduation', name: 'Deployment', icon: GraduationCap },
    { id: 'activities', name: 'Operations', icon: Users },
    { id: 'achievements', name: 'Benchmarks', icon: Award }
  ];

  // Demo gallery images - always displayed along with database images
  const demoImages: GalleryImage[] = [
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Educational Excellence',
      title: 'Educational Architect',
      category: 'achievements',
      eventDate: '2024-03-15',
      location: 'Leadership',
      description: 'Pioneering educational transformation and institutional excellence.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Students Learning',
      title: 'Interactive Learning Session',
      category: 'events',
      eventDate: '2024-03-15',
      location: 'Classroom Hub',
      description: 'Students engaged in collaborative learning and knowledge sharing.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'University Campus',
      title: 'Modern Educational Infrastructure',
      category: 'campus',
      eventDate: '2024-02-20',
      location: 'Campus Node',
      description: 'State-of-the-art campus facilities designed for optimal learning experience.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Graduation Ceremony',
      title: 'Success Protocol 2024',
      category: 'graduation',
      eventDate: '2024-01-30',
      location: 'Convocation Hall',
      description: 'Celebrating the successful deployment of our elite student fleet.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Programming & Development',
      title: 'Collaborative Workspace',
      category: 'activities',
      eventDate: '2024-03-10',
      location: 'Learning Zone',
      description: 'Collaborative environments focused on high-bandwidth knowledge transfer.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Research Lab',
      title: 'Academic Research Wing',
      category: 'achievements',
      eventDate: '2024-02-28',
      location: 'Innovation Lab',
      description: 'Experimental learning nodes achieving unprecedented academic benchmarks.'
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=600',
      imageAlt: 'Workshop Session',
      title: 'International Strategy Workshop',
      category: 'events',
      eventDate: '2024-03-05',
      location: 'Seminar Suite',
      description: 'Bridging international educational gaps through strategic collaboration.'
    }
  ];

  // Combine database images with demo images
  const displayImages = [...galleryImages, ...demoImages];
  const displayFiltered = selectedCategory === 'all'
    ? displayImages
    : displayImages.filter(img => img.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Hero Section */}
      <section className="relative">
        <div className="hidden">
          <img
            src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=70&w=1600"
            alt="Graduation Ceremony Backdrop"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)]"></div>
        </div>

        <div className="max-w-[1300px] mx-auto px-5 pt-14 w-full">
          <div className={`text-center flex flex-col items-center gap-4 ${mounted ? '' : ''}`}>
            <div className="flex items-center gap-2 text-lg lg:text-[22px] font-semibold text-black">
              <Camera className="hidden" />
              <span>Campus Life & Events</span>
            </div>
            <h1 className={`text-[42px] lg:text-[60px] leading-none font-bold text-brand-900 ${mounted ? '' : ''}`}>
              Edbell <br />
              <span className="text-brand-900">Visual Gallery</span>
            </h1>
            <p className={`text-[17px] text-black max-w-3xl mx-auto ${mounted ? '' : ''}`}>
              Explore the vibrant life at EdBell through our curated visual repository, showcasing our modern facilities, graduation successes, and student engagement across Kerala.
            </p>
          </div>

          <div className="mt-10">
            <div className="hidden"></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {displayImages.slice(0, 4).map((img, i) => (
                <div key={i} className="sk-shot h-40 lg:h-56 cursor-pointer">
                  <img
                    src={img.imageUrl}
                    alt={img.imageAlt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8">
        <div className="max-w-[1300px] mx-auto px-5 flex flex-wrap gap-2 justify-center">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`flex items-center gap-2 px-5 py-2 text-[15px] font-semibold border rounded-[15px] transition-colors ${selectedCategory === c.id
                ? 'border-brand-900 bg-brand-900 text-white'
                : 'border-brand-900 text-brand-900 bg-white hover:bg-brand-50'
                }`}
            >
              <c.icon className={`h-4 w-4 ${selectedCategory === c.id ? '' : ''}`} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="pb-16">
        <div className="max-w-[1300px] mx-auto px-5">
          {loading ? (
            <div className="text-center py-16">
              <Zap className="hidden" />
              <p className="text-lg text-black">Loading gallery...</p>
            </div>
          ) : displayFiltered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-black">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {displayFiltered.map((img, i) => (
                <div
                  key={img._id || i}
                  onClick={() => setSelectedImage(img)}
                  className="sk-card p-2.5 pb-5 cursor-pointer"
                >
                  <div className="hidden">
                    {img.category.toUpperCase()}
                  </div>

                  <img
                    src={img.imageUrl}
                    alt={img.imageAlt}
                    className="w-full aspect-[4/3] object-cover sk-photo"
                  />

                  <div className="hidden"></div>
                  <div className="hidden"></div>

                  <div className="px-3 pt-4 space-y-1">
                    <span className="text-sm sk-role">{img.category} // {img.location || 'EdBell'}</span>
                    <h3 className="text-xl font-semibold text-brand-900">{img.title}</h3>
                    <p className="text-base text-black">
                      {img.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-black">{img.eventDate || new Date().toISOString().split('T')[0]}</span>
                      <div className="hidden">
                        <Eye className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 sk-mint">
        <div className="max-w-[1300px] mx-auto px-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <Zap className="hidden" />
          <h2 className="text-3xl lg:text-[45px] lg:leading-tight font-bold text-brand-900">
            Join the <br />
            <span className="text-brand-900">Ecosystem</span>
          </h2>
          <Link href="/contact" className="inline-flex items-center justify-center px-10 py-3 bg-brand-700 rounded-[10px] text-white text-[15px] font-semibold hover:bg-brand-900 transition-colors">
            Deploy Now
          </Link>
        </div>
      </section>

      <section className="py-12 sm:py-16 ">
        <div className="max-w-[1300px] mx-auto px-5">
          <Newsletter />
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-[1000] flex items-start justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto" onClick={() => setSelectedImage(null)}>
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="relative max-w-5xl w-full bg-white rounded-md flex flex-col lg:flex-row my-auto overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="lg:w-2/3 h-[40vh] sm:h-[50vh] lg:h-[70vh] relative group">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.imageAlt}
                className="w-full h-full object-contain bg-gray-100"
              />
            </div>
            <div className="sk-card lg:w-1/3 p-6 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-6">
                <button onClick={() => setSelectedImage(null)} className="p-3 rounded text-gray-900 hover:bg-gray-100">
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
                <div className="space-y-3">
                  <span className="text-base font-semibold text-brand-700">{selectedImage.category} Protocol</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-heading)] leading-tight">{selectedImage.title}</h3>
                  <div className="flex items-center space-x-3 text-sm font-bold text-[var(--text-muted)]">
                    <MapPin className="h-3 w-3 text-brand-700" />
                    <span>{selectedImage.location || 'EdBell'}</span>
                    <span className="text-brand-700">|</span>
                    <Calendar className="h-3 w-3 text-brand-700" />
                    <span>{selectedImage.eventDate || new Date().toISOString().split('T')[0]}</span>
                  </div>
                </div>
                <p className="text-base sm:text-base text-[var(--text-primary)] font-normal leading-relaxed">{selectedImage.description}</p>
              </div>
              <div className="pt-6">
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="inline-flex items-center justify-center px-6 py-3 bg-brand-700 rounded-[10px] text-white font-semibold hover:bg-brand-800 transition-colors w-full gap-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Return to Repository</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
