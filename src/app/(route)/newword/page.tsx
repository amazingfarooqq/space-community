"use client"

import axios from 'axios';
import React, { useState, useEffect } from 'react';

const RandomVocabWords: React.FC = () => {
  const [vocabData, setVocabData] = useState<any>(null);

  useEffect(() => {
    const fetchRandomWord = async () => {
      try {
        const res = await axios.get("https://api.dictionaryapi.dev/api/v2/entries/en/happy");
        setVocabData(res.data[0]);
      } catch (error) {
        console.error('Error fetching vocabulary word:', error);
      }
    };

    fetchRandomWord();
  }, []);

  return (
    <div className="random-vocab-words p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Random Vocabulary Word</h2>
      {vocabData && (
        <div>
          <h3 className="text-lg font-medium">{vocabData.word}</h3>
          <p className="text-gray-600 mb-2">{vocabData.meanings[0].definition}</p>

          {/* Synonyms */}
          {vocabData.meanings[0].synonyms.length > 0 && (
            <div className="mb-2">
              <strong>Synonyms:</strong> {vocabData.meanings[0].synonyms.join(', ')}
            </div>
          )}

          {/* Antonyms */}
          {vocabData.meanings[0].antonyms.length > 0 && (
            <div className="mb-2">
              <strong>Antonyms:</strong> {vocabData.meanings[0].antonyms.join(', ')}
            </div>
          )}

          {/* Phonetics */}
          <div className="mb-2">
            <strong>Phonetics:</strong>
            {vocabData.phonetics.map((phonetic: any, index: number) => (
              <div key={index} className="ml-2">
                <span className="text-gray-600">{phonetic.text}</span> -{' '}
                <a href={phonetic.audio} target="_blank" rel="noopener noreferrer" className="">
                  Listen
                </a>
              </div>
            ))}
          </div>

          {/* Source URL */}
          <p className="text-sm">
            <a href={vocabData.sourceUrls[0]} target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default RandomVocabWords;

