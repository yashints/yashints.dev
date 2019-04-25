import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import { Btn } from './styles';

export const SubmitButton = ({
  disabled,
  btnText,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Btn
      type="submit"
      disabled={disabled}
      theme={theme}
    >
      {btnText}
    </Btn>
  );
};
