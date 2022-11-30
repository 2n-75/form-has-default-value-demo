import React from 'react'
import { useForm } from 'react-hook-form'

import { AutoSuggest } from './components/AutoSuggest'
import { InputText } from './components/InputText'
import { SelectBox } from './components/SelectBox'
import { levelOptions, producingAreaOptions, reviewOptions } from './const'

type InputValues = {
  name: string
  level: string
  producingArea: {
    label: string
    value: string
  }
  review: string
}

const App = () => {
  const defaultValues = {
    name: '上善如水',
    level: 'beginner',
    producingArea: {
      label: '新潟県',
      value: '新潟県',
    },
    review: '5',
  }
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { isDirty, isValid },
  } = useForm<InputValues>({
    mode: 'onChange',
    defaultValues,
  })
  const onSubmit = (values: InputValues) => {
    console.log({ values })
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form__item">
          <label htmlFor="name" className="form__label">
            名前
          </label>
          <InputText {...register('name', { required: '必須項目です' })} placeholder="なまえ" id="name" />
        </div>
        <div className="form__item">
          <label htmlFor="producingArea" className="form__label">
            生産地
          </label>
          <AutoSuggest
            id="producingArea"
            options={producingAreaOptions}
            placeholder="東京"
            defaultValue={defaultValues?.producingArea}
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
            options={levelOptions}
            defaultValue={defaultValues?.level}
          />
        </div>
        <div className="form__item">
          <label htmlFor="review" className="form__label">
            おすすめ度
          </label>
          <div className="radioGroup">
            {reviewOptions.map(item => (
              <label className="radioGroup__label" key={item.value}>
                <input
                  className="radioGroup__radio"
                  type="radio"
                  {...register('review', { required: true })}
                  value={item.value}
                  defaultChecked={item.value === defaultValues?.review}
                />
                {item.label}
              </label>
            ))}
          </div>
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
