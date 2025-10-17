'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface Template {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description?: string;
}

export default function HomePage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchTemplates = async () => {
      const { data, error } = await supabase.from('templates1').select('*').limit(100);
      if (error) console.error(error);
      else setTemplates(data || []);
      setLoading(false);
    };
    fetchTemplates();
  }, []);

  const filtered = templates.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-lg">Loading templates...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-yellow-50 to-white text-gray-800">
      <header className="p-6 text-center">
        <h1 className="text-4xl font-bold mb-2 text-yellow-600">🍌 BananaAI</h1>
        <p className="text-gray-500 mb-6">Trendy AI photo templates for every moment</p>
        <input
          type="text"
          placeholder="Search templates..."
          className="w-full max-w-md mx-auto p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden">
            <img src={t.image_url} alt={t.title} className="w-full h-60 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{t.title}</h3>
              <p className="text-sm text-gray-500">{t.category}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
