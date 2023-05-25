import express from "express";
import openaiAuth from "../utils/openaiAuth";
const response = await openaiAuth.createEdit({
  model: "text-davinci-edit-001",
  input: "What day of the wek is it?",
  instruction: "Fix the spelling mistakes",
});
