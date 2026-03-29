'use client';

import { useState } from 'react';
import AdminLayout from '@/layouts/admin/AdminLayout';
import { CheckCircle2, Loader2, Sparkles, Wand2 } from 'lucide-react';
import RichTextEditor from '@/components/admin/RichTextEditor';
import ImageSuggestions from '@/components/admin/ImageSuggestions';
import { supabase } from '@/lib/supabase';

export default function WriteTeachingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    prompt: '',
    title: '',
    content: '',
    category: 'Philosophy',
    coverImage: '',
    keywords: [] as string[]
  });
  const [aiThinking, setAiThinking] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const generateAITeaching = async () => {
    if (!formData.prompt) return;
    setAiThinking(true);
    try {
      const response = await fetch('/api/ai/draft-teaching', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: formData.prompt }),
      });
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        title: data.title || '',
        content: data.content || '',
        keywords: data.keywords || ['yoga', 'meditation', 'wisdom']
      }));
      setStep(2);
    } catch (error) {
      console.error('AI Draft Error:', error);
      alert("AI is having trouble right now. Feel free to start writing manually.");
      setStep(2);
    } finally {
      setAiThinking(false);
    }
  };

  const handlePublish = async () => {
    setPublishing(true);
    try {
      const { error: dbError } = await supabase.from('teachings').insert({
        title: formData.title,
        content_text: formData.content,
        type: 'concept',
        category_name: formData.category,
        cover_image_url: formData.coverImage,
        published_at: new Date().toISOString()
      });

      if (dbError) throw dbError;
      setStep(4);
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <AdminLayout userEmail="Admin">
      <div className="p-12 max-w-6xl mx-auto space-y-12">
        <div className="flex items-center justify-between gap-6 pb-8 border-b border-gray-100">
          <div>
            <h1 className="text-4xl font-black text-[#2D5016] tracking-tight mb-2">Write a Teaching</h1>
            <p className="text-gray-500 text-lg font-medium">Share your thoughts and insights with the community.</p>
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
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-24 h-24 bg-[#E8873A]/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Wand2 className="w-12 h-12 text-[#E8873A]" />
              </div>
              <h2 className="text-3xl font-black text-[#2D5016] mb-4">What is this teaching about?</h2>
              <p className="text-gray-400 text-lg mb-8 font-medium">Type a simple sentence in plain English, and I&apos;ll help you draft a title and intro paragraph.</p>

              <div className="space-y-6">
                <textarea
                  value={formData.prompt}
                  onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                  placeholder="e.g. This teaching is about finding peace in daily life through mindfulness."
                  className="w-full px-8 py-6 bg-[#FDFBF7] border border-gray-200 rounded-[2rem] focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-medium text-lg text-[#2D5016] leading-relaxed shadow-sm min-h-[150px]"
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={generateAITeaching}
                    disabled={!formData.prompt || aiThinking}
                    className="px-12 py-5 bg-[#2D5016] text-white text-lg font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {aiThinking ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Sparkles className="w-6 h-6" /> Let AI Help Me Draft</>}
                  </button>
                  <button
                    onClick={() => setStep(2)}
                    className="px-12 py-5 bg-white text-gray-400 text-lg font-bold rounded-2xl hover:bg-gray-50 transition-all border border-gray-100 uppercase tracking-widest text-sm"
                  >
                    Skip & Write Manually
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#E8873A]/5 rounded-full blur-3xl"></div>
          </div>
        )}

        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-100 space-y-8 overflow-y-auto max-h-[800px]">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Teaching Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-6 py-4 bg-[#FDFBF7] border border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#E8873A]/10 outline-none font-bold text-[#2D5016] text-xl"
                    placeholder="Enter a title..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Body Content</label>
                  <RichTextEditor
                    content={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Share your wisdom here..."
                  />
                  <div className="flex justify-end pt-2">
                     <button className="text-[#E8873A] font-bold text-xs uppercase tracking-widest flex items-center gap-2 hover:underline">
                        <Sparkles className="w-3 h-3" /> Ask AI to continue writing
                     </button>
                  </div>
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
                  disabled={!formData.title || !formData.content}
                  className="w-full py-5 bg-[#2D5016] text-white text-lg font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-2xl mt-4 disabled:opacity-50"
                >
                  Continue to Cover Image <span className="ml-2">→</span>
                </button>
              </div>
            </div>

            <div className="space-y-6 sticky top-12">
              <div className="bg-[#2D5016] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-[600px] flex flex-col">
                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Live Preview</p>
                <div className="bg-white rounded-3xl overflow-y-auto shadow-sm flex-grow p-8 space-y-6">
                  <div className="space-y-4">
                    <span className="inline-block px-4 py-1 bg-[#E8873A] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                      {formData.category || 'CATEGORY'}
                    </span>
                    <h3 className="text-3xl font-black text-[#2D5016] leading-tight">{formData.title || 'Your Teaching Title'}</h3>
                    <div className="w-12 h-1 bg-[#E8873A]/20 rounded-full"></div>
                  </div>
                  <div
                    className="prose prose-sm text-gray-600 font-medium leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formData.content || '<p>Start writing to see the preview here...</p>' }}
                  />
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
                <p className="text-gray-400 font-medium">Choose an image that reflects the essence of your teaching.</p>
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
                  disabled={publishing || !formData.coverImage}
                  className="flex-[2] py-4 bg-[#E8873A] text-white font-black rounded-2xl hover:bg-[#D67629] transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  {publishing ? <Loader2 className="w-5 h-5 animate-spin" /> : <><CheckCircle2 className="w-5 h-5" /> Publish Now</>}
                </button>
              </div>
            </div>

            <div className="space-y-6 sticky top-12">
              <div className="bg-[#2D5016] p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-[600px] flex flex-col">
                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Final Preview</p>
                <div className="bg-white rounded-3xl overflow-y-auto shadow-sm flex-grow relative">
                  {formData.coverImage && (
                    <img src={formData.coverImage} alt="Cover Preview" className="w-full h-48 object-cover" />
                  )}
                  <div className="p-8 space-y-6">
                    <div className="space-y-4">
                      <span className="inline-block px-4 py-1 bg-[#E8873A] text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                        {formData.category}
                      </span>
                      <h3 className="text-3xl font-black text-[#2D5016] leading-tight">{formData.title}</h3>
                    </div>
                    <div
                      className="prose prose-sm text-gray-600 font-medium leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formData.content }}
                    />
                  </div>
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
             <h2 className="text-3xl font-black text-[#2D5016] mb-4">Teaching Published!</h2>
             <p className="text-gray-400 text-lg mb-8 font-medium">Your wisdom has been shared and is now available for all seekers to read.</p>
             <div className="flex flex-col gap-4">
               <button
                 onClick={() => {
                   setStep(1);
                   setFormData({ prompt: '', title: '', content: '', category: 'Philosophy', coverImage: '', keywords: [] });
                 }}
                 className="px-12 py-4 bg-[#2D5016] text-white text-sm font-black rounded-2xl hover:bg-[#E8873A] transition-all shadow-xl uppercase tracking-widest"
               >
                 Write Another Teaching
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
