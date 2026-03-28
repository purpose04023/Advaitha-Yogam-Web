import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, Plus, Trash2, UserPlus, Share2, LogOut, FileText, Image, Layout, Settings, Bot, Loader2, CheckCircle2 } from 'lucide-react';
import AdminAIAssistant from '../components/AdminAIAssistant';
import { supabase } from '../lib/supabase';

const AdminPortal = () => {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('content');
  const [selectedLayout, setSelectedLayout] = useState('default');
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState('');
  const [recentUploads, setRecentUploads] = useState([
    { name: 'Upadesa Saram - Part 2.pdf', type: 'PDF', date: 'Oct 28, 2024' },
    { name: 'Mithya Concept Summary.pdf', type: 'PDF', date: 'Oct 25, 2024' }
  ]);
  const fileInputRef = useRef(null);

  const stats = [
    { label: 'Total Articles', value: 12 },
    { label: 'Books Published', value: 8 },
    { label: 'Pravachanams', value: 45 },
    { label: 'Subscribers', value: '1.2k' },
  ];

  const handleLayoutSuggestion = (layout) => {
    setSelectedLayout(layout);
    alert(`Applied ${layout} layout suggested by AI!`);
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setUploadMessage('Preparing upload...');

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `articles/${fileName}`;

      // 1. Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('content')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Get Public URL
      const { data: { publicUrl } } = supabase.storage
        .from('content')
        .getPublicUrl(filePath);

      // 3. Save to Articles Table (simulated if table doesn't exist yet)
      const { error: dbError } = await supabase
        .from('articles')
        .insert([
          {
            title: file.name,
            pdf_url: publicUrl,
            author: user.email,
            category: 'Uncategorized'
          }
        ]);

      setUploadMessage('Successfully uploaded!');
      setRecentUploads(prev => [{
        name: file.name,
        type: fileExt.toUpperCase(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        url: publicUrl
      }, ...prev]);

    } catch (error) {
      console.error('Error uploading:', error);
      setUploadMessage(`Error: ${error.message || 'Upload failed'}`);
    } finally {
      setUploading(false);
      setTimeout(() => setUploadMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f1e7d6] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-primary text-white p-8 flex flex-col justify-between shadow-2xl">
        <div className="space-y-12">
          <div className="font-headline text-xl font-bold leading-tight tracking-tight">
            Editorial Spiritual <span className="text-secondary-container">Excellence</span> Admin
          </div>

          <nav className="space-y-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-4 w-full text-left font-bold transition-all ${activeTab === 'dashboard' ? 'text-secondary-container' : 'text-primary-fixed hover:text-white'}`}
            >
              <Layout className="w-5 h-5" /> Dashboard
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`flex items-center gap-4 w-full text-left font-bold transition-all ${activeTab === 'content' ? 'text-secondary-container' : 'text-primary-fixed hover:text-white'}`}
            >
              <FileText className="w-5 h-5" /> Content Management
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-4 w-full text-left font-bold transition-all ${activeTab === 'users' ? 'text-secondary-container' : 'text-primary-fixed hover:text-white'}`}
            >
              <UserPlus className="w-5 h-5" /> Access Control
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-4 w-full text-left font-bold transition-all ${activeTab === 'settings' ? 'text-secondary-container' : 'text-primary-fixed hover:text-white'}`}
            >
              <Settings className="w-5 h-5" /> Settings
            </button>
          </nav>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-3 pt-6 border-t border-white/20">
            <div className="w-10 h-10 rounded-full bg-secondary-container/20 overflow-hidden">
              <img src={user?.user_metadata?.avatar_url} alt="avatar" />
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-xs font-bold truncate">{user?.email}</p>
              <p className="text-[10px] text-primary-fixed uppercase font-bold tracking-widest">Administrator</p>
            </div>
          </div>
          <button
            onClick={signOut}
            className="flex items-center gap-3 w-full text-left font-bold text-red-400 hover:text-red-300 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-12">
          {activeTab === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-outline-variant/30 text-center">
                    <p className="text-outline text-xs uppercase font-bold tracking-widest mb-2">{stat.label}</p>
                    <p className="text-4xl font-headline font-bold text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white p-12 rounded-2xl shadow-sm border border-outline-variant/30 text-center">
                <Bot className="w-16 h-16 text-primary mx-auto mb-6 opacity-30" />
                <h2 className="font-headline text-3xl font-bold text-primary mb-4">Welcome back, Admin!</h2>
                <p className="text-outline max-w-xl mx-auto">Use the sidebar to manage your spiritual archive. Use the AI Assistant on the right for smart layout suggestions and content ideas.</p>
              </div>
            </>
          )}

          {activeTab === 'content' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="font-headline text-2xl font-bold text-primary">Upload New Content</h2>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-secondary-container text-on-secondary-container px-6 py-3 rounded-md font-bold flex items-center gap-2 hover:opacity-90 transition-all"
                    >
                      <Plus className="w-5 h-5" /> Add New
                    </button>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                  />

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed border-outline-variant/50 rounded-xl p-12 text-center hover:bg-surface-container transition-all cursor-pointer relative ${uploading ? 'opacity-50 cursor-wait' : ''}`}
                  >
                    {uploading ? (
                      <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                    ) : (
                      <Upload className="w-12 h-12 text-primary mx-auto mb-4 opacity-50" />
                    )}
                    <p className="text-on-surface font-bold mb-1">
                      {uploading ? 'Uploading...' : 'Click or drag & drop your PDFs or images here'}
                    </p>
                    <p className="text-outline text-xs">Maximum file size: 50MB</p>

                    {uploadMessage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-xl">
                        <p className="text-primary font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5" /> {uploadMessage}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 space-y-4">
                    <h3 className="font-headline font-bold text-on-surface">Recent Uploads</h3>
                    {recentUploads.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg border border-outline-variant/30">
                        <div className="flex items-center gap-4">
                          <FileText className="text-primary w-6 h-6" />
                          <div>
                            <p className="text-sm font-bold text-on-surface truncate max-w-[200px]">{file.name}</p>
                            <p className="text-[10px] text-outline font-bold uppercase tracking-widest">{file.date}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {file.url && (
                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="p-2 text-primary hover:bg-white rounded-md transition-all">
                              <Share2 className="w-4 h-4" />
                            </a>
                          )}
                          <button className="p-2 text-red-500 hover:bg-white rounded-md transition-all"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-[calc(100vh-10rem)]">
                <AdminAIAssistant onSuggestion={handleLayoutSuggestion} />
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-outline-variant/30">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-primary">Access Control</h2>
                  <p className="text-sm text-outline">Manage who can edit content on the website.</p>
                </div>
                <button className="bg-primary text-white px-6 py-3 rounded-md font-bold flex items-center gap-2">
                  <UserPlus className="w-5 h-5" /> Share Access
                </button>
              </div>
              <div className="space-y-4">
                {[
                  { email: 'subbu.eenadu@gmail.com', role: 'Owner', status: 'Active' },
                  { email: 'assistant@example.com', role: 'Editor', status: 'Pending' }
                ].map((u, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-surface-container rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-bold text-primary uppercase shadow-sm">
                        {u.email[0]}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{u.email}</p>
                        <p className="text-[10px] text-outline font-bold uppercase tracking-widest">{u.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${u.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {u.status}
                      </span>
                      <button className="text-secondary hover:underline text-xs font-bold flex items-center gap-1">
                        <Share2 className="w-3 h-3" /> Manage Access
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminPortal;
