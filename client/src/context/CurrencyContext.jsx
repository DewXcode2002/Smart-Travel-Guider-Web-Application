import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(localStorage.getItem('currency') || 'LKR');

    // Static exchange rates (Base: LKR)
    // In a real app, these could be fetched from an API
    const exchangeRates = {
        LKR: 1,
        USD: 0.0033, // 1 LKR = 0.0033 USD (Example)
        EUR: 0.0031,
        GBP: 0.0026,
        AUD: 0.0051,
        INR: 0.28
    };

    const symbols = {
        LKR: 'Rs.',
        USD: '$',
        EUR: '€',
        GBP: '£',
        AUD: 'A$',
        INR: '₹'
    };

    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    const convert = (amount, from = 'LKR') => {
        if (!amount) return 0;
        // Convert from source to LKR first if not LKR
        const inLKR = from === 'LKR' ? amount : amount / exchangeRates[from];
        // Convert from LKR to target
        return (inLKR * exchangeRates[currency]).toFixed(2);
    };

    const format = (amount, from = 'LKR') => {
        const converted = convert(amount, from);
        return `${symbols[currency]} ${Number(converted).toLocaleString()}`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates, symbols, convert, format }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
    return context;
};
