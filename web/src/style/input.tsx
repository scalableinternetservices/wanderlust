import * as React from 'react'
import { useRef } from 'react'
import { Colors } from '../../../common/src/colors'
import { Fonts } from './fonts'
import { style } from './styled'

interface InputProps {
  $hasError?: boolean
  $hasSuccess?: boolean
  $onChange?: (val: string) => void
  $onSubmit?: (val: string) => void
}

const InputBase = style('input', 'pa2 input-reset bn w-100 measure', (p: InputProps) => ({
  fontFamily: Fonts.sansBody,
  borderBottom: '2px solid ' + (p.$hasError ? Colors.coral : p.$hasSuccess ? Colors.mint : '#A26EA1'),
  ':focus': {
    borderBottom: '2px solid ' + (p.$hasError ? Colors.coral : p.$hasSuccess ? Colors.mint : '#A26EA1'),
  },
}))

type Props = InputProps & JSX.IntrinsicElements['input']

export function Input(props: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  function handleEnterKey(e: React.KeyboardEvent<HTMLElement>) {
    if (e.keyCode === 13 && props.$onSubmit) {
      // enter
      props.$onSubmit(inputRef.current!.value)
    }
  }

  function handleChange() {
    if (props.$onChange) {
      props.$onChange(inputRef.current!.value)
    }
  }

  return <InputBase ref={inputRef} {...props} onChange={handleChange} onKeyDown={handleEnterKey} />
}
