import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function GET(request, { params }) {
  try {
    const { id } = params;

    // Get the initial block children
    const blocks = await notion.blocks.children.list({
      block_id: id,
      page_size: 100,
    });

    // For each block that might have children (like toggle blocks), fetch their children
    const blocksWithChildren = await Promise.all(
      blocks.results.map(async (block) => {
        if (block.has_children) {
          const children = await notion.blocks.children.list({
            block_id: block.id,
            page_size: 100,
          });
          return { ...block, children: children.results };
        }
        return block;
      })
    );

    return NextResponse.json({ results: blocksWithChildren });
  } catch (error) {
    console.error('Error fetching Notion content:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion content' },
      { status: 500 }
    );
  }
}
