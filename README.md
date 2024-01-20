# Radviz Visualization

<p align="center">
  <img src="https://raw.githubusercontent.com/navidadelpour/radviz-VA/master/screenshots/screenshot-1.png" />
</p>

This project utilizes [Create React App](https://github.com/facebook/create-react-app) for the frontend and Flask for the backend.

## Dependencies

Ensure the following dependencies and third-party libraries are installed on your system before running the project:

- Node.js
- npm
- Flask
- flask-cors
- scikit-learn (sklearn)
- pandas

## Setup

Follow these steps to set up and run the project:

1. **Installing Node Modules:**

   Open a terminal in the project folder and run the following command:

   ```bash
   npm install
   ```

   This will install all the required Node modules for the application.

2. **Run Flask Server:**

   Open a terminal in the project folder and navigate to the `/server` folder:

   ```bash
   cd server
   ```

   Set the debug mode to on:

   ```bash
   export FLASK_DEBUG=1
   ```

   Now, run the Flask server (by default, it will run on port 5000):

   ```bash
   flask run
   ```

   The server is now accessible at [http://localhost:5000](http://localhost:5000).

3. **Setup React App:**

   Open a terminal in the project folder:

   ```bash
   cd ..
   ```

   Now, you are back in the project folder. Run the following command to set up your React app (by default, it will run on port 3000):

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.

## Notes

I used [biovisualize/radviz](https://github.com/biovisualize/radviz) as a reference for radviz.js and d3.js.