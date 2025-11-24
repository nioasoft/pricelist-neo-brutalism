import CategorySection from '@/components/CategorySection';
import Image from 'next/image';

interface Service {
  id: string;
  name: string;
  explanation: string;
  technical: string;
  price: string;
}

interface Category {
  category: string;
  services: Service[];
}

async function getServices(): Promise<Category[]> {
  const res = await fetch('http://localhost:3000/api/services', {
    cache: 'no-store'
  });
  if (!res.ok) {
    throw new Error('Failed to fetch services');
  }
  return res.json();
}

export default async function Home() {
  const categories = await getServices();

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50" dir="rtl">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="neo-box mx-4 md:mx-8 mt-8 bg-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-4xl md:text-6xl font-black mb-4">
                <span className="bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  מחירון פיתוח דיגיטלי
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 font-bold mb-4">
                שירותי בניה ופיתוח אתרים ברמה הגבוהה ביותר 🚀
              </p>
              <p className="text-lg text-gray-600">
                פתרונות מקצועיים לעסק שלך - מדף נחיתה ועד מערכת מלאה
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <div className="neo-box bg-gradient-to-br from-purple-200 to-pink-200 p-4">
                <Image
                  src="/hero.png"
                  alt="Web Development"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 md:px-8 py-12 max-w-6xl">
        {categories.map((cat, idx) => (
          <CategorySection
            key={cat.category}
            category={cat.category}
            services={cat.services}
            colorIndex={idx}
          />
        ))}
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 md:px-8 mb-12 max-w-6xl">
        <div className="neo-box bg-gradient-to-r from-orange-400 to-pink-500 p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/4">
              <Image
                src="/rocket.png"
                alt="Success"
                width={300}
                height={300}
                className="w-full h-auto"
              />
            </div>
            <div className="flex-1 text-white">
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                מוכנים לשדרג את העסק? 🎯
              </h2>
              <p className="text-xl md:text-2xl font-bold">
                בואו נדבר על הפרויקט שלכם ונמצא את הפתרון המושלם!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="neo-box mx-4 md:mx-8 mb-8 bg-black text-white p-8 text-center">
        <p className="font-bold text-lg mb-2">💬 בואו נדבר על הפרויקט שלך</p>
        <p className="text-yellow-300 text-xl md:text-2xl font-black mt-4">⚠️ כל המחירים לא כוללים מע&quot;מ</p>
        <p className="text-gray-400 text-sm mt-4">© 2024 - כל הזכויות שמורות</p>
      </footer>
    </main>
  );
}
