"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export type CurrencyCode = "USD" | "EUR" | "GBP" | "JPY" | "INR" | "AUD" | "CAD" | "SGD" | "HKD" | "MXN" | "BRL" | "ZAR" | "CHF" | "CNY" | "SEK" | "NZD" | "KRW" | "NOK" | "RUB";

export type CurrencyConfig = {
    code: CurrencyCode;
    symbol: string;
    name: string;
    locale: string;
};

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
    USD: { code: "USD", symbol: "$", name: "US Dollar", locale: "en-US" },
    EUR: { code: "EUR", symbol: "€", name: "Euro", locale: "de-DE" },
    GBP: { code: "GBP", symbol: "£", name: "British Pound", locale: "en-GB" },
    JPY: { code: "JPY", symbol: "¥", name: "Japanese Yen", locale: "ja-JP" },
    INR: { code: "INR", symbol: "₹", name: "Indian Rupee", locale: "en-IN" },
    AUD: { code: "AUD", symbol: "A$", name: "Australian Dollar", locale: "en-AU" },
    CAD: { code: "CAD", symbol: "C$", name: "Canadian Dollar", locale: "en-CA" },
    SGD: { code: "SGD", symbol: "S$", name: "Singapore Dollar", locale: "en-SG" },
    HKD: { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar", locale: "en-HK" },
    MXN: { code: "MXN", symbol: "Mex$", name: "Mexican Peso", locale: "es-MX" },
    BRL: { code: "BRL", symbol: "R$", name: "Brazilian Real", locale: "pt-BR" },
    ZAR: { code: "ZAR", symbol: "R", name: "South African Rand", locale: "en-ZA" },
    CHF: { code: "CHF", symbol: "CHF", name: "Swiss Franc", locale: "de-CH" },
    CNY: { code: "CNY", symbol: "¥", name: "Chinese Yuan", locale: "zh-CN" },
    SEK: { code: "SEK", symbol: "kr", name: "Swedish Krona", locale: "sv-SE" },
    NZD: { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar", locale: "en-NZ" },
    KRW: { code: "KRW", symbol: "₩", name: "South Korean Won", locale: "ko-KR" },
    NOK: { code: "NOK", symbol: "kr", name: "Norwegian Krone", locale: "nb-NO" },
    RUB: { code: "RUB", symbol: "₽", name: "Russian Ruble", locale: "ru-RU" },
};

type SettingsState = {
    selectedCurrency: CurrencyCode;
    theme: "light" | "dark" | "system";
    language: string;
    dateFormat: string;
};

const STORAGE_KEY = "settings_mvp_state_v1";

const INITIAL_STATE: SettingsState = {
    selectedCurrency: "USD",
    theme: "system",
    language: "en-us",
    dateFormat: "mdy",
};

type SettingsMvpContextValue = {
    isLoading: boolean;
    selectedCurrency: CurrencyCode;
    currencyConfig: CurrencyConfig;
    theme: "light" | "dark" | "system";
    language: string;
    dateFormat: string;
    updateCurrency: (currency: CurrencyCode) => void;
    updateTheme: (theme: "light" | "dark" | "system") => void;
    updateLanguage: (language: string) => void;
    updateDateFormat: (format: string) => void;
    formatCurrency: (value: number, type?: "credit" | "debit") => string;
};

const SettingsMvpContext = createContext<SettingsMvpContextValue | undefined>(undefined);

function getInitialState(): SettingsState {
    if (typeof window === "undefined") return INITIAL_STATE;
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return INITIAL_STATE;
        const parsed = JSON.parse(raw) as SettingsState;
        return parsed;
    } catch {
        return INITIAL_STATE;
    }
}

export function SettingsMvpProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<SettingsState>(getInitialState);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 300);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    const currencyConfig = CURRENCIES[state.selectedCurrency];

    const formatCurrency = (value: number, type?: "credit" | "debit") => {
        const isNegative = type === "debit" || value < 0;
        const absValue = Math.abs(value);
        
        const formatted = absValue.toLocaleString(currencyConfig.locale, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });

        const prefix = isNegative ? "-" : "+";
        return `${prefix}${currencyConfig.symbol}${formatted}`;
    };

    const updateCurrency = (currency: CurrencyCode) => {
        setState((current) => ({ ...current, selectedCurrency: currency }));
    };

    const updateTheme = (theme: "light" | "dark" | "system") => {
        setState((current) => ({ ...current, theme }));
    };

    const updateLanguage = (language: string) => {
        setState((current) => ({ ...current, language }));
    };

    const updateDateFormat = (format: string) => {
        setState((current) => ({ ...current, dateFormat: format }));
    };

    return (
        <SettingsMvpContext.Provider
            value={{
                isLoading,
                selectedCurrency: state.selectedCurrency,
                currencyConfig,
                theme: state.theme,
                language: state.language,
                dateFormat: state.dateFormat,
                updateCurrency,
                updateTheme,
                updateLanguage,
                updateDateFormat,
                formatCurrency,
            }}
        >
            {children}
        </SettingsMvpContext.Provider>
    );
}

export function useSettingsMvp() {
    const context = useContext(SettingsMvpContext);
    if (!context) {
        throw new Error("useSettingsMvp must be used within a SettingsMvpProvider");
    }
    return context;
}
