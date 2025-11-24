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

const colors = ['red', 'blue', 'green', 'purple', 'pink', 'orange'];

export default function CategorySection({ category, services, colorIndex }: CategorySectionProps) {
    const color = colors[colorIndex % colors.length];

    return (
        <section className="mb-12">
            <div className={`neo-box bg-gradient-to-r from-${color}-400 to-${color}-500 p-6 mb-6`}>
                <h2 className="text-3xl md:text-4xl font-black text-black">{category}</h2>
            </div>
            <div className="space-y-4">
                {services.map((service, idx) => (
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
