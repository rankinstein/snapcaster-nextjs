
import React, { useState } from 'react';

const TabbedContent = (props) => {
    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    return (
      <div className="rounded-lg">
        <div className="flex justify-center">
          <button
            className={`bg-gray-100 dark:bg-gray-400 py-2 px-4 rounded-lg mr-2 ${activeTab === 'tab1' ? 'bg-indigo-500 dark:bg-indigo-500 text-white' : ''}`}
            onClick={() => handleTabClick('tab1')}
          >
            Graph
          </button>
          <button
            className={`bg-gray-100 dark:bg-gray-400 py-2 px-4 rounded-lg ${activeTab === 'tab2' ? 'bg-indigo-500 dark:bg-indigo-500 text-white' : ''}`}
            onClick={() => handleTabClick('tab2')}
          >
            Entries
          </button>
        </div>
        <div className="mt-4">
          {activeTab === 'tab1' && props.children[0]}
          {activeTab === 'tab2' && props.children[1]}
        </div>
      </div>
    );
  };
  
  export default TabbedContent;
