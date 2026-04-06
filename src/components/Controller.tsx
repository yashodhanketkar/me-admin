import type { FieldValues, FieldPath, Control } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import type { HTMLInputTypeAttribute } from 'react'

interface ControllerWrapperProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>
  name: TName
  type?: HTMLInputTypeAttribute
  lable?: string
  placeholder?: string
  autoComplete?: 'on' | 'off'
}

export const ControllerWrapper = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  type,
  lable,
  placeholder,
  autoComplete,
}: ControllerWrapperProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={`form-${name}`} className="capitalize">
            {lable || field.name}
          </FieldLabel>
          <Input
            {...field}
            type={type || 'text'}
            id={`form-${name}`}
            aria-invalid={fieldState.invalid}
            placeholder={placeholder || `Enter ${field.name}`}
            autoComplete={autoComplete || 'off'}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
