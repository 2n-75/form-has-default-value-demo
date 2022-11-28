import { FC, ForwardedRef, forwardRef, InputHTMLAttributes, Ref } from 'react'

export type Props = {
  ref?: ForwardedRef<HTMLInputElement>
} & InputHTMLAttributes<HTMLInputElement>

export const InputText: FC<Props> = forwardRef(({ id, name, placeholder, ...rest }, ref: Ref<HTMLInputElement>) => (
  <input type="text" name={name} id={id} placeholder={placeholder} ref={ref} {...rest} className="inputText" />
))

InputText.displayName = 'TextInput'
