import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import ProofScript from "./quartz/components/proof"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [
    Component.Comments({
      provider: 'giscus',
      options: {
        // from data-repo
        repo: 'HanyueYi/quartz-yhyquest',
        // from data-repo-id
        repoId: 'R_kgDOOhlNGw',
        // from data-category
        category: 'Announcements',
        // from data-category-id
        categoryId: 'DIC_kwDOOhlNG84CtzdG',
        // from data-mapping="pathname"
        mapping: 'pathname',
        // from data-strict="1"
        strict: true,
        // from data-reactions-enabled="1"
        reactionsEnabled: true,
        // from data-input-position="bottom"
        inputPosition: 'bottom',
      }
    }),
  ],

  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/HanyueYi/quartz-yhyquest",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer(),
    // Component.RecentNotes({
    //   title: "Recent Notes", // 列表的标题
    //   limit: 3, // 显示的笔记数量
    //   // 您还可以添加其他过滤和排序选项
    //   filter: (file) => {
    //     return !file.frontmatter?.draft // 例如，过滤掉草稿
    //   },
    //   // sort: (a, b) => {
    //   //   // 按修改时间降序排序
    //   //   if (a.file.mtime && b.file.mtime) {
    //   //   return b.file.mtime.getTime() - a.file.mtime.getTime()
    //   //   }
    //   //   return 0
    //   // }
    // })
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    ProofScript(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [ProofScript(),],
}
