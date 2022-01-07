Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true,
    }
  },
  template: `
<ul>
  <li v-for="detail in details">{{ detail }}</li>
</ul>
  `
});

Vue.component("product", {
  props: {
    premium: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  template: `
<div class="product">
  <div class="product-image">
    <img :src="image" />
  </div>
  <div class="product-info">
    <h1>{{ title }}</h1>
    <p>{{ stockMessage }}</p>
    <!-- <p v-if="inventory > 10">In stock</p>
    <p v-else-if="inventory > 0 && inventory <= 10">Almost out!</p>
    <p v-else>Out of stock</p> -->
    <p>Shipping: {{shipping}}</p>
    <product-details :details="details" />
    <div
      v-for="variant of variants"
      :key="variant.id"
      class="color-box"
      :style="{background: variant.color}"
      @mouseover="setVariant(variant)"
    ></div>
    <button
      @click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton: !inStock}"
    >
      Add to Cart
    </button>
  </div>
</div>

  `,

  data() {
    const variants = [
      {
        id: 2234,
        color: "green",
        image: "./assets/vmSocks-green-onWhite.jpeg",
        inventory: 0,
      },
      {
        id: 2235,
        color: "blue",
        image: "./assets/vmSocks-blue-onWhite.jpeg",
        inventory: 10,
      },
    ];

    return {
      selected: 0,
      variant: variants[0],
      brand: "Company",
      product: "Socks",
      details: ["80% Cotton", "20% Polyester", "Gender neutral"],
      variants,
      cart: 0,
    };
  },

  methods: {
    addToCart() {
      this.$emit('add-to-cart', this.variant);
      // this.cart += 1;
    },

    setVariant(variant) {
      this.variant = variant;
    },
  },

  computed: {
    title() {
      return `${this.brand} ${this.product}`;
    },

    inventory() {
      return this.variant.inventory;
    },

    image() {
      return this.variant.image;
    },

    inStock() {
      return this.inventory > 0;
    },

    stockMessage() {
      if (this.inventory < 1) return "Out of stock";
      if (this.inventory > 0 && this.inventory <= 10) return "Running low!";
      if (this.inventory > 10) return "In stock";
    },

    shipping() {
      if (this.premium) return 'Free';
      return "$2.99";
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: [],
  },

  methods: {
    addToCart(variant) {
      this.cart.push(variant)
    },
  },
});
