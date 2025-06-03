import React, { useState } from 'react';
import './GameInfo.css';
import { useNavigate } from 'react-router-dom';

function GameInfo() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0); // default tab pertama aktif

  const sections = [
    {
      title: 'Tentang Game',
      content: 'Algorithmics Universe adalah game edukatif berbasis logika dan pemrograman visual. Pemain akan mengontrol robot kecil untuk menyelesaikan tantangan menggunakan instruksi seperti berjalan, melompat, menyalakan lampu, dan mengulang perintah. Semua aksi dilakukan melalui sistem drag-and-drop layaknya blok pemrograman.'
    },
    {
      title: 'Cara Bermain',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Level dan Tantangan',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi berjalan maju ↑',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi putar ke kiri ↶',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi putar ke kanan ↷',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi melompat ⤒',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi mengulang perintah',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    {
      title: 'Instruksi power ⚠︎',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elite, sed do eiusmod tempor incididunt ut labore dan dolore magna aliqua. Dengan sedikit racun, yang merupakan latihan keras yang tidak bisa dilakukan oleh orang lain sebagai konsekuensinya. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Kecuali sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
  ];

  return (
    <div className="game-info-container">
      <div className="logo">
        <img src="/logo.png" alt="logo-img" />
      </div>

      <button className="close-btn-home" onClick={() => navigate('/')}>🏠︎</button>

      <div className="tab-list">
        {sections.map((section, index) => (
          <button
            key={index}
            className={`tab-button ${activeIndex === index ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="tab-content">
        <h2>{sections[activeIndex].title}</h2>
        <p>{sections[activeIndex].content}</p>
      </div>
    </div>
  );
}

export default GameInfo;
