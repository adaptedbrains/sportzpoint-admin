"use client";
import { useState } from 'react';
import {
  BlockEditorProvider,
  BlockList,
  BlockTools,
  WritingFlow,
  ObserveTyping,
} from '@wordpress/block-editor';
import { SlotFillProvider, Popover } from '@wordpress/components';
import { registerCoreBlocks } from '@wordpress/block-library';
import '@wordpress/components/build-style/style.css';
import '@wordpress/block-editor/build-style/style.css';
import '@wordpress/block-library/build-style/style.css';
import '@wordpress/block-library/build-style/theme.css';
import '@wordpress/block-library/build-style/editor.css';

// Register the core blocks
registerCoreBlocks();

const GutenbergEditor = ({ content, htmlContentGrab }) => {
  const [blocks, setBlocks] = useState([]);

  const settings = {
    hasFixedToolbar: true,
    focusMode: false,
    hasReducedUI: false,
    canLockBlocks: true,
    keepCaretInsideBlock: false,
  };

  return (
    <div className="gutenberg-editor-container">
      <SlotFillProvider>
        <BlockEditorProvider
          value={blocks}
          onInput={(newBlocks) => {
            setBlocks(newBlocks);
            // Convert blocks to HTML and pass to parent
            const html = wp.blocks.serialize(newBlocks);
            htmlContentGrab(html);
          }}
          onChange={(newBlocks) => {
            setBlocks(newBlocks);
            const html = wp.blocks.serialize(newBlocks);
            htmlContentGrab(html);
          }}
          settings={settings}
        >
          <div className="editor-styles-wrapper">
            <BlockTools>
              <WritingFlow>
                <ObserveTyping>
                  <BlockList />
                </ObserveTyping>
              </WritingFlow>
            </BlockTools>
          </div>
          <Popover.Slot />
        </BlockEditorProvider>
      </SlotFillProvider>

      <style jsx global>{`
        .gutenberg-editor-container {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 0.5rem;
          padding: 1rem;
          min-height: 500px;
        }
        
        .editor-styles-wrapper {
          background: white;
          padding: 1rem;
          border-radius: 0.375rem;
        }

        .block-editor-block-list__layout {
          min-height: 400px;
        }

        .wp-block {
          max-width: 100%;
        }
      `}</style>
    </div>
  );
};

export default GutenbergEditor;
