import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroScene from '../components/HeroScene';
import { subscribeToNewsletter } from '../utils/newsletter';
import { Play, ArrowRight, BookOpen, History, Brain } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import SEO from '../components/SEO';

const Home = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubscribing(true);
    setMessage('');

    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setMessage('Successfully subscribed!');
        setEmail('');
      } else {
        setMessage(result.error || 'Failed to subscribe.');
      }
    } catch (err) {
      setMessage('An error occurred.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <MainLayout>
      <SEO
        title="Home"
        description="Exploring the profound depths of non-duality through scholarly discourses, authentic translations, and the timeless wisdom of the Upanishads."
        url="/"
      />

      {/* Hero Section */}
      <section className="relative min-h-[870px] flex items-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10"></div>
          <img
            alt="Spiritual Scholar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA02vsQc_KUTYWlpRJbSQ7F0Kp7wW85vtSOqfy1KKw0Zaoe6ZoN18FQGzgw2659zdQ-Yh_rJR9Jm8esAQC8o6_NMqlr9qtjGWUK5BJLRyfqWCvIYyaWz6UlCKy_kBJrObFb4CsE6LPMm_8Ai_jFsRxGpxssXj76OVBEmuCug06veCCgApFxJrA8l2m7VqLi2-wRXz1AhejyeJC8jp4DwlOB-hqNErXSBjlK11qGEc6wUBmF_bDoTJvXtCEGCyQjVGfjId4Ty7frUf4"
          />
        </div>

        <HeroScene />

        <div className="relative z-20 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase">
              Ancient Wisdom. Modern Voice.
            </span>
            <h1 className="font-headline text-6xl md:text-7xl text-white leading-[1.1]">
              The Path of <br />
              <span className="text-secondary-container italic">Advaita Vedanta</span>
            </h1>
            <p className="text-primary-fixed text-lg max-w-lg leading-relaxed font-light">
              Exploring the profound depths of non-duality through scholarly discourses, authentic translations, and the timeless wisdom of the Upanishads.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-md font-bold text-lg hover:shadow-xl transition-all">
                Begin Journey
              </button>
              <button className="border border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-sm">
                Listen to Discourses
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl"></div>
              <div className="relative bg-surface-container-lowest p-8 shadow-2xl rounded-xl rotate-3 transform translate-y-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-container rounded-full flex items-center justify-center">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-headline font-bold text-on-surface">Daily Reflection</p>
                    <p className="text-xs text-outline italic">Taitteriya Upanishad</p>
                  </div>
                </div>
                <p className="font-headline text-xl italic text-on-surface leading-snug">
                  "That from which all these beings are born... seek to know That. That is Brahman."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pravachanam Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="font-headline text-4xl text-primary font-bold mb-4">Pravachanam</h2>
              <div className="h-1 w-24 bg-secondary-container"></div>
            </div>
            <button className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group">
              View All Discourses <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 group cursor-pointer overflow-hidden rounded-xl relative h-[400px]">
              <img
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxoal24kWql2c2UOOaJ-ocDD4IzqrG6mrAKuI3iDfVCf3zCYAPE_8avI1jVob11N9BGYNsAViQ08sKBZFkvlvYjduqKt96xPVGEa0RsZzc-TLEqo6Q3CznWRF3lNzWLJjGgYAu3ya0VAnEknMraRcjPW1yTXdmxJjmAC2ook0QOU0eITpCr1Mc2RGXO6jZVUYZDnIJCfvS9XuSSkojm8vyCtB6w7ySmX0GptZr-MkXgxzdVGxjRUUD3PotjPtZZnW4XbxffTbFNm0"
                alt="Bhagavad Gita"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8">
                <div className="flex gap-2 mb-4">
                  <span className="bg-secondary text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold">Live Stream</span>
                  <span className="bg-surface/20 text-white backdrop-blur-md px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold">Series: Bhagavad Gita</span>
                </div>
                <h3 className="font-headline text-3xl text-white font-bold max-w-xl">The Essence of Karma Yoga: Action Without Attachment</h3>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { title: "Understanding the Nature of Reality: Verses 1-5", series: "Upadesa Saram", time: "3 days ago" },
                { title: "The Causal Relationship: Sankara's Commentary", series: "Brahma Sutras", time: "1 week ago" }
              ].map((item, idx) => (
                <div key={idx} className="bg-surface-container p-6 rounded-xl hover:translate-x-1 transition-transform cursor-pointer">
                  <p className="text-secondary font-bold text-xs uppercase mb-2">{item.series}</p>
                  <h4 className="font-headline text-lg font-bold text-on-surface leading-tight">{item.title}</h4>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Play className="text-white w-4 h-4 fill-current" />
                    </div>
                    <span className="text-xs text-outline">Published {item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-4xl text-primary font-bold mb-4">Scholarly Articles</h2>
            <p className="text-outline max-w-2xl mx-auto">In-depth explorations of Vedantic concepts, historical manuscripts, and modern applications of ancient wisdom.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between group cursor-pointer relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 text-primary/10">
                <BookOpen className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <span className="bg-tertiary-fixed text-on-tertiary-fixed px-3 py-1 rounded-full text-[10px] font-bold">FEATURED EDITORIAL</span>
                <h3 className="font-headline text-4xl text-on-surface font-bold mt-6 leading-tight">The Concept of Mithya: <br />Unraveling the Illusion of Duality</h3>
                <p className="text-on-surface-variant mt-6 line-clamp-4 leading-relaxed">Advaita Vedanta introduces the revolutionary concept of 'Mithya'—that which is neither absolutely real nor absolutely non-existent...</p>
              </div>
              <div className="mt-8 flex items-center gap-4 border-t border-outline-variant/30 pt-6">
                <div className="w-12 h-12 rounded-full bg-slate-300 overflow-hidden"></div>
                <div>
                  <p className="text-sm font-bold text-on-surface">Dr. Vidya Shankar</p>
                  <p className="text-xs text-outline">Chief Editor • 12 min read</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container p-8 rounded-xl group cursor-pointer hover:bg-surface-variant transition-colors">
              <div className="flex justify-between items-start">
                <div className="max-w-[70%]">
                  <span className="text-secondary font-bold text-xs">TRADITION</span>
                  <h4 className="font-headline text-2xl font-bold text-on-surface mt-2">The Legacy of Adi Shankaracharya</h4>
                </div>
                <div className="w-12 h-12 flex items-center justify-center text-primary">
                  <History className="w-8 h-8" />
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-xl group cursor-pointer hover:bg-on-primary-fixed-variant transition-colors flex flex-col justify-between">
              <History className="text-secondary-container w-8 h-8" />
              <h4 className="font-headline text-lg font-bold leading-snug">Manuscript Preservation Project</h4>
            </div>

            <div className="bg-secondary-container p-8 rounded-xl group cursor-pointer hover:opacity-90 transition-colors flex flex-col justify-between">
              <Brain className="text-on-secondary-container w-8 h-8" />
              <h4 className="font-headline text-lg font-bold text-on-secondary-container leading-snug">Vedanta & Modern Science</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 bg-[#164491]">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="font-headline text-4xl text-white font-bold mb-6">Join Our Spiritual Community</h2>
          <p className="text-primary-fixed mb-10 text-lg">Receive weekly insights, newly published articles, and notifications about live discourses directly in your inbox.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
              placeholder="Your email address"
              type="email"
              required
            />
            <button
              type="submit"
              disabled={isSubscribing}
              className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-md font-bold hover:scale-105 transition-transform active:scale-95 disabled:opacity-50"
            >
              {isSubscribing ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
          {message && <p className="text-white/80 mt-4 italic">{message}</p>}
          <p className="text-white/40 text-xs mt-6 uppercase tracking-widest">Respected privacy. No spam. Only wisdom.</p>
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
