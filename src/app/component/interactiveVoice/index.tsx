"use client";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { IQuestion } from "../../types/types";
import CircleIcon from "@mui/icons-material/Circle";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

export function InteractiveVoice() {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [answerVisibility, setAnswerVisibility] = useState<boolean[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions").then((data: any) => {
      setQuizData(data?.data);
      if (data?.status === 200) {
        setLoading(false);
        setAnswerVisibility(Array(data.data.length).fill(false));
      }
    });
  }, []);

  const handleClick = useCallback(
    (questionIndex: number, selectedAnswer: string) => {
      setSelectedOption(selectedAnswer);
      setAnswerVisibility((prevVisibility) => {
        const newVisibility = [...prevVisibility];
        newVisibility[questionIndex] = !newVisibility[questionIndex];
        return newVisibility;
      });
    },
    []
  );

  const handleOptions = useCallback((selectedAnswer: string) => {
    setSelectedOption(selectedAnswer);
  }, []);

  return (
    <>
      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Box color="white">
          {quizData?.map((info: IQuestion, questionIndex: number) => (
            <Card
              key={questionIndex}
              sx={{
                marginBottom: 4,
                width: "75vh",
                borderRadius: ".7rem",
                transition: "transform 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.06)",
                },
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center">
                  <CircleIcon sx={{ fontSize: "10px" }} />
                  <Typography ml={2} sx={{ fontSize: "18px" }}>
                    {info?.question?.text}
                  </Typography>
                </Box>
                <Typography
                  onClick={() => handleOptions(info?.correctAnswer)}
                  sx={{
                    cursor: "pointer",
                    border: "1px solid #DEE5EF",
                    ml: 2,
                    mt: 2,
                    p: 1,
                    borderRadius: ".7rem",
                    backgroundColor:
                      selectedOption === info.correctAnswer ? "green" : "",
                  }}
                >
                  {info?.correctAnswer}
                </Typography>
                <Box mb={1}>
                  {info?.incorrectAnswers.map((options, index) => (
                    <Typography
                      key={index}
                      onClick={() => handleOptions(options)}
                      sx={{
                        cursor: "pointer",
                        ml: 2,
                        mt: 1,
                        p: 1,
                        borderRadius: ".7rem",
                        border: "1px solid #DEE5EF",
                        backgroundColor:
                          selectedOption === options
                            ? options === info.correctAnswer
                              ? "#2ecc71"
                              : "#e74c3c"
                            : "",
                      }}
                    >
                      {options}
                    </Typography>
                  ))}
                </Box>
                <Box ml={2} mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleClick(questionIndex, "")}
                  >
                    {answerVisibility[questionIndex]
                      ? "Hide Answer"
                      : "View Answer"}
                  </Button>
                  {answerVisibility[questionIndex] && (
                    <Typography
                      mt={2}
                      sx={{
                        color: "green",
                        border: "1px solid green",
                        borderRadius: ".7rem",
                        p: 1,
                      }}
                    >
                      {info?.correctAnswer}
                    </Typography>
                  )}
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </>
  );
}
