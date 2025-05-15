# Shopping Cart Application

A fully functional shopping cart application built with React, featuring product listing, cart management, discount coupons, and localStorage persistence.

## Features

### Product Display
- Displays 10+ products with images, names, descriptions, and prices
- Products are presented in a responsive grid layout
- Each product has an "Add to Cart" button

### Cart Functionality
- **Add to Cart**: Add products to your shopping cart
- **Update Quantities**: Increase or decrease product quantities
- **Remove Items**: Remove products from your cart
- **Real-time Total**: Cart total updates automatically as you make changes
- **Discount Coupon**: Apply a discount code for 10% off your order

### Data Persistence
- Cart data is saved in your browser's localStorage
- Your cart items remain even if you close the browser or refresh the page

### Input Validation
- Prevents invalid quantity inputs (negative numbers, zero)
- Validates coupon codes using pattern matching
- Shows clear error messages for invalid inputs

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Adapts layout based on screen size

## How to Use

### Installation and Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd shopping-cart
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open in your browser:
   ```
   http://localhost:5173/
   ```

### Using the Shopping Cart

#### Browsing Products
- Scroll through the products displayed in the grid
- View product images, names, descriptions, and prices

#### Adding Items to Cart
- Click the "Add to Cart" button on any product
- The item will appear in your cart with a quantity of 1
- If you add the same product again, the quantity will increase

#### Managing Cart Items
- **Increase Quantity**: Click the "+" button next to an item
- **Decrease Quantity**: Click the "-" button (minimum quantity is 1)
- **Direct Input**: Type a specific quantity in the number field
- **Remove Item**: Click the "Remove" button to completely remove an item

#### Applying a Discount Coupon
- Enter `WEB3BRIDGECOHORTx` in the coupon input field
- Click "Apply" to get a 10% discount on your entire order
- The coupon code is case-sensitive
- You'll see both the subtotal and discounted total in your cart summary

#### Cart Persistence
- Your cart items and applied coupon are saved automatically
- Close the browser or refresh the page, and your cart will remain intact
- The cart data is stored locally in your browser and not shared with others

## Development

### Project Structure
```
shopping-cart/
├── public/
│   └── images/           # Product images
├── src/
│   ├── components/       # React components
│   │   ├── Product.jsx   # Individual product display
│   │   ├── ProductList.jsx # List of all products
│   │   └── Cart.jsx      # Shopping cart component
│   ├── data/
│   │   └── products.js   # Product data
│   ├── App.jsx           # Main application component
│   ├── App.css           # Application styles
│   ├── App.test.js       # Unit tests
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json          # Dependencies and scripts
└── vite.config.js        # Vite configuration
```

### Running Tests
Run the test suite with:
```
npm test
```

The tests verify:
- Adding products to cart
- Updating product quantities
- Removing products from cart
- Applying valid and invalid coupon codes
- Calculating totals with and without discounts

### Tech Stack
- **React**: UI library
- **Vite**: Build tool and development server
- **Vitest**: Testing framework
- **localStorage API**: For data persistence

## Coupon Code

For testing the discount functionality, use the following coupon:

```
WEB3BRIDGECOHORTx
```

This will apply a 10% discount to your entire order.

## License

This project is open-source under the MIT License.