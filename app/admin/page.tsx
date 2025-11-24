'use client';

import { useState, useEffect } from 'react';
import { Pencil, Plus, Save, Trash2, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            const data = await res.json();
            setCategories(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        // Validate password by sending a dummy save with empty data
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, data: [] }),
            });

            if (res.ok) {
                setIsAuthenticated(true);
            } else {
                alert('סיסמה שגויה!');
            }
        } catch (error) {
            alert('שגיאה בהתחברות');
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, data: categories }),
            });

            if (res.ok) {
                alert('השינויים נשמרו בהצלחה! ✅');
            } else {
                alert('שגיאה בשמירה');
            }
        } catch (error) {
            alert('שגיאה בשמירה');
        } finally {
            setSaving(false);
        }
    };

    const updateCategory = (catIndex: number, field: string, value: string) => {
        const newCategories = [...categories];
        newCategories[catIndex] = { ...newCategories[catIndex], [field]: value };
        setCategories(newCategories);
    };

    const updateService = (catIndex: number, serviceIndex: number, field: string, value: string) => {
        const newCategories = [...categories];
        newCategories[catIndex].services[serviceIndex] = {
            ...newCategories[catIndex].services[serviceIndex],
            [field]: value,
        };
        setCategories(newCategories);
    };

    const addService = (catIndex: number) => {
        const newCategories = [...categories];
        newCategories[catIndex].services.push({
            id: `service-${Date.now()}`,
            name: 'שירות חדש',
            explanation: 'הסבר ללקוח',
            technical: 'מפרט טכני',
            price: '₪0',
        });
        setCategories(newCategories);
    };

    const deleteService = (catIndex: number, serviceIndex: number) => {
        if (confirm('בטוח שרוצה למחוק את השירות?')) {
            const newCategories = [...categories];
            newCategories[catIndex].services.splice(serviceIndex, 1);
            setCategories(newCategories);
        }
    };

    const addCategory = () => {
        setCategories([
            ...categories,
            {
                category: 'קטגוריה חדשה',
                services: [],
            },
        ]);
    };

    const deleteCategory = (catIndex: number) => {
        if (confirm('בטוח שרוצה למחוק את הקטגוריה?')) {
            const newCategories = [...categories];
            newCategories.splice(catIndex, 1);
            setCategories(newCategories);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center p-4" dir="rtl">
                <div className="neo-box bg-white p-8 max-w-md w-full">
                    <h1 className="text-3xl font-black mb-6 text-center">🔒 כניסת מנהל</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                        placeholder="הזן סיסמה"
                        className="neo-input mb-4"
                    />
                    <button onClick={handleLogin} className="neo-button w-full">
                        כניסה
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <p className="text-2xl font-bold">טוען...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 md:p-8" dir="rtl">
            {/* Header */}
            <div className="neo-box bg-white p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.push('/')}
                        className="neo-button bg-gray-500 flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        חזרה לאתר
                    </button>
                    <h1 className="text-3xl md:text-4xl font-black">⚙️ ניהול מחירון</h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="neo-button bg-green-500 flex items-center gap-2"
                >
                    <Save size={20} />
                    {saving ? 'שומר...' : 'שמור שינויים'}
                </button>
            </div>

            {/* Floating Save Button */}
            <button
                onClick={handleSave}
                disabled={saving}
                className="fixed bottom-8 left-8 z-50 neo-button bg-green-500 flex items-center gap-2 shadow-2xl scale-110 hover:scale-125 transition-transform"
                title="שמור שינויים"
            >
                <Save size={24} />
                {saving ? 'שומר...' : 'שמור'}
            </button>

            {/* Categories */}
            <div className="space-y-8">
                {categories.map((cat, catIndex) => (
                    <div key={catIndex} className="neo-box bg-white p-6">
                        {/* Category Header */}
                        <div className="flex items-center gap-4 mb-6">
                            <input
                                type="text"
                                value={cat.category}
                                onChange={(e) => updateCategory(catIndex, 'category', e.target.value)}
                                className="neo-input flex-1 text-2xl font-bold"
                            />
                            <button
                                onClick={() => addService(catIndex)}
                                className="neo-button bg-blue-500 flex items-center gap-2"
                            >
                                <Plus size={20} />
                                שירות חדש
                            </button>
                            <button
                                onClick={() => deleteCategory(catIndex)}
                                className="neo-button bg-red-500"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>

                        {/* Services */}
                        <div className="space-y-4">
                            {cat.services.map((service, serviceIndex) => (
                                <div key={service.id} className="border-2 border-black p-4 bg-gray-50">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-lg font-bold">שירות #{serviceIndex + 1}</h3>
                                        <button
                                            onClick={() => deleteService(catIndex, serviceIndex)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>

                                    <div className="grid gap-4">
                                        <div>
                                            <label className="block font-bold mb-1 text-sm">שם השירות:</label>
                                            <input
                                                type="text"
                                                value={service.name}
                                                onChange={(e) => updateService(catIndex, serviceIndex, 'name', e.target.value)}
                                                className="neo-input"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-bold mb-1 text-sm">הסבר ללקוח:</label>
                                            <textarea
                                                value={service.explanation}
                                                onChange={(e) => updateService(catIndex, serviceIndex, 'explanation', e.target.value)}
                                                className="neo-input min-h-[80px]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-bold mb-1 text-sm">מפרט טכני:</label>
                                            <textarea
                                                value={service.technical}
                                                onChange={(e) => updateService(catIndex, serviceIndex, 'technical', e.target.value)}
                                                className="neo-input min-h-[80px]"
                                            />
                                        </div>

                                        <div>
                                            <label className="block font-bold mb-1 text-sm">מחיר:</label>
                                            <input
                                                type="text"
                                                value={service.price}
                                                onChange={(e) => updateService(catIndex, serviceIndex, 'price', e.target.value)}
                                                className="neo-input"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Category Button */}
            <div className="mt-8">
                <button
                    onClick={addCategory}
                    className="neo-button bg-purple-500 w-full flex items-center justify-center gap-2 text-xl py-4"
                >
                    <Plus size={24} />
                    הוסף קטגוריה חדשה
                </button>
            </div>
        </div>
    );
}
