import { FC, useEffect, useState } from 'react'
import React from 'react'
import Autosuggest from 'react-autosuggest'

import styles from '../styles/AutoSuggest.module.scss'
type SuggestionType = {
  label: string
  value: string
}

export type Props = {
  id: string
  options: SuggestionType[]
  placeholder?: string
  defaultValue?: SuggestionType
  onSelectSuggestion: (options: SuggestionType) => void
}

// 候補が表示されるinput
export const AutoSuggest: FC<Props> = ({ id, options, placeholder, defaultValue, onSelectSuggestion }) => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>(options)
  const [value, setValue] = useState('')
  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.label)
    }
  }, [defaultValue])
  const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setValue(newValue)
  }

  const onBlur = () => {
    if (defaultValue && value !== defaultValue.label) {
      setValue(defaultValue.label)
    }
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value))
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions(options)
  }
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length
    return inputLength === 0
      ? options
      : options.filter((option: SuggestionType) => option.label.toLowerCase().includes(inputValue))
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion: { label: string }) => suggestion.label

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion: SuggestionType) => <div>{suggestion.label}</div>

  const onSuggestionSelected = (
    event: React.FormEvent<HTMLElement>,
    { suggestion }: { suggestion: SuggestionType }
  ) => {
    onSelectSuggestion(suggestion)
  }
  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: placeholder,
    value,
    onChange: onChange,
    onBlur: onBlur,
  }
  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      id={id}
      theme={styles}
    />
  )
}
