# Task Manager



## Admin Credentials

- **Username:** admin@admin.com
- **Password:** 123456

## Live Site URL

Visit the live site at [FitFinesse Live](https://fitfinesse.netlify.app/)

## Server Site Repo

## Features


## How to Start the Application

1. **Clone the Repository**

    ```sh client-side
    git clone https://github.com/Sadek-1801/Fitfinesse-client.git
    cd Fitfinesse-client
    ```

    ```sh server-side
    git clone https://github.com/Sadek-1801/fitfinesse-server.git
    cd fitfinesse-server
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

3. **Start the Development Server**

    ```sh
    nodemon index.js
    ```

4. **Build for Production**

    ```sh
    npm run build
    ```

5. **Deploy to Surge**

    ```sh
    surge ./build your-live-site-url.surge.sh
    ```

## Dependencies



## Additional Information

- **Environment Variables:**
  - Create a `.env.local` file in the root of your project in the clientside and add the following variables:
    ```plaintext
    VITE_APIKEY=Your firebase config file
    VITE_AUTHDOMAIN=Your firebase config file
    VITE_PROJECTID=Your firebase config file
    VITE_STORAGEBUCKET=Your firebase config file
    VITE_MESSAGINGSENDERID=Your firebase config file
    VITE_APPID=Your firebase config file
    VITE_SERVER='http://localhost:9000'
    VITE_IMG_KEY= your imageBB Api key
    ```
  - Create a `.env` file in the root of your project in the serverside and add the following variables:
    ```plaintext
    DB_USER=your database userName in MongoDB
    DB_PASS=your database password in MongoDB
    ```

- **Folder Structure:**
  - `client/`: Contains the React frontend code.
  - `server/`: Contains the Express backend code.

## Contributing

If you'd like to contribute to this project, please fork the repository and use a feature branch. Pull requests are welcome.

## License

This project is open-source and available under the [MIT License](LICENSE).

