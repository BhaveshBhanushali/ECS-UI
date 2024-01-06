import React from 'react'
import GlobalHeader from '../../organisms/global-header'
import PageContent from '../../organisms/page-content'
import TemplateFullWidth from '../../templates/template-full-width'
import GlobalFooter from '../../organisms/global-footer'

const Home = function Home() {
  return (
    <TemplateFullWidth
      globalHeaderEl={<GlobalHeader />}
      pageContentEl={<PageContent />}
      globalFooterEl={<GlobalFooter />}
    />
  )
}

export default Home
