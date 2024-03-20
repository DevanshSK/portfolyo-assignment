
# Portfolyo Frontend Intership Assignment

In this assignment, I have to convert the static portfolio website into a dynamic portfolio website by fetching the user data from a backend API.

The live deployment can be found at this url:

[Live deployment here](https://github.com/abhayg951/ADDLearn)

## Steps to Run locally

1. Clone this repository and open it in code editor (Preferrd VS Code).
2. Create a new `.env` file and add this enviroment variable

    ```text
        NEXT_PUBLIC_API_URL=https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae
    ```

3. Run this commanmd `npm install` to install all dependencies.
4. Run `npm run dev` to start the website on the url `https://localhost:3000`.

## Some Issues that I have addressed

1. In the user data API, the blogs and the pricing data is not present, So I have implemented a feature that dynamically diaplays only those sections whose data are present in the API response.
2. In the `work-single` page, we do not have adequate data to properly display the project dynamically, so I have left it there.
