'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';

interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description: string;
}

interface ImageSuggestionsProps {
  initialKeywords?: string[];
  onSelect: (imageUrl: string) => void;
  selectedUrl?: string;
}

export default function ImageSuggestions({ initialKeywords = [], onSelect, selectedUrl }: ImageSuggestionsProps) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialKeywords.length > 0) {
      handleSearch(initialKeywords[0]);
    }
  }, [initialKeywords]);

  const handleSearch = async (searchQuery: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/unsplash/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setImages(data.results || []);
    } catch (err: unknown) {
      setError("Unable to find images. Please try searching manually.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
            placeholder="Search for spiritual images..."
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#E8873A] outline-none text-sm"
          />
        </div>
        <button
          onClick={() => handleSearch(query)}
          className="px-6 py-3 bg-[#E8873A] text-white rounded-xl font-bold hover:bg-[#D67629] transition-all"
        >
          Search
        </button>
      </div>

      {initialKeywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {initialKeywords.map((kw, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(kw);
                handleSearch(kw);
              }}
              className="px-4 py-1.5 bg-[#FDFBF7] border border-[#E8873A]/20 text-[#2D5016] rounded-full text-xs font-bold hover:bg-[#E8873A]/10 transition-all"
            >
              {kw}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-400">
          <Loader2 className="w-8 h-8 animate-spin text-[#E8873A] mb-3" />
          <p className="font-bold text-xs uppercase tracking-widest">Finding beautiful images...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => onSelect(img.urls.regular)}
              className={`relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.02] border-2 ${
                selectedUrl === img.urls.regular ? 'border-[#E8873A] shadow-lg' : 'border-transparent'
              }`}
            >
              <img
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full h-full object-cover"
              />
              {selectedUrl === img.urls.regular && (
                <div className="absolute inset-0 bg-[#E8873A]/20 flex items-center justify-center">
                  <div className="bg-white rounded-full p-2 shadow-xl">
                    <CheckCircle2 className="w-6 h-6 text-[#E8873A]" />
                  </div>
                </div>
              )}
            </div>
          ))}
          {images.length === 0 && !error && (
            <div className="col-span-full py-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-2xl">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-20" />
              <p className="font-bold text-xs uppercase tracking-widest">Search for a cover image</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
