import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
    const { dispatch } = useContext(AppContext);
    const { selectedCurrency } = useContext(AppContext);
    const { expenses } = useContext(AppContext); // Get expenses for totalExpenses calculation
    const totalExpenses = expenses.reduce((total, item) => total + item.cost, 0); // Calculate total expenses

    const [budget, setBudget] = useState('');

    const checkBudget = (event) => {
        const newBudget = parseInt(event.target.value);

        if (newBudget < totalExpenses || newBudget > 20000) {
            let alertMessage = '';

            if (newBudget < totalExpenses) {
                alertMessage = `The Budget cannot be set lower than total expenses: ${totalExpenses}`;
            } else {
                alertMessage = 'The Budget should not exceed 20,000';
            }

            alert(alertMessage);
            setBudget(''); // Clear the input
        } else {
            dispatch({
                type: 'SET_BUDGET',
                payload: newBudget,
            });
            setBudget(newBudget); // Update local state
        }
    };

    return (
        <div className="alert alert-secondary">
            <span>Budget:{selectedCurrency} 
                <input
                    required="required"
                    type="number"
                    id="budget"
                    value={budget}
                    style={{ marginLeft: '2rem', size: 10 }}
                    max="20000"
                    min={totalExpenses}
                    onChange={(e) => setBudget(parseInt(e.target.value))}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            checkBudget(e);
                        }
                    }}
                />
            </span>
        </div>
    );
};

export default Budget;
