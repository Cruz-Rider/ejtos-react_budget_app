import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { dispatch, currencies } = useContext(AppContext);
    const [newCurrency, setCurrency] =useState('£');

    const handleCurrencyChange = (event) => {
        const selectedCurrency = event.target.value; // Get the selected currency
        setCurrency(selectedCurrency);
        dispatch({
            type: 'CHG_CURRENCY',
            payload: selectedCurrency, // Pass the selected currency as payload
        });
    };

    return (
        <div class="dropdown">
            <button class="btn btn-success dropdown-toggle" 
                    type="button" 
                    data-bs-toggle="dropdown" 
                    aria-expanded="false">
                Currency ({newCurrency})
            </button>
            <ul class="dropdown-menu">
                {currencies.map((currency) =>(
                <li><button class="dropdown-item" 
                            type="button"
                            key="{currency.id}"
                            onClick={() => handleCurrencyChange({ target: { value: currency.symbol } })}
                            >{currency.symbol} {currency.name}</button></li> 
                ))}
            </ul>
        </div>
    );
};

export default Currency;
