// IngredientInput.tsx
import React, { useState, ChangeEvent } from 'react';

interface IngredientInputProps {
  onIngredientChange: (ingredients: string[]) => void;
}

const IngredientInput: React.FC<IngredientInputProps> = ({ onIngredientChange }) => {
  const [ingredient, setIngredient] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIngredient(event.target.value);
  };

  const handleAddIngredient = (event: React.FormEvent) => {
    event.preventDefault();
    if (ingredient.trim() !== '' && !selectedIngredients.includes(ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
      onIngredientChange([...selectedIngredients, ingredient]);
      setIngredient('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddIngredient(event as React.FormEvent);
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    const updatedIngredients = selectedIngredients.filter(
      (ing) => ing !== ingredientToRemove
    );
    setSelectedIngredients(updatedIngredients);
    onIngredientChange(updatedIngredients);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', height: '150px' }}>
      <div style={{ marginRight: '10px' }}>
        <label htmlFor="ingredient">Add Ingredient</label>
        <input
          type="text"
          id="ingredient"
          name="ingredient"
          value={ingredient}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleAddIngredient}>Add</button>
      </div>
      <div className="selected-ingredients-container" style={{ maxHeight: '150px', overflowY: 'auto' }}>
        <label htmlFor="selectedIngredients">Selected Ingredients</label>
        <div className="selected-ingredients-list">
          <ul>
            {selectedIngredients.map((ing) => (
              <li className='listT' key={ing}>
                {ing}{' '}
                <button onClick={() => handleRemoveIngredient(ing)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientInput;
