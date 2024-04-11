import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { ThemeContext } from 'Common';
import { PageWrapper, PageLink } from './styles';

export const PostsPagination = ({ isFirst, isLast, prevPage, nextPage }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <PageWrapper theme={theme}>
      <PageLink>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            <span>👈🏻</span> Previous Page
          </Link>
        )}
      </PageLink>
      <PageLink>
        {!isLast && (
          <Link to={nextPage} rel="next">
            Next Page <span>👉🏻</span>
          </Link>
        )}
      </PageLink>
    </PageWrapper>
  );
};
