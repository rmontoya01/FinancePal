import React, { useState } from 'react';

const Converter = () => {
    const [amount, setAmount] = useState('');
    const [convertedAmount, setConvertedAmount] = useState('');
    const [targetCurrency, setTargetCurrency] = useState('EUR');

    /**
     * Here is the current list of currencies that can be converted from USD.
     *  USD - United States Dollar
     *  EUR - Euro
     *  GBP - British Pound Sterling
     *  JPY - Japanese Yen
     *  AUD - Australian Dollar
     *  CAD - Canadian Dollar
     *  CHF - Swiss Franc
     *  CNY - Chinese Yuan
     *  SEK - Swedish Krona
     *  NZD - New Zealand Dollar
     *  INR - Indian Rupee
     *  BRL - Brazilian Real
     *  ZAR - South African Rand
     *  RUB - Russian Ruble
     *  MXN - Mexican Peso
     *  SGD - Singapore Dollar
     *  HKD - Hong Kong Dollar
     *  NOK - Norwegian Krone
     *  KRW - South Korean Won
     *  TRY - Turkish Lira
     *  MYR - Malaysian Ringgit
     *  THB - Thai Baht
     *  IDR - Indonesian Rupiah
     *  PHP - Philippine Peso
     *  VND - Vietnamese Dong
     *  SAR - Saudi Riyal
     *  AED - United Arab Emirates Dirham
     *  PLN - Polish Zloty
     *  CZK - Czech Koruna
     *  HUF - Hungarian Forint
     *  DKK - Danish Krone
     *  ILS - Israeli Shekel
     *  CLP - Chilean Peso
     *  COP - Colombian Peso
     *  PEN - Peruvian Sol
     *  ARS - Argentine Peso
     *  EGP - Egyptian Pound
     *  NGN - Nigerian Naira
     *  KES - Kenyan Shilling
     *  GHS - Ghanaian Cedi
     *  BDT - Bangladeshi Taka
     *  PKR - Pakistani Rupee
     *  LKR - Sri Lankan Rupee
     *  BHD - Bahraini Dinar
     *  OMR - Omani Rial
     *  QAR - Qatari Riyal
     *  KWD - Kuwaiti Dinar
     *  BGN - Bulgarian Lev
     *  RON - Romanian Leu
     *  HRK - Croatian Kuna
     *  ISK - Icelandic Krona
     *  JOD - Jordanian Dinar
     *  MAD - Moroccan Dirham
     *  TWD - New Taiwan Dollar
     *  UAH - Ukrainian Hryvnia
     *  BOB - Bolivian Boliviano
     *  CRC - Costa Rican Colón
     *  DOP - Dominican Peso
     *  FJD - Fijian Dollar
     *  GTQ - Guatemalan Quetzal
     *  HNL - Honduran Lempira
     *  JMD - Jamaican Dollar
     *  MUR - Mauritian Rupee
     *  NPR - Nepalese Rupee
     *  PYG - Paraguayan Guarani
     *  SVC - Salvadoran Colón
     *  UYU - Uruguayan Peso
     *  VEF - Venezuelan Bolívar
     *  XOF - West African CFA Franc
     *  XAF - Central African CFA Franc
     *  XCD - East Caribbean Dollar
     *  XPF - CFP Franc
     *  ZMW - Zambian Kwacha
     */
    const exchangeRates: { [key: string]: number } = {
        USD: 1,
        EUR: 0.85,
        GBP: 0.75,
        JPY: 110,
        AUD: 1.3,
        CAD: 1.25,
        CHF: 0.92,
        CNY: 6.45,
        SEK: 8.6,
        NZD: 1.4,
        INR: 74.5,
        BRL: 5.2,
        ZAR: 14.7,
        RUB: 73.5,
        MXN: 20.1,
        SGD: 1.35,
        HKD: 7.8,
        NOK: 8.9,
        KRW: 1180,
        TRY: 8.5,
        MYR: 4.15,
        THB: 33.5,
        IDR: 14200,
        PHP: 50.5,
        VND: 23000,
        SAR: 3.75,
        AED: 3.67,
        PLN: 3.9,
        CZK: 21.5,
        HUF: 310,
        DKK: 6.3,
        ILS: 3.2,
        CLP: 780,
        COP: 3800,
        PEN: 4.1,
        ARS: 98,
        EGP: 15.7,
        NGN: 410,
        KES: 110,
        GHS: 6,
        BDT: 85,
        PKR: 170,
        LKR: 200,
        BHD: 0.38,
        OMR: 0.39,
        QAR: 3.64,
        KWD: 0.30,
        BGN: 1.66,
        RON: 4.1,
        HRK: 6.3,
        ISK: 125,
        JOD: 0.71,
        MAD: 9.0,
        TWD: 28,
        UAH: 27,
        BOB: 6.9,
        CRC: 620,
        DOP: 57,
        FJD: 2.1,
        GTQ: 7.7,
        HNL: 24,
        JMD: 150,
        MUR: 42,
        NPR: 118,
        PYG: 6900,
        SVC: 8.75,
        UYU: 43,
        VEF: 248487,
        XOF: 555,
        XAF: 555,
        XCD: 2.7,
        XPF: 100,
        ZMW: 22,
    };

    const handleConvert = () => {
        const value = parseFloat(amount);
        if (!isNaN(value)) {
            const rate = exchangeRates[targetCurrency];
            const convertedValue = value * rate;
            setConvertedAmount(currencyFormat(convertedValue, targetCurrency));
        } else {
            setConvertedAmount('Invalid input');
        }
    };

    return (
        <div>
            <h1>Currency Converter</h1>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount in USD"
            />
            <select
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
            >
                {Object.keys(exchangeRates).map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <button onClick={handleConvert}>Convert</button>
            <div>
                <h2>Converted Amount:</h2>
                <p>{convertedAmount}</p>
            </div>
        </div>
    );
};

export default Converter;

function currencyFormat(num: number, currency: string) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(num);
}