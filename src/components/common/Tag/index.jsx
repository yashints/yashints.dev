import React, { useContext } from 'react';
import { ThemeContext } from 'Common';
import { TagWrapper, A } from './styles';

export const Tag = ({
  fieldValue,
  totalCount,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TagWrapper theme={theme}>
      <A
        href={`/tags/${fieldValue.replace(
          ' ',
          ''
        )}`}
      >
        {fieldValue}
      </A>
      <span>{totalCount}</span>
    </TagWrapper>
  );
};
