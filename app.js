const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const TurndownService = require("turndown");

const url = "https://v8.dev";
const turndownService = new TurndownService();
const DATA_DIR = path.join(__dirname, "src", "data");

function slugify(str) {
  if (!str) return null;
  return str
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

async function scrapeBlogData(href, id, folderName) {
  try {
    const { data } = await axios.get(url + href);
    const $h = cheerio.load(data);
    const content = $h("#main article").html();
    if (!content) {
      console.warn(`No content found for ${href}, skipping`);
      return;
    }
    const cleanContent = content.replace(/<footer[^>]*>.*?<\/footer>/gs, "");
    const markdown = turndownService.turndown(cleanContent);
    const dir = path.join(DATA_DIR, "posts", folderName);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${id}.md`), markdown);
    console.log(`Written: ${folderName}/${id}.md`);
  } catch (err) {
    console.error(`Failed to scrape ${href}: ${err.message}`);
  }
}

async function scrapeData() {
  try {
    console.log("Fetching", url + "/blog");
    const { data } = await axios.get(url + "/blog");
    const $ = cheerio.load(data);
    const listItems = $("#main ol li");
    console.log(`Found ${listItems.length} blog entries`);
    const blogData = [];

    listItems.each((idx, el) => {
      const blog = { id: "", title: "", date: "", tags: [], postUrl: "", to: "", tag: "" };

      const postLink = $(el).children("a").not(".tag").first();
      blog.title = postLink.text().trim();
      blog.postUrl = postLink.attr("href");
      blog.date = $(el).children("time").text().trim();

      $(el).children("a.tag").each((i, tagEl) => {
        blog.tags.push($(tagEl).text().trim());
      });

      const folderName = slugify(blog.tags[0]);
      const postId = slugify(blog.title);
      blog.tag = folderName;
      blog.to = `blog/${postId}`;
      blog.id = postId;
      blogData.push(blog);
    });

    console.log(`Parsed ${blogData.length} blog entries`);

    const uniqueTags = _.uniq(blogData.flatMap((b) => b.tags));
    console.log(`Found ${uniqueTags.length} unique tags`);

    for (const tag of uniqueTags) {
      const postsWithTag = blogData.filter((b) => b.tags.includes(tag));
      const folderName = slugify(tag.toLowerCase());
      console.log(`Scraping ${postsWithTag.length} posts for tag "${tag}"`);
      await Promise.all(
        postsWithTag.map((b) => scrapeBlogData(b.postUrl, b.id, folderName))
      );
    }

    const jsonDir = path.join(DATA_DIR);
    fs.mkdirSync(jsonDir, { recursive: true });
    fs.writeFileSync(path.join(jsonDir, "posts_index.json"), JSON.stringify(blogData, null, 2));
    console.log("Done — posts_index.json written");
  } catch (err) {
    console.error("Fatal:", err.message);
  }
}

scrapeData();
