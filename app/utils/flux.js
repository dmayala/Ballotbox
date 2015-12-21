import Alt from 'alt';
import AltResolver from 'utils/altResolver';

class Flux extends Alt {

  constructor(config = {}) {
    super(config);

    this._resolver = new AltResolver();

    // Register Actions
    this.addActions('home', require('actions/HomeActions'));
    // this.addActions('productDetails', require('actions/ProductDetailsActions'));
    // this.addActions('cart', require('actions/CartActions'));

    // Register Stores
    // this.addStore('productList', require('stores/ProductListStore'));
    // this.addStore('productDetails', require('stores/ProductDetailsStore'));
    // this.addStore('cart', require('stores/CartStore'));
  }

  resolve(result) {
    this._resolver.resolve(result);
  }

  render(handler) {
    return this._resolver.render(handler, this);
  }
}

export default Flux;
