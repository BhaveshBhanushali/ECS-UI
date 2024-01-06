import React from 'react'
import GlobalHeader from '../../organisms/global-header'
import CreateRequestContent from '../../organisms/create-request-content'
import TemplateFullWidth from '../../templates/template-full-width'
import GlobalFooter from '../../organisms/global-footer'

const CreateRequest = function CreateRequest() {
  return (
    <TemplateFullWidth
      globalHeaderEl={<GlobalHeader />}
      pageContentEl={<CreateRequestContent />}
      globalFooterEl={<GlobalFooter />}
    />
  )
}

export default CreateRequest
