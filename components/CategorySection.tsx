import React from 'react';
import ServiceCard from './ServiceCard';

interface Service {
    id: string;
    name: string;
    explanation: string;
    technical: string;
    price: string;
}

interface CategorySectionProps {
    category: string;
    services: Service[];
    colorIndex: number;
}

const colorMap: Record<number, { from: string; to: string }> = {
    0: { from: '#ef4444', to: '#dc2626' }, // red
    1: { from: '#3b82f6', to: '#2563eb' }, // blue
    2: { from: '#22c55e', to: '#16a34a' }, // green
    3: { from: '#a855f7', to: '#9333ea' }, // purple
    4: { from: '#ec4899', to: '#db2777' }, // pink
    5: { from: '#f97316', to: '#ea580c' }, // orange
};

const colors = ['red', 'blue', 'green', 'purple', 'pink', 'orange'];

export default function CategorySection({ category, services, colorIndex }: CategorySectionProps) {
    const color = colors[colorIndex % colors.length];
    const gradient = colorMap[colorIndex % 6];

    return (
        <section className="mb-12">
            <div
                className="neo-box p-6 mb-6"
                style={{
                    background: `linear-gradient(to right, ${gradient.from}, ${gradient.to})`
                }}
            >
                <h2 className="text-3xl md:text-4xl font-black text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    {category}
                </h2>
            </div>
            <div className="space-y-4">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        name={service.name}
                        explanation={service.explanation}
                        technical={service.technical}
                        price={service.price}
                        color={color}
                    />
                ))}
            </div>
        </section>
    );
}
