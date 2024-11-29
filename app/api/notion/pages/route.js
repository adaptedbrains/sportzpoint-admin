import { Client } from '@notionhq/client';
import { NextResponse } from 'next/server';

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function GET() {
  try {
    const response = await notion.search({
      filter: {
        property: 'object',
        value: 'page'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    });

    const pages = response.results.map(page => ({
      id: page.id,
      title: page.properties?.title?.title?.[0]?.plain_text || page.properties?.Name?.title?.[0]?.plain_text || 'Untitled',
      lastEdited: page.last_edited_time,
      url: page.url
    }));

    return NextResponse.json({ pages });
  } catch (error) {
    console.error('Error fetching Notion pages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Notion pages' },
      { status: 500 }
    );
  }
}
