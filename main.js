const app = new Vue({
  el: "#app",

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
      this.cart += 1;
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
      if (this.inventory > 0 && this.inventory <= 10)
        return "Running low!";
      if (this.inventory > 10) return "In stock";
    },
  },
});
