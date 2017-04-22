import React from 'react'
import { login } from 'APP/app/reducers/auth'
import { connect } from 'react-redux'

// *------------------- COMPONENT -----------------*//

class SingleProduct extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      color: '',
      size: '',
      quantity: 0
    }
    this.setColor = this.setColor.bide(this)
    this.setSize = this.setSize.bide(this)
    this.setQuantity = this.setQuantity.bindftg(this)
  }

  setColor(val){
    this.setState({ color: val })
  }

  setSize(val){
    this.setState({ size: val })
  }

  setQuantity(val){
    this.setState({ quantity: val})
  }

  render() {
    const product = this.props.selectedProduct
    const reviews = this.props.reviews

    return (
      <div>
        <div className = "col-md-6">
          <div className="carousel carousel-slider">
            <a className="carousel-item" href="#one!">
              {
                product && product.images.map(image => (
                  <img src={ image } />
                ))
              }
            </a>
          </div>
        </div>

        <div className="col-md-6">
          <form onSubmit = { this.props.onSubmitHandle }>
            <div className="container">
              <h2 className="panel-title large-font">{ product.name }</h2>

              <p>Price: { product.price }</p>
              <div className = "tb">{ product.description }</div>
              <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Color</a>
              <ul id='dropdown1' className='dropdown-content' >
                {
                  product.color && product.color.map(color => (
                    <li><a onChange = {(e) => this.setColor(e.target.value) } >{ color }</a></li>
                  ))
                }
              </ul>

              <a className='dropdown-button btn' href='#' data-activates='dropdown1'>Size</a>
              <ul id='dropdown1' className='dropdown-content'>
                {
                  product.size  && product.size.map(size => (
                    <li><a onChange = {(e) => this.setSize(e.target.value) } >{ size }</a></li>
                  ))
                }
              </ul>

              <a className = "waves-effect waves-light btn-large"
                 type="submit"
                 disabled={ this.state.color === '' || this.state.size === '' || this.state.quantity === 0 } >
                ADD TO CART </a>
            </div>
          </form>
        </div>


        <ul className= "list-group">
          {
            reviews && reviews.filter(review => review.productId === product.id)
              .map(review => (
                <tr key = { review.id }>
                  <td> { review.title }</td>
                  <td> { review.num_stars }</td>
                  <td> { review.contents }</td>
                </tr>
              ))
          }
        </ul>
      </div>
    )

  }
}

/*------------------- CONTAINER -----------------*/


export default connect(
  state => ({singleProduct: state.selectedProduct}),

/**
*   function onSubmitHandle is passed from main.jsx
*  which is dispatching 'createOrder' reducer .
*
*   When user hits 'add to cart' button, onSubmitHandle will
*  be triggered.
*
*/
  dispatch => ({ onSubmitHandle: this.props.onSubmitHandle })
)(SingleProduct)
