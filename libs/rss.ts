import fs from 'fs';
import {IndexNode} from "@local-types/index";

const RSS_PATH = './public/rss.xml';

const generateRssItem = (node: IndexNode): string => `
  <item>
    <guid>${node.url}</guid>
    <title>${node.title}</title>
    <link>${node.url}</link>
    <description>${node.excerpt}</description>
    <pubDate>${node.lastUpdatedUTC}</pubDate>
  </item>
`;

export default (paths: Array<IndexNode>): void => {
    if (fs.existsSync(RSS_PATH)) {
        fs.unlinkSync(RSS_PATH);
    }
    const stream = fs.createWriteStream(RSS_PATH, { flags: 'a' });
    const title = 'Thiago Mello - Articles, thoughts, discoveries on software development and other random stuff'
    stream.write(`<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${title}</title>
      <link>${process.env.NEXT_PUBLIC_DOMAIN}</link>
      <description>${title}</description>
      <language>en</language>
      <lastBuildDate>${paths.length > 0 ? paths[0].lastUpdatedUTC : ''}</lastBuildDate>
      <atom:link href="${process.env.NEXT_PUBLIC_DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>
      ${paths.map(generateRssItem).join('')}
    </channel>
  </rss>`);
    stream.end();
};