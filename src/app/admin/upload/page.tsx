'use client';

import { useState, useRef } from 'react';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { Upload, FileText, CheckCircle2, Loader2, Image as ImageIcon } from 'lucide-react';
import ImageSuggestions from '@/components/admin/ImageSuggestions';
import { supabase } from '@/lib/supabase';

export default function UploadBookPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    coverImage: '',
    keywords: [] as string[]
  });
  const [aiThinking, setAiThinking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setStep(2);
      generateAISuggestions(selectedFile.name);
    }
  };

  const generateAISuggestions = async (fileName: string) => {
    setAiThinking(true);
    try {
      const response = await fetch('/api/ai/suggest-book-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        title: data.title || fileName.replace(/\.pdf$/i, ''),
        description: data.description || '',
        category: data.category || 'Philosophy',
        keywords: data.keywords || ['spiritual', 'meditation', 'ancient text']
      }));
    } catch (error) {
      console.error('AI Suggestion Error:', error);
    } finally {
      setAiThinking(false);
    }
  };

  const handlePublish = async () => {
    setUploading(true);
    try {
      // 1. Upload PDF to Storage
      let fileUrl = '';
      if (file) {
        const filePath = `books/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
          .from('books')
          .upload(filePath, file);
        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('books')
          .getPublicUrl(filePath);
        fileUrl = publicUrl;
      }

      // 2. Save to Database
      const { error: dbError } = await supabase.from('teachings').insert({
        title: formData.title,
        description: formData.description,
        type: 'book',
        category_name: formData.category,
        file_url: fileUrl,
        cover_image_url: formData.coverImage,
        published_at: new Date().toISOString()
      });

      if (dbError) throw dbError;
      setStep(4);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AdminLayout userEmail="Admin">
      <div className="p-12 max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black text-[#2D5016] tracking-tight mb-2">Upload a Book</h1>
            <p className="text-gray-500 text-lg font-medium">Follow the simple steps to share your wisdom.</p>
          </div>
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm ${
                  step >= s ? 'bg-[#E8873A] text-white' : 'bg-white text-gray-300 border border-gray-100'
                }`}
              >
                {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white p-20 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-24 h-24 bg-[#E8873A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Upload className="w-12 h-12 text-[#E8873A]" />
              </div>
              <h2 className="text-3xl font-black text-[#2D5016] mb-4">Choose your PDF file</h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto font-medium">Select the book you wish to share. I&apos;ll read the file name and help you fill in the details.</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-12 py-5 bg-[#2D5016] text-white text-lg font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-2xl hover:scale-105 active:scale-95"
              >
                Choose PDF File
              </button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".pdf" className="hidden" />
            </div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E8873A]/5 rounded-full blur-3xl"></div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8">
              <div className="flex items-center gap-4 pb-6 border-b border-gray-50">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <FileText className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Selected File</p>
                  <p className="text-lg font-black text-[#2D5016] truncate max-w-[200px]">{file?.name}</p>
                </div>
              </div>

              {aiThinking ? (
                <div className="py-12 text-center space-y-4">
                  <Loader2 className="w-10 h-10 text-[#E8873A] animate-spin mx-auto" />
                  <p className="text-[#E8873A] font-bold text-sm uppercase tracking-widest animate-pulse">AI is thinking about your book...</p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Book Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-6 py-4 bg-[#FDFBF7] border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-bold text-[#2D5016]"
                      placeholder="Give your book a beautiful title"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-6 py-4 bg-[#FDFBF7] border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-medium text-gray-600 leading-relaxed"
                      placeholder="Describe what this book is about in simple words..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {['Advaita Vedanta', 'Pranayama', 'Philosophy', 'Meditation'].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setFormData({ ...formData, category: cat })}
                          className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                            formData.category === cat
                              ? 'bg-[#E8873A] border-[#E8873A] text-white shadow-lg'
                              : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.title || !formData.description}
                    className="w-full py-5 bg-[#2D5016] text-white text-lg font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-2xl mt-4 disabled:opacity-50"
                  >
                    Continue to Cover Image <span className="ml-2">→</span>
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-[#2D5016] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Live Preview</p>
                <div className="bg-white rounded-3xl overflow-hidden shadow-sm aspect-[3/4] flex flex-col items-center justify-center p-8 text-center space-y-6">
                  {formData.coverImage ? (
                    <img src={formData.coverImage} alt="Cover Preview" className="w-full h-full object-cover absolute inset-0 opacity-10 blur-sm" />
                  ) : (
                    <div className="w-20 h-20 bg-[#E8873A]/10 rounded-2xl flex items-center justify-center mb-4">
                      <ImageIcon className="w-10 h-10 text-[#E8873A]" />
                    </div>
                  )}
                  <div className="relative z-10 space-y-4">
                    <span className="inline-block px-4 py-1 bg-[#E8873A] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {formData.category || 'CATEGORY'}
                    </span>
                    <h3 className="text-2xl font-black text-[#2D5016] leading-tight">{formData.title || 'Your Beautiful Title'}</h3>
                    <p className="text-gray-400 text-sm line-clamp-3 font-medium px-4">{formData.description || 'A short and inspiring description will appear here...'}</p>
                    <div className="pt-4 flex items-center justify-center gap-2 text-[#E8873A] font-bold text-xs">
                       <FileText className="w-4 h-4" /> PDF READY
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8">
              <div className="pb-6 border-b border-gray-50">
                <h2 className="text-2xl font-black text-[#2D5016] mb-2 tracking-tight">Select a Cover Image</h2>
                <p className="text-gray-400 font-medium">I&apos;ve suggested some images based on your book. Click one to choose it.</p>
              </div>

              <ImageSuggestions
                initialKeywords={formData.keywords}
                selectedUrl={formData.coverImage}
                onSelect={(url) => setFormData({ ...formData, coverImage: url })}
              />

              <div className="flex gap-4 pt-6">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
                >
                  Back
                </button>
                <button
                  onClick={handlePublish}
                  disabled={uploading || !formData.coverImage}
                  className="flex-[2] py-4 bg-[#E8873A] text-white font-black rounded-2xl hover:bg-[#D67629] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Publish This Book</>}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#2D5016] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-full">
                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Final Preview</p>
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl aspect-[3/4] relative flex flex-col">
                  {formData.coverImage ? (
                    <>
                      <img src={formData.coverImage} alt="Final Cover Preview" className="w-full h-[60%] object-cover" />
                      <div className="p-8 space-y-4">
                        <span className="inline-block px-4 py-1 bg-[#E8873A] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                          {formData.category}
                        </span>
                        <h3 className="text-2xl font-black text-[#2D5016] leading-tight line-clamp-2">{formData.title}</h3>
                        <p className="text-gray-400 text-sm line-clamp-3 font-medium">{formData.description}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex-grow flex items-center justify-center text-gray-300">
                      <p className="font-bold uppercase tracking-widest text-xs">Waiting for image...</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="bg-white p-20 rounded-[3rem] shadow-2xl border border-gray-100 text-center space-y-8 relative overflow-hidden max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
             </div>
             <h2 className="text-3xl font-black text-[#2D5016] mb-4">Your book is now live!</h2>
             <p className="text-gray-400 text-lg mb-8 font-medium">Scientists, students, and seekers around the world can now read your shared wisdom.</p>
             <div className="flex flex-col gap-4">
               <button
                 onClick={() => {
                   setStep(1);
                   setFile(null);
                   setFormData({ title: '', description: '', category: '', coverImage: '', keywords: [] });
                 }}
                 className="px-12 py-4 bg-[#2D5016] text-white text-sm font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-xl uppercase tracking-widest"
               >
                 Upload Another Book
               </button>
               <button
                 onClick={() => window.location.href = '/admin'}
                 className="px-12 py-4 bg-white text-gray-500 text-sm font-bold rounded-2xl hover:bg-gray-50 transition-all uppercase tracking-widest border border-gray-100"
               >
                 Go back to Dashboard
               </button>
             </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
