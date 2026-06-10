import React from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Globe } from 'lucide-react';

const CurrencySwitcher = ({ className = "" }) => {
    const { currency, setCurrency, symbols } = useCurrency();

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <Globe size={14} className="text-slate-400" />
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent border-none font-black text-[10px] uppercase tracking-widest text-slate-400 focus:ring-0 outline-none cursor-pointer hover:text-primary transition-colors"
            >
                {Object.keys(symbols).map(curr => (
                    <option key={curr} value={curr} className="bg-white text-slate-900">{curr}</option>
                ))}
            </select>
        </div>
    );
};

export default CurrencySwitcher;
