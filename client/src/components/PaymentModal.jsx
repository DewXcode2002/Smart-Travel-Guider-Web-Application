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

    const amountToDisplay = Number(bookingDetails?.totalAmount) > 0 ? Number(bookingDetails?.totalAmount) : 350;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-md animate-fade-in" onClick={onClose}></div>

            <div className="relative glass w-full max-w-xl my-auto rounded-[2.5rem] shadow-2xl border border-white/60 overflow-hidden animate-zoom-in max-h-[92vh] flex flex-col bg-white/95">
                {paymentSuccess ? (
                    <div className="p-10 text-center space-y-6 my-auto">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-emerald-200 mx-auto animate-zoom-in">
                            <Check size={40} strokeWidth={3} />
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">Payment Successful!</h3>
                        <p className="text-gray-500 font-medium">Your booking has been confirmed. Redirecting to your trips...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                            <div>
                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full">Secure Payment</span>
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mt-2">Complete Reservation</h3>
                            </div>
                            <button type="button" onClick={onClose} className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-gray-500 hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Payment Summary Header Card */}
                        <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 rounded-[2rem] text-white shadow-xl relative overflow-hidden space-y-3">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
                            <div className="flex justify-between items-start relative z-10">
                                <div>
                                    <p className="text-[11px] font-extrabold text-white/50 uppercase tracking-widest mb-1">Total Payable Amount</p>
                                    <PriceDisplay amount={amountToDisplay} from="USD" className="text-3xl sm:text-4xl text-white font-black" />
                                </div>
                                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl border border-white/10 shadow-inner">
                                    <Lock size={22} className="text-emerald-400" />
                                </div>
                            </div>

                            {bookingDetails?.baseAmount && (
                                <div className="pt-2 border-t border-white/10 space-y-1 text-xs text-white/70 font-medium relative z-10">
                                    <div className="flex justify-between">
                                        <span>Trip Experience Total:</span>
                                        <PriceDisplay amount={bookingDetails.baseAmount} from="USD" className="font-bold text-white" />
                                    </div>
                                    <div className="flex justify-between text-emerald-400">
                                        <span>Platform Reservation Guarantee (3%):</span>
                                        <PriceDisplay amount={bookingDetails.platformFee} from="USD" className="font-bold" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Payment Method Selection */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Payment Method</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { id: 'credit_card', label: 'Credit Card', icon: '💳' },
                                    { id: 'debit_card', label: 'Debit Card', icon: '🏦' },
                                    { id: 'paypal', label: 'PayPal', icon: '🅿️' },
                                    { id: 'bank_transfer', label: 'Bank Transfer', icon: '🏛️' }
                                ].map(method => {
                                    const isSelected = paymentMethod === method.id;
                                    return (
                                        <button
                                            key={method.id}
                                            type="button"
                                            onClick={() => setPaymentMethod(method.id)}
                                            className={`p-4 rounded-2xl border-2 font-black text-sm transition-all flex items-center justify-between shadow-sm ${
                                                isSelected
                                                    ? 'border-slate-900 bg-slate-900 text-white shadow-md scale-[1.01]'
                                                    : 'border-slate-200/80 bg-slate-50/80 text-gray-700 hover:border-slate-400 hover:bg-slate-100/60'
                                            }`}
                                        >
                                            <span className="flex items-center gap-2">
                                                <span>{method.icon}</span>
                                                {method.label}
                                            </span>
                                            {isSelected && (
                                                <div className="w-5 h-5 rounded-full bg-emerald-400 text-slate-900 flex items-center justify-center">
                                                    <Check size={12} strokeWidth={3} />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Card Details (only for card payments) */}
                        {(paymentMethod === 'credit_card' || paymentMethod === 'debit_card') && (
                            <div className="space-y-4 pt-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Card Number</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={formData.cardNumber}
                                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                                            placeholder="1234 5678 9012 3456"
                                            maxLength="19"
                                            className={`w-full bg-slate-50/90 border-2 ${errors.cardNumber ? 'border-rose-400' : 'border-slate-200'} rounded-2xl py-3.5 pl-5 pr-12 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none font-bold text-gray-900 text-sm tracking-wider`}
                                        />
                                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    </div>
                                    {errors.cardNumber && <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5 ml-1"><AlertCircle size={12} /> {errors.cardNumber}</p>}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Cardholder Name</label>
                                    <input
                                        type="text"
                                        value={formData.cardName}
                                        onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                                        placeholder="JOHN DOE"
                                        className={`w-full bg-slate-50/90 border-2 ${errors.cardName ? 'border-rose-400' : 'border-slate-200'} rounded-2xl py-3.5 px-5 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none font-bold text-gray-900 text-sm tracking-wide`}
                                    />
                                    {errors.cardName && <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5 ml-1"><AlertCircle size={12} /> {errors.cardName}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Expiry Date</label>
                                        <input
                                            type="text"
                                            value={formData.expiryDate}
                                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className={`w-full bg-slate-50/90 border-2 ${errors.expiryDate ? 'border-rose-400' : 'border-slate-200'} rounded-2xl py-3.5 px-5 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none font-bold text-gray-900 text-sm`}
                                        />
                                        {errors.expiryDate && <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5 ml-1"><AlertCircle size={12} /> {errors.expiryDate}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                                        <input
                                            type="text"
                                            value={formData.cvv}
                                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                                            placeholder="123"
                                            maxLength="3"
                                            className={`w-full bg-slate-50/90 border-2 ${errors.cvv ? 'border-rose-400' : 'border-slate-200'} rounded-2xl py-3.5 px-5 focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-900/5 outline-none font-bold text-gray-900 text-sm`}
                                        />
                                        {errors.cvv && <p className="text-rose-500 text-xs font-bold flex items-center gap-1.5 ml-1"><AlertCircle size={12} /> {errors.cvv}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PayPal/Bank Transfer Info */}
                        {paymentMethod === 'paypal' && (
                            <div className="p-5 bg-blue-50/80 rounded-2xl border border-blue-200 text-blue-900 text-sm font-bold flex items-center gap-3">
                                <span className="text-2xl">🅿️</span>
                                <span>You will be redirected to PayPal to complete your payment securely.</span>
                            </div>
                        )}

                        {paymentMethod === 'bank_transfer' && (
                            <div className="p-5 bg-amber-50/80 rounded-2xl border border-amber-200 text-amber-900 text-sm font-bold flex items-center gap-3">
                                <span className="text-2xl">🏛️</span>
                                <span>Direct bank transfer details will be sent to your registered email address upon confirmation.</span>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={processing}
                                className={`w-full py-4 sm:py-5 rounded-2xl font-black text-white text-base shadow-xl transition-all flex items-center justify-center gap-3 ${
                                    processing
                                        ? 'bg-slate-400 cursor-wait'
                                        : 'bg-gradient-to-r from-primary via-emerald-600 to-teal-600 shadow-primary/25 hover:opacity-95 hover:scale-[1.01] active:scale-[0.99]'
                                }`}
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <Lock size={18} />
                                        Pay Securely
                                    </>
                                )}
                            </button>
                        </div>

                        <p className="text-center text-[11px] font-bold text-gray-400 tracking-wider">
                            🔒 256-Bit Encrypted SSL Secure Checkout
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PaymentModal;
