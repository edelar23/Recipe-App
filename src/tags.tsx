// DietaryTags.tsx
import React, { useState, ChangeEvent } from 'react';

export const DietaryTagsDropdown: React.FC = () => {
  console.log('DietaryTagsDropdown is rendering...');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free'];

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;

    if (!selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
  };

  return (
    <div className="tags">
      <select
        id="tags"
        name="tags"
        multiple
        value={selectedTags}
        onChange={handleTagChange}
      >
        {availableTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      <div>
        <h4>Selected Tags:</h4>
        <ul>
          {selectedTags.map((tag) => (
            <li key={tag}>
              {tag} <button onClick={() => handleRemoveTag(tag)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
