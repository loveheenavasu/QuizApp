import { IQuestion, IQuizCardData } from "@/app/types/types";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import React from "react";

const QuestionCard: React.FC<IQuizCardData> = ({
  currentQuestions,
  handleOptions,
  selectedOption,
  handleClick,
  answerVisibility,
  collectedOptions,
  indexOfLastQuestion,
  handlePagination,
  currentPage,
}) => {
  return (
    <Box color="white" sx={{ m: 5 }}>
      {currentQuestions?.map((info: IQuestion, questionIndex: number) => (
        <Card
          key={questionIndex}
          className="questionCard"
          sx={{
            width: "27rem",
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
              <Typography ml={2} sx={{ fontSize: "18px" }} className="questionText">
                {info?.question?.text}
              </Typography>
            </Box>
            <Box mb={1} mt={2}>
              {collectedOptions.map((options, index) => (
                <Typography
                  key={index}
                  className="questionOptions"
                  onClick={() => handleOptions(options, indexOfLastQuestion, info.correctAnswer, answerVisibility.length)}
                  sx={{
                    cursor: "pointer",
                    ml: 2,
                    mt: 1,
                    p: 1,
                    borderRadius: ".7rem",
                    border: "1px solid #DEE5EF",
                    backgroundColor:
                      selectedOption[indexOfLastQuestion] === options
                        ? options === info.correctAnswer
                          ? "#058a05"
                          : "#e74c3c"
                        : "",
                  }}
                >
                  {options}
                </Typography>
              ))}
            </Box>
            <Box ml={2} mt={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  className="button"
                  onClick={() => handleClick(questionIndex)}
                >
                  {answerVisibility[questionIndex]
                    ? "Hide Answer"
                    : "View Answer"}
                </Button>
                <Box display="flex" gap="10px" className="paginateButtons">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      handlePagination(currentPage, -1);
                    }}
                    disabled={currentPage === 1}
                  >
                    <ArrowBackIcon className="icons"/>
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => {
                      handlePagination(currentPage, 1);
                    }}
                    disabled={currentPage === answerVisibility.length}
                  >
                    <ArrowForwardIcon className="icons"/>
                  </Button>
                </Box>
              </Box>

              {answerVisibility[questionIndex] && (
                <Typography
                  mt={2}
                  className="viewAnswer"
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
  );
};

export default QuestionCard;
