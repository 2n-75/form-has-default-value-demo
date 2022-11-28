import React from 'react'

import { useForm } from 'react-hook-form'
import { InputText } from './components/InputText'
import { SelectBox } from './components/SelectBox'
import { SuggestInput } from './components/SuggestInput'

type InputValues = {
  name: string
  level: number
  producingArea: {
    label: string
    value: string
  }
  score: number
}

const App = () => {
  const defaultValues = {
    name: 'waowao',
    level: 1,
    producingArea: {
      label: '北海道',
      value: '北海道',
    },
    score: 3,
  }
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid, errors },
  } = useForm<InputValues>({
    mode: 'onChange',
    defaultValues,
  })
  const scoreItems = [
    {
      label: '1',
      value: 1,
    },
    {
      label: '2',
      value: 2,
    },
    {
      label: '3',
      value: 3,
    },
    {
      label: '4',
      value: 4,
    },
    {
      label: '5',
      value: 5,
    },
  ]
  const onSubmit = (values: InputValues) => {
    console.log({ values })
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__item">
          <label htmlFor="score" className="form__label">
            評価
          </label>
          <div className="radioGroup">
            {scoreItems.map(item => (
              <label className="radioGroup__label" key={item.value}>
                <input
                  className="radioGroup__radio"
                  type="radio"
                  {...register('score', { required: true })}
                  value={item.value}
                  defaultChecked={item.value === defaultValues?.score}
                />
                {item.label}
              </label>
            ))}
          </div>
        </div>

        <div className="form__item">
          <label htmlFor="name" className="form__label">
            名前
          </label>
          <InputText {...register('name', { required: '必須項目です' })} placeholder="なまえ" id="name" />
        </div>
        <div className="form__item">
          <label htmlFor="tdhk" className="form__label">
            生産地
          </label>
          <SuggestInput
            id="tdhk"
            options={[
              { label: '北海道', value: '北海道' },
              { label: '青森', value: '青森' },
            ]}
            placeholder="東京"
            initialValue={defaultValues?.producingArea}
            onSelectSuggestion={option => setValue('producingArea', option)}
          />
        </div>
        <div className="form__item">
          <label htmlFor="level" className="form__label">
            レベル
          </label>
          <SelectBox
            {...register('level', { required: true })}
            id="level"
            name="level"
            options={[
              { label: '初心者向け', value: '1' },
              { label: '中級者向け', value: '2' },
              { label: '上級者向け', value: '3' },
            ]}
            defaultValue={defaultValues?.level}
          />
        </div>
        <div className="form__footer">
          <button className="form__submitButton" type="submit" disabled={!isDirty || !isValid}>
            保存する
          </button>
        </div>
      </form>
    </div>
  )
}

export default App
