import { render } from '@testing-library/react'
import { mountWithTheme } from '../../../classes/utilities/test-provider'
import IconBtn from './icon-btn'

describe('The IconBtn', () => {
  it('should render correctly with no props', () => {
    const { container } = mountWithTheme(render, IconBtn, {})

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })

  it('should render correctly with props', () => {
    const icon = 'fa-solid fa-magnifying-glass'
    const tooltipText = 'testTooltip'

    const { container } = mountWithTheme(render, IconBtn, { icon, tooltipText })

    expect(container).not.toBeNull()
    expect(container.firstChild).not.toBeNull()
  })
})
