# Hospital UI

A React-based web application for managing hospital data, including hospitals, doctors, patients, and appointments.

## Features

- View, add, edit, and delete hospitals, doctors, patients, and appointments
- Responsive data tables and modal forms
- Organized pages for each entity
- Modular service layer for API calls
- Custom SCSS styling

## Folder Structure

```
hospital-ui/
├── public/                # Static assets and HTML template
├── src/
│   ├── components/        # Reusable UI components (DataTable, FormModal)
│   ├── pages/             # Main pages (Hospitals, Doctors, Patients, Appointments, Details)
│   ├── routes/            # AppRoutes for navigation
│   ├── services/          # API service modules
│   ├── styles/            # SCSS styles and variables
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── .env                   # Environment variables
├── .gitignore             # Git ignore file
├── package.json           # Project metadata and dependencies
└── README.md              # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd hospital-ui
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```
npm run build
```

## Customization

- Update API endpoints in the `src/services/` files.
- Modify SCSS styles in `src/styles/`.

## License

This project is licensed under the MIT License.
