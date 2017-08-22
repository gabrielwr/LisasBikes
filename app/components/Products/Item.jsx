
import React from 'react'
import { Link } from 'react-router'

import formatPrice from 'APP/app/utils/priceFormatter'

export default ({ productId, name, price, image, description, alt }) => (
  <Link to={`/products/${productId}`}>
    <article>
      <div>
        <img style={{backgroundImage: `url(${image})`}} />
      </div>
      <div>
        <h3>{ name }</h3>
        <h3>{ formatPrice( price ) }</h3>
      </div>
    </article>
  </Link>
)
