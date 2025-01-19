import React, { useState, useRef } from 'react';
import { Editor, EditorState, RichUtils, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import 'draft-js/dist/Draft.css';

interface WysiwygEditorProps {
    value?: string; // HTML string to initialize the editor
    onChange?: (content: string) => void; // Callback to send content back to parent
    className?: string; // Custom class name for the main container
    style?: React.CSSProperties; // Custom style for the main container
    renderToolbar?: () => React.ReactNode; // Custom render function for the toolbar
}

const WysiwygEditor: React.FC<WysiwygEditorProps> = ({ value, onChange, className, style, renderToolbar }) => {
    const [editorState, setEditorState] = useState(() => {
        if (value) {
            const blocksFromHTML = convertFromHTML(value);
            return EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML.contentBlocks));
        }
        return EditorState.createEmpty();
    });

    const editor = useRef<typeof Editor | null>(null);

    const focus = () => {
        if (editor.current) {
            editor.current.focus();
        }
    };

    const handleKeyCommand = (command: string) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            handleChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const handleChange = (state: typeof EditorState) => {
        setEditorState(state);
        if (onChange) {
            const contentState = state.getCurrentContent();
            const html = stateToHTML(contentState);
            onChange(html);
        }
    };

    const toggleInlineStyle = (style: string) => {
        handleChange(RichUtils.toggleInlineStyle(editorState, style));
    };

    // Add this function above your component
    const fetchData = async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('<p>This is some <strong>fetched</strong> content.</p>');
            }, 2000);
        });
    };

    // Inside your component, perhaps in a useEffect hook
    React.useEffect(() => {
        const loadContent = async () => {
            const content = await fetchData();
            const blocksFromHTML = convertFromHTML(content);
            setEditorState(EditorState.createWithContent(ContentState.createFromBlockArray(blocksFromHTML.contentBlocks)));
        };

        loadContent();
    }, []);



    return (
        <div className={className} style={style}>
            <div>
                {renderToolbar ? (
                    renderToolbar()
                ) : (
                    <div style={{ marginBottom: '5px' }}>
                        <button
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '0 4px',
                                backgroundColor: 'white',
                                transition: 'background-color 0.2s, color 0.2s',
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                toggleInlineStyle('BOLD');
                            }}
                        >
                            Bold
                        </button>
                        <button
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '0 4px',
                                backgroundColor: 'white',
                                transition: 'background-color 0.2s, color 0.2s',
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                toggleInlineStyle('ITALIC');
                            }}
                        >
                            Italic
                        </button>
                        <button
                            style={{
                                padding: '8px 12px',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                margin: '0 4px',
                                backgroundColor: 'white',
                                transition: 'background-color 0.2s, color 0.2s',
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                toggleInlineStyle('UNDERLINE');
                            }}
                        >
                            Underline
                        </button>
                    </div>
                )}
            </div>
            <div
                style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '8px',
                    minHeight: '80px',
                }}
                onClick={focus}
            >
                <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={handleChange}
                    handleKeyCommand={handleKeyCommand}
                    placeholder="Start typing..."
                />
            </div>
        </div>
    );
};

export default WysiwygEditor;