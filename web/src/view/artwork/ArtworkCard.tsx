import Backdrop from '@material-ui/core/Backdrop'
import Modal from '@material-ui/core/Modal'
import Slide from '@material-ui/core/Slide'
import * as React from 'react'
import { Colors } from '../../../../common/src/colors'
import { ArtType } from '../../graphql/query.gen'
import { PillButton } from '../../style/button'
import { H1, H3 } from '../../style/header'
import { Spacer } from '../../style/spacer'
import { style } from '../../style/styled'
import { ArtworkProps } from './ArtworkProps'

export function ArtworkCard({ name, createdBy, createdAt, type, uri }: ArtworkProps) {
  // Uncomment this line to test performance while a background process is running
  runBackgroundProcess()

  const [open, setOpen] = React.useState(false)
  const [contentStr, setContent] = React.useState('')

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

  // Actual content of art
  if (contentStr.length <= 0 && type === ArtType.Text) {
    fetch(uri)
      .then(response => response.text())
      .then(text => setContent(text))
      .catch(err => console.log(err))
  }

  const content =
    type === ArtType.Text ? (
      <H3 style={{ overflowWrap: 'break-word', wordWrap: 'break-word', hyphens: 'auto' }} className="mw-100">
        {contentStr}
      </H3>
    ) : (
      <ArtContent alt={name} src={uri} />
    )
  const thumbnail =
    type === ArtType.Text ? (
      <H3 style={{ color: Colors.wanderlustPrimary }} className="truncate mw-100 pa2">
        {contentStr}
      </H3>
    ) : (
      <ArtThumbnail alt={name} src={uri} />
    )

  const localDate = new Date(parseInt(createdAt))

  const body = (
    <ArtModalBody>
      <div className="w-90 flex flex-column items-center">
        <H1 style={{ color: Colors.wanderlustPrimary }} id="artwork-title">
          {name}
        </H1>
        <Spacer $h3 />
        <ArtContentContainer>{content}</ArtContentContainer>
        <Spacer $h3 />
        <div>
          <H3>
            Created By: <span style={{ color: Colors.wanderlustPrimary }}>{createdBy}</span>
          </H3>
          <H3>
            Created At: <span style={{ color: Colors.wanderlustPrimary }}>{localDate.toLocaleDateString('en-us')}</span>
          </H3>
        </div>
        <Spacer $h4 />
      </div>
      <PillButton $pillColor="purple">Mark as visited</PillButton>
    </ArtModalBody>
  )

  return (
    <>
      <div onClick={handleClick} className="flex w5-l w-90 h4 br4 mb3 mr4-l ml4-l shadow-4 overflow-hidden relative">
        <ArtThumbnailContainer>{thumbnail}</ArtThumbnailContainer>
        <H3 className="w-50 pl2 pr2 self-center tc truncate">{name}</H3>
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

const ArtThumbnailContainer = style('div', 'flex items-center justify-center avenir f3 w-50 br', {
  borderRight: 'solid 1px rgba(0, 0, 0, .15)',
  position: 'relative',
})

const ArtThumbnail = style('img', 'w-100 h-100', {
  position: 'absolute',
  objectFit: 'cover',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  hyphens: 'auto',
})

const ArtContentContainer = style('div', 'w-90 pa1 ba b--light-gray', {
  overflow: 'auto',
  maxHeight: '50%',
})

const ArtContent = style('img', 'w-100 h-auto br2', {})

const ArtModalBody = style('div', 'flex flex-column items-center justify-between w-50-l w-90 bg-white br4 pa3', {
  margin: 'auto',
  top: '50%',
  minHeight: '50%',
  maxHeight: '100%',
  outline: 0,
  overflow: 'auto',
})

// Background process that incrementally runs a computation
function runBackgroundProcess() {
  setInterval(() => {
    const data = 'hash-me'
    require('crypto').createHash('sha256').update(data).digest('base64')
  }, 100)
}
