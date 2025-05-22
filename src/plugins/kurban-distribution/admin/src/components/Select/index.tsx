import React from 'react';
import { SingleSelect, SingleSelectOption, Field } from '@strapi/design-system';

const SelectComponent = ({ label, error, hint, placeholder, data, ...props }: any) => {
  const selectRef = React.useRef<HTMLDivElement | null>(null);
  return (
    <Field.Root error={error} hint={hint}>
      <Field.Label>{label}</Field.Label>
      <SingleSelect ref={selectRef} placeholder={placeholder ?? 'Pilih'} error={error} {...props}>
        {data &&
          data?.length > 0 &&
          data.map((item: any) => (
            <SingleSelectOption key={item.id} value={item.id}>
              {item.name}
            </SingleSelectOption>
          ))}
      </SingleSelect>
      <Field.Error />
      <Field.Hint />
    </Field.Root>
  );
};

export default SelectComponent;
