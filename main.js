Vue.component('feedback', {
  template: `
  <div class="feedback">
    <h3>Let Us Know what you think!</h3>
    <div v-if="errors.length > 0">
      <p>Please Provide:</p>
      <ul>
        <li v-for="error of errors">{{error}}</li>
      </ul>
    </div>
    <form class='review-form' @submit.prevent="onSubmit">
      <label for="name">Name</label><input id="name" v-model="name" />
      
      <label for="comment">Comment</label><textarea id="comment" v-model="comment" />
      <div>
        <label for="rating">Rating</label>
        <select id="rating" v-model.number="rating" placeholder="Rate">
          <option disabled value="">Rate</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <button>Comment</button>
    </form>
  </div>
  `,
  
  data() {
    return {
      name: null,
      rating: null,
      comment: null,
      errors: [],
    };
  },

  methods: {
    onSubmit() {
      const { name, rating, comment } = this;
      if (name && rating && comment) {
        this.$emit('feedback', { name, rating, comment});
        this.name = null;
        this.rating = null;
        this.comment = null;
        this.errors = [];
      } else {
        for (const required of ['name', 'rating', 'comment']) {
          if (!this[required]) this.errors.push(required);
        }
      }
    }
  },
});

Vue.component('review', {
  props: {
    review: {
      required: true,
    }
  },
  template: `
    <div class='review'>
      <h3>{{review.name}}</h3>
      <p>Rating: {{review.rating}}</p>
      <p>Comment: {{review.comment}}</p>
    </div>
  `,
});

Vue.component('reviews', {
  props: {
    reviews: {
      default() { return [
        {
          name: 'John Doe',
          rating: 5,
          comment: 'This is great!'
        }
      ] }
    },
  },

  template: `
  <section class="reviews">
    <h2>Reviews</h2>
    <p v-if="reviews.length < 1">There are no reviews yet.</p>
    <ul v-if="reviews.length > 0">
      <li v-for="review of reviews">
        <review :review="review"></review>
      </li>
    </ul>
    <feedback @feedback="addFeedback"></feedback>
  </section>
  `,

  methods: {
    addFeedback(feedback) {
      this.reviews.push(feedback);
    }
  }
});

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
