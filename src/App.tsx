// src/App.tsx
import React, { useState, useEffect } from 'react';
import WysiwygEditor from './components/WysiwygEditor';

const App: React.FC = () => {
    const [content, setContent] = useState(''); // Initialize with some default HTML content

    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const marginStyle = {
        margin: isSmallScreen ? '10px 20px' : '10px 200px',
    };

    return (
        <div style={marginStyle}>
            <h1 style={{textAlign: 'center', color: '#4d4db5'}}>WYSIWYG Editor</h1>
            
            {/* Controlled Mode */}
            <h2 style={{color:'#6d6df7'}}>Controlled Mode</h2>
            <WysiwygEditor value={content} onChange={setContent} />
            <div>
                <h3 style={{color:'#8a8ad3'}}>Editor Content:</h3>
                <div style={{    
                    border: '1px solid #8a8ad3',
                    borderRadius: '4px',
                    padding: '14px',
                    }} dangerouslySetInnerHTML={{ __html: content }} /> {/* Render HTML safely */}
            </div>

            {/* Uncontrolled Mode */}
            <h2 style={{color:'#6d6df7'}}>Uncontrolled Mode</h2>
            <WysiwygEditor />
        </div>
    );
};

export default App;
