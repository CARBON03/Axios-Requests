import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const yourUsername = "KalluKaliya";
const yourPassword = "KalaHuTohKyaHua";
const yourAPIKey = "8f87e3da-f53a-4714-8050-d6920a858e0f";
const yourBearerToken = "e8379c1d-156c-43c9-8551-d1fca0448019";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(" https://secrets-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/all?page=2", {
      auth: {
        username:  `${yourUsername}`,
        password: `${yourPassword}`,
      },
    });
    const result = response.data;
    res.render("index.ejs" , {content: JSON.stringify(result)});
  }catch{
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/apiKey",async (req, res) => {
  try {
    const response = await axios.get(`https://secrets-api.appbrewery.com/filter?score=5&apiKey=${yourAPIKey}`);
    const result = response.data;
    res.render("index.ejs", { content: JSON.stringify(result) });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try{
    const response = await axios.get("https://secrets-api.appbrewery.com/secrets/42", {
        headers: { 
          Authorization: `${yourBearerToken}` 
        },
    });
    const result = response.data;
    res.render("index.ejs" , {content: JSON.stringify(result)});
  }catch{
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
