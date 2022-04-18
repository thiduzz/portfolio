import fs from 'fs';
import {IndexNode} from "@local-types/index";

const SITEMAP_PATH = './public/sitemap.xml';

export default (paths: Array<IndexNode>): void => {
    if (fs.existsSync(SITEMAP_PATH)) {
        fs.unlinkSync(SITEMAP_PATH);
    }
    const stream = fs.createWriteStream(SITEMAP_PATH, { flags: 'a' });
    stream.write(`<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${paths
        .map((node) => {
            return `
            <url>
              <loc>${node.url}</loc>
              <lastmod>${node.lastUpdated}</lastmod>
              <changefreq>${node.changeFrequency}</changefreq>
              <priority>${node.priority}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
    `);
    stream.end();
};