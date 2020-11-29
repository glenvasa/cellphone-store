import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
  };
  componentDidMount() {
    this.setProducts();
  }
  // gets fresh set of values for each nested object(product) in storeProducts array,
  // doesn't reference them any longer
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  handleDetail = () => {
    console.log("hello from detail");
  };

  addToCart = () => {
    console.log("hello from add to cart");
  };

  //testing to see if storeProducts matches what is in the state.products
  //With products: storeProducts in State we are experiencing a reference issue
  //because when we change state.products.inCart to true it also claims
  //that storeProducts.inCart changed to true, even though the value did not actually
  //change storeProducts in data file
  //   tester = () => {
  //     console.log("State products :", this.state.products[0].inCart);
  //     console.log("Data products :", storeProducts[0].inCart);

  //     const tempProducts = [...this.state.products];
  //     tempProducts[0].inCart = true;

  //     this.setState(
  //       () => {
  //         return { products: tempProducts };
  //       },
  //       () => {
  //         console.log("State products :", this.state.products[0].inCart);
  //         console.log("Data products :", storeProducts[0].inCart);
  //       }
  //     );
  //   };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
