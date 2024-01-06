import React from 'react'
import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import TemplateFullWidth from '.'

describe('TemplateFullWidth component', () => {
  const globalHeaderEl = React.Fragment
  const pageHeaderEl = React.Fragment
  const pageContentEl = React.Fragment

  it('should render correctly with props', () => {
    const container = mountWithTheme(render, TemplateFullWidth, {
      globalHeaderEl,
      pageHeaderEl,
      pageContentEl,
    })

    expect(container).toBeDefined()
  })
})
