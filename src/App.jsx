import React from 'react';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import WikipediaPage from './pages/WikipediaPage';
import AdminPortal from './pages/AdminPortal';
import ContentArchive from './pages/ContentArchive';
import { ProtectedRoute } from './components/ProtectedRoute';

// Mock data for initial sample pages
const sampleArticle = {
  title: "The Concept of Mithya",
  category: "Traditional Vedantic Scholarly Article",
  author: "Dr. Vidya Shankar",
  date: "November 2024",
  pdfUrl: "/samples/mithya.pdf",
  content: [
    {
      heading: "Overview",
      paragraphs: [
        "Advaita Vedanta introduces the revolutionary concept of 'Mithya'—that which is neither absolutely real nor absolutely non-existent. This concept is fundamental to understanding the nature of the world as taught in the Upanishads and systemized by Adi Shankaracharya.",
        "To the uninitiated, Mithya might seem to mean 'false' or 'unreal', but its philosophical implications are far more nuanced. It refers to that which is dependent for its existence on something else, much like the wave is dependent on the ocean."
      ]
    },
    {
      heading: "The Classical Metaphor of the Snake and the Rope",
      paragraphs: [
        "Perhaps the most famous illustration used in the Advaita tradition is the rajju-sarpa-nyaya, or the metaphor of the rope and the snake. In semi-darkness, a man mistakes a rope for a snake. His fear is real, his reaction is real, but the snake itself is Mithya.",
        "Upon closer inspection with a light, the 'snake' disappears, and only the rope remains. The rope is the Satya (the truth), while the snake was Mithya (a superimposition or Adhyasa)."
      ]
    }
  ]
};

function App() {
  const { signInWithGoogle, user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/articles" element={
          <ContentArchive
            title="Scholarly Articles"
            description="Deep dives into the philosophical landscape of Advaita Vedanta, featuring both traditional and contemporary interpretations."
            items={[
              { title: "The Concept of Mithya", category: "Philosophy", date: "Nov 2024", excerpt: "Exploring the nature of reality and illusion in Shankara's tradition.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA02vsQc_KUTYWlpRJbSQ7F0Kp7wW85vtSOqfy1KKw0Zaoe6ZoN18FQGzgw2659zdQ-Yh_rJR9Jm8esAQC8o6_NMqlr9qtjGWUK5BJLRyfqWCvIYyaWz6UlCKy_kBJrObFb4CsE6LPMm_8Ai_jFsRxGpxssXj76OVBEmuCug06veCCgApFxJrA8l2m7VqLi2-wRXz1AhejyeJC8jp4DwlOB-hqNErXSBjlK11qGEc6wUBmF_bDoTJvXtCEGCyQjVGfjId4Ty7frUf4" },
              { title: "Non-Duality in Modern Physics", category: "Science", date: "Oct 2024", excerpt: "How quantum entanglement parallels ancient Vedic concepts of interconnectedness." }
            ]}
          />
        } />

        <Route path="/pravachanam" element={
          <ContentArchive
            title="Pravachanam"
            description="Listen to enlightening discourses on the Upanishads, Bhagavad Gita, and Brahma Sutras by eminent scholars."
            items={[
              { title: "Essence of Bhagavad Gita", category: "Discourse", date: "Last Week", excerpt: "A series explaining the 18 chapters of the Gita in simple terms.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxoal24kWql2c2UOOaJ-ocDD4IzqrG6mrAKuI3iDfVCf3zCYAPE_8avI1jVob11N9BGYNsAViQ08sKBZFkvlvYjduqKt96xPVGEa0RsZzc-TLEqo6Q3CznWRF3lNzWLJjGgYAu3ya0VAnEknMraRcjPW1yTXdmxJjmAC2ook0QOU0eITpCr1Mc2RGXO6jZVUYZDnIJCfvS9XuSSkojm8vyCtB6w7ySmX0GptZr-MkXgxzdVGxjRUUD3PotjPtZZnW4XbxffTbFNm0" },
              { title: "Intro to Upanishads", category: "Lecture", date: "Jan 2025", excerpt: "Understanding the primary Upanishads and their core message of 'Tat Tvam Asi'." }
            ]}
          />
        } />

        <Route path="/books" element={
          <ContentArchive
            title="Digital Library"
            description="Access our extensive collection of digital books, authentic translations, and rare manuscripts."
            items={[
              { title: "Vivekachudamani", category: "Classic Text", date: "Archive", excerpt: "The Crest Jewel of Discrimination - Complete translation and commentary." },
              { title: "Panchadasi of Vidyaranya", category: "Advanced Study", date: "Archive", excerpt: "A comprehensive guide to Advaita Vedanta for serious practitioners." }
            ]}
          />
        } />

        <Route path="/gallery" element={
          <ContentArchive
            title="Spiritual Gallery"
            description="Visual journey through sacred landscapes, historical temples, and scholarly meetups."
            items={[]} // Empty to show the placeholder
          />
        } />

        {/* Wikipedia Style Article Page */}
        <Route path="/article/mithya" element={<WikipediaPage {...sampleArticle} />} />

        {/* Auth Routes */}
        <Route path="/login" element={
          user ? <Navigate to="/" replace /> : (
            <div className="flex items-center justify-center min-h-screen bg-background p-8">
              <div className="p-12 bg-white shadow-2xl rounded-2xl max-w-md w-full text-center border border-outline-variant/30">
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-8">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-headline text-2xl font-bold italic">A</div>
                </div>
                <h2 className="font-headline text-3xl font-bold text-primary mb-4 tracking-tight">Login to Your Archive</h2>
                <p className="text-outline mb-12 text-sm leading-relaxed">Access premium content, scholarly articles, and downloadable resources with your secure account.</p>
                <button
                  onClick={signInWithGoogle}
                  className="w-full flex items-center justify-center gap-4 bg-white border border-outline-variant/50 px-6 py-4 rounded-xl font-bold hover:bg-surface-container transition-all active:scale-95 shadow-sm"
                >
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
                  Continue with Google
                </button>
              </div>
            </div>
          )
        } />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPortal />
          </ProtectedRoute>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
