import { Client } from '@notionhq/client';

let notionClient = null;

export const initNotionClient = (token) => {
  notionClient = new Client({
    auth: token,
  });
};

export const getPageContent = async (pageId) => {
  if (!notionClient) {
    throw new Error('Notion client not initialized. Call initNotionClient first.');
  }

  try {
    // Get the page content
    const blocks = await notionClient.blocks.children.list({
      block_id: pageId,
    });

    // Process the blocks to extract text content
    const content = processBlocks(blocks.results);
    return content;
  } catch (error) {
    console.error('Error fetching Notion content:', error);
    throw error;
  }
};

const processBlocks = (blocks) => {
  return blocks.map(block => {
    switch (block.type) {
      case 'paragraph':
        return {
          type: 'paragraph',
          content: block.paragraph.rich_text.map(text => text.plain_text).join(''),
        };
      case 'heading_1':
        return {
          type: 'heading_1',
          content: block.heading_1.rich_text.map(text => text.plain_text).join(''),
        };
      case 'heading_2':
        return {
          type: 'heading_2',
          content: block.heading_2.rich_text.map(text => text.plain_text).join(''),
        };
      case 'heading_3':
        return {
          type: 'heading_3',
          content: block.heading_3.rich_text.map(text => text.plain_text).join(''),
        };
      case 'bulleted_list_item':
        return {
          type: 'bullet',
          content: block.bulleted_list_item.rich_text.map(text => text.plain_text).join(''),
        };
      case 'numbered_list_item':
        return {
          type: 'number',
          content: block.numbered_list_item.rich_text.map(text => text.plain_text).join(''),
        };
      case 'image':
        return {
          type: 'image',
          url: block.image.file?.url || block.image.external?.url,
          caption: block.image.caption?.map(text => text.plain_text).join('') || '',
        };
      default:
        return null;
    }
  }).filter(Boolean);
};

export const getDatabaseContent = async (databaseId) => {
  if (!notionClient) {
    throw new Error('Notion client not initialized. Call initNotionClient first.');
  }

  try {
    const response = await notionClient.databases.query({
      database_id: databaseId,
    });

    return response.results;
  } catch (error) {
    console.error('Error fetching Notion database:', error);
    throw error;
  }
};
