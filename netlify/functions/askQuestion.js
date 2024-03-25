// /netlify/functions/askQuestion.js
const process = require("process");
const fetch = require("node-fetch");

const APP_ID = process.env.APP_ID; // Set this in Netlify Environment Variables
const API_KEY = process.env.API_KEY; // Set this in Netlify Environment Variables

exports.handler = async (event) => {
  const { question } = JSON.parse(event.body);
  const response = await fetch("https://api.youai.ai/developer/v1/apps/run", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      appId: APP_ID,
      variables: { question },
    }),
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify({ answer: data }), // Adjust based on the API response structure
  };
};
