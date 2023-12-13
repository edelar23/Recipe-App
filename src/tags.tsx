// DietaryTags.tsx
import React, { useState, ChangeEvent } from 'react';

interface DietaryTagsProps {
  onTagsChange: (tags: string[]) => void;
}

export const DietaryTagsDropdown: React.FC<DietaryTagsProps> = ({ onTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Protein', 'Mediterranean', 'Low-Carb', 'Low-Fat', 'Intermittent Fasting',
                          'Ketogenic', 'Low-Sodium', 'Low-Sugar'];

  const handleTagChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTag = event.target.value;

    if (!selectedTags.includes(selectedTag)) {
      setSelectedTags([...selectedTags, selectedTag]);
      // Call the onTagsChange function to lift state up to the parent
      onTagsChange([...selectedTags, selectedTag]);
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = selectedTags.filter((tag) => tag !== tagToRemove);
    setSelectedTags(updatedTags);
    // Call the onTagsChange function to lift state up to the parent
    onTagsChange(updatedTags);
  };

  return (
    <div className='tags'>
      <div className='selectedT'>
        <label htmlFor="tags">Add Tags</label>
        <select
          className='boxT'
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
      </div>
      <div className='selectedT'>
        <label htmlFor="tags">Selected Tags</label>
        <div className="selected-tags-container">
          <div className="selected-tags-list">
            <ul>
              {selectedTags.map((tag) => (
                <li className='listT' key={tag}>
                  {tag}{' '}
                  <button onClick={() => handleRemoveTag(tag)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
