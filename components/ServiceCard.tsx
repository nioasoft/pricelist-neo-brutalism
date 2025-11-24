import React from 'react';

interface ServiceCardProps {
    name: string;
    explanation: string;
    technical: string;
    price: string;
    color: string;
}

export default function ServiceCard({ name, explanation, technical, price, color }: ServiceCardProps) {
    // Split price into main price and notes
    const priceMatch = price.match(/^(.*?)(\s*\(.*?\)|\s+(?:חודשי|לחודש|הקמה|לשעה|למאמר\/דף|לפרויקט).*?)$/);
    const mainPrice = priceMatch ? priceMatch[1].trim() : price;
    const priceNote = priceMatch && priceMatch[2] ? priceMatch[2].trim() : '';

    // Determine if the price is long (for font sizing)
    const isLongPrice = mainPrice.length > 20;

    return (
        <div className={`neo-box p-6 mb-4 bg-${color}-50 hover:bg-${color}-100`}>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-black">{name}</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="font-bold text-sm text-gray-700 mb-1">💡 הערך העסקי:</p>
                            <p className="text-gray-800 leading-relaxed">{explanation}</p>
                        </div>
                        <div>
                            <p className="font-bold text-sm text-gray-700 mb-1">⚙️ טכני:</p>
                            <p className="text-gray-600 text-sm leading-relaxed">{technical}</p>
                        </div>
                    </div>
                </div>
                <div className="md:w-64 w-full flex-shrink-0">
                    <div className="neo-box bg-yellow-300 p-4 text-center min-h-[60px] flex items-center justify-center">
                        <p className={`font-bold text-black ${isLongPrice ? 'text-sm md:text-base' : 'text-lg md:text-xl'} leading-tight`}>
                            {mainPrice}
                        </p>
                    </div>
                    {priceNote && (
                        <p className="text-center text-sm text-gray-600 mt-2 font-medium">{priceNote}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
