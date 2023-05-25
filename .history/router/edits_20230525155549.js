import express from "express";
import openai from "../utils/openaiAuth";
const response = await openai.createEdit({
  model: "text-davinci-edit-001",
  input: "What day of the wek is it?",
  instruction: "Fix the spelling mistakes",
});
