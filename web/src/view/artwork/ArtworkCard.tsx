import Backdrop from '@material-ui/core/Backdrop'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import * as React from 'react'
import { H1, H3, H4 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { ArtworkProps } from './ArtworkProps'

export function ArtworkCard({ name, location, type, uri }: ArtworkProps) {
  // TODO: Fetch art content from S3 using uri property
  const [open, setOpen] = React.useState(false)

  const handleModalOpen = () => {
    setOpen(true)
  }
  const handleModalClose = () => {
    setOpen(false)
  }

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    createRipple(event)
    handleModalOpen()
  }

  const body = (
    <ArtModalBody>
      <H1 id="artwork-title">{name}</H1>
      <Spacer $h3 />
      <div className="w-90 h5 ba b--silver"></div>
      <Spacer $h3 />
      <div className="w-90">
        <H3>
          Location: ({location.lat.toFixed(1)}, {location.lng.toFixed(1)})
        </H3>
      </div>
    </ArtModalBody>
  )

  return (
    <>
      <div onClick={handleClick} className="flex w5-l w-90 h4 br4 mb3 mr4-l ml4-l shadow-4 overflow-hidden relative">
        <ArtContent />
        <H4 className="w-50 pl2 pr2 self-center tc truncate">{name}</H4>
      </div>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={handleModalClose}
        aria-labelledby="artwork-title"
        aria-describedby="artwork-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
          {body}
        </Slide>
      </Modal>
    </>
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

const ArtModalBody = style('div', 'flex flex-column items-center w-50-l w-90 h-75 bg-white br4 pa3', {
  margin: 'auto',
  top: '50%',
  outline: 0,
})
