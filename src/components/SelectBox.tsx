import { FC, forwardRef, Ref, SelectHTMLAttributes } from 'react'

export type Props = {
  options:
    | {
        value: string
        label: string
      }[]
    | {
        value: number
        label: string
      }[]
} & SelectHTMLAttributes<HTMLSelectElement>

export const SelectBox: FC<Props> = forwardRef(
  ({ options, id, name, defaultValue, ...rest }, ref: Ref<HTMLSelectElement>) => (
    <select name={name} id={id} ref={ref} {...rest} className="selectBox" defaultValue={defaultValue}>
      <option value="" disabled>
        選択してください
      </option>
      {options.map(option => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
)

SelectBox.displayName = 'SelectBox'
