import React from 'react';
import Link from 'gatsby-link';
import get from 'lodash/get';
import Img from 'gatsby-image';

import styles from './index.module.scss';

export default function ArticleExcerpt({ node }) {
  const slug = node.fields.slug;
  const title = get(node, 'frontmatter.title') || slug;
  return (
    <article key={slug} className={styles.excerpt}>
      <Link to={slug} className={styles.thumbnailAnchor}>
        <img src={node.frontmatter.thumbnail.childImageSharp.resize.src} className={styles.thumbnail} />
      </Link>
      <div className={styles.content} >
        <h4>
          <Link to={slug}>
            {title}
          </Link>
        </h4>
        <p>
          <span dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          &nbsp; <Link to={slug}>Continue reading</Link>
        </p>
        <div className={styles.date}>
          <small>{node.frontmatter.date}</small>
        </div>
      </div>
    </article>
  );
}