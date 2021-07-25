const { DateTime } = require('luxon')
const fs = require('fs')
const markdownIt = require('markdown-it')
const markdownItAnchor = require('markdown-it-anchor')

// Filters
const htmlDateString = require('./src/_filters/html-date-string')
const prettyDate = require('./src/_filters/pretty-date')

module.exports = (eleventyConfig) => {
  // Alias
  eleventyConfig.addLayoutAlias('default', 'default.html')
  eleventyConfig.addLayoutAlias('post', 'post.html')

  // Copy to the output
  eleventyConfig.addPassthroughCopy('uploads')

  // FILTERS
  eleventyConfig.addFilter('htmlDateString', htmlDateString)
  eleventyConfig.addFilter('prettyDate', prettyDate)
  eleventyConfig.addFilter('year', (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('y')
  })

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n)
    }

    return array.slice(0, n)
  })

  // Return the smallest number argument
  eleventyConfig.addFilter('min', (...numbers) => {
    return Math.min.apply(null, numbers)
  })

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ['all', 'nav', 'post', 'posts'].indexOf(tag) === -1
    )
  }

  eleventyConfig.addFilter('filterTagList', filterTagList)

  // Create an array of all tags
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach((item) => {
      ;(item.data.tags || []).forEach((tag) => tagSet.add(tag))
    })

    return filterTagList([...tagSet])
  })

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
    templateFormats: ['njk', 'md', 'html'],

    // Pre-process *.md files
    markdownTemplateEngine: 'njk',

    // Pre-process *.html files
    htmlTemplateEngine: 'njk',

    // Opt-out of pre-processing global data JSON files
    dataTemplateEngine: false,

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
