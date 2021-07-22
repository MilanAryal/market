const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

module.exports = (eleventyConfig) => {
  // Alias
  eleventyConfig.addLayoutAlias('default', 'default.html')
  eleventyConfig.addLayoutAlias('post', 'post.html')

  // Copy to the output
  eleventyConfig.addPassthroughCopy('uploads')

  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  })
  eleventyConfig.setLibrary('md', markdownLibrary)

  return {
    // Control which files Eleventy will process
    templateFormats: ['md', 'njk', 'html', 'liquid'],

    // Use liquid in html templates
    htmlTemplateEngine: 'liquid',

    // If your site deploys to a subdirectory
    pathPrefix: '/market/',
    // -----------------------------------------------------------------

    // Directories
    dir: {
      input: 'src',
      includes: '_includes',
      layouts: '_layouts',
      data: '_data',
      output: '_site',
    },
  }
}
