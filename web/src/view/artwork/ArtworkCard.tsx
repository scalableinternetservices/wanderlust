import * as React from 'react'
import { ArtType } from '../../graphql/query.gen'
import { H4 } from '../../style/header'
import { style } from '../../style/styled'

export interface ArtworkProps {
  id: number
  location: { lat: number; lng: number }
  name: string
  type: ArtType
  uri: string
}

export function ArtworkCard({ name, type, uri }: ArtworkProps) {
  // TODO: Fetch art content from S3 using uri property

  return (
    <div onClick={showModal} className="flex w5-l w-90 h4 br4 mb3 mr4-l ml4-l shadow-4 overflow-hidden relative">
      <ArtContent />
      <H4 className="w-50 pl2 pr2 self-center tc truncate">{name}</H4>
    </div>
  )
}

/* Helper functions */

// Iteratively calculates offset of each parent
function getOffset(element: HTMLElement | null) {
  let leftOffset = 0
  let topOffset = 0

  while (element) {
    leftOffset += element.offsetLeft - element.scrollLeft + element.clientLeft
    topOffset += element.offsetTop - element.scrollTop + element.clientTop

    element = element.offsetParent as HTMLElement | null
  }

  return { left: leftOffset, top: topOffset }
}

// On-click handler for each artwork card
function showModal(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  createRipple(event)
}

// Creates ripple effect when artwork card is tapped
function createRipple(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  // Initialize dimensions
  const button = event.currentTarget
  const circle = document.createElement('span')
  const diameter = Math.max(button.clientWidth, button.clientHeight)
  const radius = diameter / 2
  const offset = getOffset(button)

  // Compute start of ripple circle
  circle.style.width = circle.style.height = `${diameter}px`
  circle.style.left = `${event.clientX - (offset.left + radius)}px`
  circle.style.top = `${event.clientY - (offset.top + radius)}px`
  circle.classList.add('ripple')

  // Remove any existing ripple classes on the button before adding the new span
  const ripple = button.getElementsByClassName('ripple')[0]

  if (ripple) {
    ripple.remove()
  }

  // Add the new circle span to the button
  button.append(circle)
}

/* Custom styling */

const ArtContent = style('div', 'avenir f3 w-50 br', { borderRight: 'solid 1px rgba(0, 0, 0, .15)' })
