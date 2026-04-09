import { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'ETH' | 'SOL' | 'USD';

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (c: Currency) => void;
    formatPrice: (ethValue: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
    const [currency, setCurrency] = useState<Currency>('ETH');

    // Conversion rates: 1 ETH = 32 SOL = $2,600
    const ethToSol = 32;
    const ethToUsd = 2600;

    const formatPrice = (ethValue: number): string => {
        if (currency === 'ETH') {
            return `Ξ ${ethValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else if (currency === 'SOL') {
            const solValue = ethValue * ethToSol;
            return `◎ ${solValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        } else {
            const usdValue = ethValue * ethToUsd;
            return `$${usdValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
        }
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error('useCurrency must be used within CurrencyProvider');
    }
    return context;
};
