import React, { useState } from 'react';
import { CreditCard, X, Lock, Check, AlertCircle } from 'lucide-react';
import PriceDisplay from './PriceDisplay';

const PaymentModal = ({ isOpen, onClose, bookingDetails, onPaymentComplete }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [processing, setProcessing] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardNumber: '',
        cardName: '',
        expiryDate: '',
        cvv: ''
    });
    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors = {};

        if (paymentMethod === 'credit_card' || paymentMethod === 'debit_card') {
            if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
                newErrors.cardNumber = 'Invalid card number';
            }
            if (!formData.cardName || formData.cardName.length < 3) {
                newErrors.cardName = 'Cardholder name required';
            }
            if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
                newErrors.expiryDate = 'Invalid expiry (MM/YY)';
            }
            if (!formData.cvv || formData.cvv.length !== 3) {
                newErrors.cvv = 'Invalid CVV';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiry = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + '/' + v.substring(2, 4);
        }
        return v;
    };

    const handleInputChange = (field, value) => {
        let formattedValue = value;

        if (field === 'cardNumber') {
            formattedValue = formatCardNumber(value);
        } else if (field === 'expiryDate') {
            formattedValue = formatExpiry(value);
        } else if (field === 'cvv') {
            formattedValue = value.replace(/[^0-9]/gi, '').substring(0, 3);
        }

        setFormData(prev => ({ ...prev, [field]: formattedValue }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setProcessing(true);

        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Generate transaction ID
        const transactionId = 'TXN-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        setProcessing(false);
        setPaymentSuccess(true);

        // Wait for success animation
        setTimeout(() => {
            onPaymentComplete({
                payment_status: 'completed',
                payment_method: paymentMethod,
                transaction_id: transactionId,
                payment_date: new Date().toISOString()
            });
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

            <div className="relative glass w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden animate-zoom-in">
                {paymentSuccess ? (
                    <div className="p-12 text-center space-y-6">
                        <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 mx-auto animate-zoom-in">
                            <Check size={48} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Payment Successful!</h3>
                        <p className="text-gray-500 font-medium">Your booking has been confirmed. Redirecting...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-1">Secure Payment</p>
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight">Complete Booking</h3>
                            </div>
                            <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Payment Summary */}
                        <div className="p-6 bg-slate-900 rounded-[2rem] text-white">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">Total Amount</p>
                                    <PriceDisplay amount={bookingDetails?.totalAmount || 0} from="USD" className="text-3xl text-white" />
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-lg">
                                    <Lock size={24} />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method Selection */}
                        <div className="space-y-4">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Payment Method</label>
                            <div className="grid grid-cols-2 gap-4">
                                {[
                                    { id: 'credit_card', label: 'Credit Card' },
                                    { id: 'debit_card', label: 'Debit Card' },
                                    { id: 'paypal', label: 'PayPal' },
                                    { id: 'bank_transfer', label: 'Bank Transfer' }
                                ].map(method => (
                                    <button
                                        key={method.id}
                                        type="button"
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`p-4 rounded-2xl border-2 font-bold text-sm transition-all ${paymentMethod === method.id
                                                ? 'border-primary bg-primary/5 text-primary'
                                                : 'border-slate-200 text-gray-600 hover:border-primary/30'
                                            }`}
                                    >
                                        {method.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card Details (only for card payments) */}
                        {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            className={`w-full bg-slate-50 border-2 ${errors.cardNumber ? 'border-rose-300' : 'border-slate-100'} rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900`}
                                        />
                                        <CreditCard className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                                    </div>
                                    {errors.cardNumber && <p className="text-rose-500 text-xs font-bold flex items-center gap-2"><AlertCircle size={12} /> {errors.cardNumber}</p>}
                                </div>

                                <div className="space-y-4">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Cardholder Name</label>
                                    <input
                                        type="text"
                                        value={formData.cardName}
                                        onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                                        placeholder="JOHN DOE"
                                        className={`w-full bg-slate-50 border-2 ${errors.cardName ? 'border-rose-300' : 'border-slate-100'} rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900`}
                                    />
                                    {errors.cardName && <p className="text-rose-500 text-xs font-bold flex items-center gap-2"><AlertCircle size={12} /> {errors.cardName}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={formData.expiryDate}
                                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className={`w-full bg-slate-50 border-2 ${errors.expiryDate ? 'border-rose-300' : 'border-slate-100'} rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900`}
                                        />
                                        {errors.expiryDate && <p className="text-rose-500 text-xs font-bold flex items-center gap-2"><AlertCircle size={12} /> {errors.expiryDate}</p>}
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest">CVV</label>
                                        <input
                                            type="text"
                                            value={formData.cvv}
                                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                                            placeholder="123"
                                            maxLength="3"
                                            className={`w-full bg-slate-50 border-2 ${errors.cvv ? 'border-rose-300' : 'border-slate-100'} rounded-2xl py-4 px-6 focus:bg-white focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none font-bold text-gray-900`}
                                        />
                                        {errors.cvv && <p className="text-rose-500 text-xs font-bold flex items-center gap-2"><AlertCircle size={12} /> {errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PayPal/Bank Transfer Info */}
                        {paymentMethod === 'paypal' && (
                            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
                                <p className="text-sm font-bold text-blue-900">You will be redirected to PayPal to complete your payment securely.</p>
                            </div>
                        )}

                        {paymentMethod === 'bank_transfer' && (
                            <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100">
                                <p className="text-sm font-bold text-amber-900">Bank transfer details will be sent to your email after confirmation.</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-5 rounded-2xl font-black text-white shadow-xl transition-all flex items-center justify-center gap-3 ${processing
                                    ? 'bg-gray-400 cursor-wait'
                                    : 'bg-primary shadow-primary/20 hover:bg-primary-hover hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Processing Payment...
                                </>
                            ) : (
                                <>
                                    <Lock size={20} />
                                    Pay Securely
                                </>
                            )}
                        </button>

                        <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            🔒 Your payment is secured with 256-bit SSL encryption
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
