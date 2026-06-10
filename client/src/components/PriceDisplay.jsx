import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const PriceDisplay = ({ amount, from = 'LKR', className = "" }) => {
    const { format } = useCurrency();

    return (
        <span className={`font-black tracking-tighter ${className}`}>
            {format(amount, from)}
        </span>
    );
};

export default PriceDisplay;
