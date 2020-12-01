import Backdrop from '@material-ui/core/Backdrop'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import * as React from 'react'
import { H4 } from '../../style/header'
import { style } from '../../style/styled'
import { ArtworkProps } from './ArtworkProps'

export function ArtworkCard({ name, type, uri }: ArtworkProps) {
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
      <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
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
        <Slide timeout={{ appear: 600, enter: 400, exit: 300 }} direction="up" in={open} mountOnEnter unmountOnExit>
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

const ArtModalBody = style('div', 'flex flex-column items-center w-50-l w-90 h-75 bg-white br4', {
  margin: 'auto',
  top: '50%',
  outline: 0,
})
