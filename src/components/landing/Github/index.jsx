import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Project, GithubIcon, Container, Subtitle } from 'Common'
import config from 'Data'

export const Github = () => (
  <StaticQuery
    query={graphql`
      {
        github {
          repositoryOwner(login: "yashints") {
            repositories(
              first: 5
              orderBy: { field: UPDATED_AT, direction: DESC }
              privacy: PUBLIC
            ) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  stargazers {
                    totalCount
                  }
                  forkCount
                  updatedAt
                }
              }
            }
          }
        }
      }
    `}
    render={({ github }) => (
      <Container>
        <Subtitle>Open Source</Subtitle>
        <Project
          icon={GithubIcon}
          type="Github"
          projects={github.repositoryOwner.repositories.edges}
          link={config.socialLinks.github}
          color="#000"
          github
        />
      </Container>
    )}
  />
)
