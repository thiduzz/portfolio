export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'mainImage',
      title: 'Header image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'string',
      options: {
        maxLength: 100
      }
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'}
    },
    {
      title: 'Markdown',
      name: 'isMarkdown',
      type: 'boolean'
    },
    {
      name: 'bodyMarkdown',
      title: 'Body(Markdown)',
      type: "markdown",
      hidden: ({ parent, value }) => parent?.isMarkdown == false
    },
    {
      name: 'bodyRichtext',
      title: 'Body(Richtext)',
      type: "blockContent",
      hidden: ({ parent, value }) => parent?.isMarkdown == true
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today'
      }
    },
    {
      name: 'tags',
      title: 'Tags (SEO)',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tag'}}]
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}]
    },
  ],
  initialValue: {
    is_markdown: true,
    publishedAt: (new Date()).toISOString()
  },
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage'
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`
      })
    }
  }
}
