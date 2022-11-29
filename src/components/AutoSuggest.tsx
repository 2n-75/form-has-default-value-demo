import { FC, useEffect, useState } from 'react'
import React from 'react'
import Autosuggest from 'react-autosuggest'

import styles from '../styles/AutoSuggest.module.scss'
type SuggestionType = {
  label: string
  value: string
}

/**
 * 入力単語がsuggestionsの頭とマッチしているかを判断しているっぽい
 */
export type Props = {
  id: string
  options: SuggestionType[]
  placeholder?: string
  defaultValue?: SuggestionType
  onSelectSuggestion: (options: SuggestionType) => void
}

// 候補が表示されるinput
export const AutoSuggest: FC<Props> = ({ id, options, placeholder, defaultValue, onSelectSuggestion }) => {
  const [suggestions, setSuggestions] = useState<SuggestionType[]>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue.label)
    }
  }, [defaultValue])
  const onChange = (event: React.FormEvent<HTMLElement>, { newValue }: { newValue: string }) => {
    setValue(newValue)
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value))
  }

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  }
  // Teach Autosuggest how to calculate suggestions for any given input value.
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0
      ? []
      : options.filter((option: SuggestionType) => option.label.toLowerCase().slice(0, inputLength) === inputValue)
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
