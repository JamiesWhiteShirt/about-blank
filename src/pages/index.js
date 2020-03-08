import React from "react";
import Layout from "../components/layout";


export default function Index({ data }) {
  const { edges: chapters } = data.allMarkdownRemark
  return (
    <Layout>
      <div>
        {chapters
          .filter(chapter => chapter.node.frontmatter.title.length > 0)
          .map(({ node: chapter }) => {
            return (
              <div className="kapittel" key={chapter.id}>
                  <h1 className="sticky" id={chapter.frontmatter.path}>{chapter.frontmatter.title} </h1>
                <div dangerouslySetInnerHTML={{ __html: chapter.html }} />
              </div>
            )
          })}
      </div>
      
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark
      (sort: { fields: [frontmatter___title], order: ASC })
      {edges {
        node {
          excerpt(pruneLength: 250)
          id
          html
          frontmatter {
            title
            path
            layout
          }
        }
      }
    }
  }
`