# L-on-line Project

## Overview

L-on-line is a React-based application designed to manage and display product information. The project leverages modern web development technologies and tools, ensuring a responsive and user-friendly experience. The application is deployed on Netlify for easy access and scalability.

## Features

- **User Authentication**
  - Home component with a button to navigate to the login page using React Router.

- **Product Management**
  - Fetch, create, update, and delete products.
  - Display a list of products using the `ProductList` and `Products` components.
  - Product details are shown through the `ProductCard` component.

- **Styling**
  - Utilizes SCSS for consistent and responsive design with primary and secondary color themes.
  
- **Components**
  - `UserPage`: Displays user-specific information with buttons to view the cart and products.
  - `ProductCard`: Uses React Bootstrap's Card and CardGroup components to display products.
  - Carousel: Implemented using React Bootstrap components.

## Technologies Used

### Frontend
- React
- React Router
- React Bootstrap
- SCSS
- Vite (build tool)

### Backend
- Express
- SQL

## Deployment

The application is deployed on Netlify. You can access the live version of the application [here](https://lonline.netlify.app/).

## Setup Instructions

### Prerequisites
- Node.js
- npm (or yarn)

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/L-on-line.git
    ```
2. Navigate to the project directory:
    ```sh
    cd L-on-line
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

### Development

1. Start the development server:
    ```sh
    npm run dev
    ```
    or
    ```sh
    yarn dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- React
- React Router
- React Bootstrap
- SCSS
- Vite
- Netlify
