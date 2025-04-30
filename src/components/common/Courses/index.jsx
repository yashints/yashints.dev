import React from 'react';
import { GRID, CARD, TITLE, SUBTITLE, RATING, TAGS, TAG } from './styles';
import { Link as GatsbyLink } from 'gatsby';
import styled from 'styled-components';

import kids from 'Static/courses/kids.png';
import pythonTeens from 'Static/courses/kidsphyton.png';
import genai from 'Static/courses/ai.png';
import pythonfull from 'Static/courses/python.png';
import dotnet from 'Static/courses/dotnet.png';
import js from 'Static/courses/js.png';
import html from 'Static/courses/html.png';
import react from 'Static/courses/react.png';
import devops from 'Static/courses/devops.png';

import courses from 'Static/course';

const imageMap = new Map([
  [1, kids],
  [2, kids],
  [3, kids],
  [4, pythonTeens],
  [5, genai],
  [6, pythonfull],
  [7, dotnet],
  [8, js],
  [9, html],
  [10, react],
  [11, devops],
]);

const StyledLink = styled((props) => <GatsbyLink {...props} />)`
  color: #000;
  border: 1px solid #eee;
  cursor: pointer;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  width: 23%;

  img {
    height: 200px;
    object-fit: contain;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    margin-bottom: 0;
  }
`;

export const Courses = () => {
  return (
    <GRID>
      {courses.map((c, i) => (
        <StyledLink to={`/courseinfo?course=${i + 1}`} title={c.name} key={i}>
          <img src={imageMap.get(i + 1)} />
          <TITLE>
            <span>{c.name}</span> <span> 👍 </span>
          </TITLE>
          <SUBTITLE>{c.tagLine}</SUBTITLE>
          <RATING>
            ⭐ {c.rating} <span>({c.reviews})</span>
          </RATING>
          <TAGS>
            <TAG>
              <p>{c.age}</p>
              <span>Ages</span>
            </TAG>
            <TAG>
              <p>{c.price}</p>
              <span>{c.priceFreq}</span>
            </TAG>
          </TAGS>
        </StyledLink>
      ))}
    </GRID>
  );
};
