import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer/source-files'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { h } from 'hastscript'

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

const mdxMeta = defineNestedType(() => ({
  name: 'MDXMeta',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
}))

export const EventPost = defineDocumentType(() => ({
  name: 'Event',
  filePathPattern: `events/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    date: {
      type: 'date',
      required: true,
    },
    cover: {
      type: 'string',
      required: true,
    },
    mdxMeta: {
      required: true,
      type: 'nested',
      of: mdxMeta,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [EventPost],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          properties: {
            class: 'anchor-link',
            ariaHidden: true,
            tabindex: -1,
          },
          content: [h('span.hashtag', '#')],
        },
      ],
    ],
  },
})
