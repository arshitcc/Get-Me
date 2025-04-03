# Profile Edit Form with Next.js, OlaMaps & MongoDB

[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![OlaMaps](https://img.shields.io/badge/OlaMaps-00C853?style=for-the-badge)](https://www.olamaps.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white)](https://react-hook-form.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![ShadCN UI](https://img.shields.io/badge/ShadCN_UI-1A202C?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://ui.shadcn.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

## Overview

This project is a Next.js application that provides a robust profile edit form. It leverages:

- **Next.js** for server-side rendering and routing.
- **OlaMaps** for mapping or geolocation features.
- **MongoDB** for data persistence.
- **React** with **TypeScript** for a scalable and type-safe front-end.
- **React Hook Form** for effortless form state management and validation.
- **Tailwind CSS** for fast and customizable styling.
- **ShadCN UI** components for a modern, accessible UI.

The form allows users to edit their profile information including description, interests, social links, and address details.

## Features

- **Profile Editing:** Modify your profile details such as description, social links, and interests.
- **Dynamic Interests:** Add or remove interests dynamically using React Hook Form’s field arrays.
- **Address Management:** Update your address with fields for street, city, state, country, and postal code.
- **Responsive UI:** Styled with Tailwind CSS and ShadCN UI components for a seamless user experience.
- **Mapping Integration:** (Assumed via OlaMaps) Integrate mapping or geolocation features as needed.

## Technologies

- **[Next.js](https://nextjs.org/)** – React framework with server-side rendering.
- **[OlaMaps](https://www.olamaps.com/)** – Mapping/geolocation services.
- **[MongoDB](https://www.mongodb.com/)** – NoSQL database.
- **[React](https://reactjs.org/)** – UI library.
- **[React Hook Form](https://react-hook-form.com/)** – Form management library.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework.
- **[ShadCN UI](https://ui.shadcn.com/)** – Modern, accessible UI components.
- **[TypeScript](https://www.typescriptlang.org/)** – Typed superset of JavaScript.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or above)
- [MongoDB](https://www.mongodb.com/) instance
- A Next.js compatible IDE (e.g., VS Code)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name

2. **Install the dependencies:**
    ```bash
    npm install
3. Set up environment variables:

  Create a .env.local file at the root of your project and add the following:
  ```bash
  MONGODB_URI=your_mongodb_connection_string
  NEXT_PUBLIC_OLAMAPS_API_KEY=your_olamaps_api_key

```

4. Run the development server:

```
npm run dev
  
