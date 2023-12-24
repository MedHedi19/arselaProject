import { Button, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserForm() {
  const navigate = useNavigate();

  const [answer, setAnswer] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [documentDescription, setDocumentDescription] = useState("");
  const { id } = useParams();

  function select(que, option) {
    const k = answer.findIndex((ele) => ele.question === que);

    answer[k].answer = option;
    setAnswer(answer);
  }

  useEffect(() => {
    async function getData() {
      try {
        const request = await axios.get(`http://localhost:5000/data/${id}`);
        setDocumentName(request.data.documentName);
        setDocumentDescription(request.data.docDesc);
        setQuestions(request.data.questions);
      } catch (err) {
        console.log(err.message);
      }
    }
    getData();
  }, [id]);
  const postAnswerData = {};

  function selectInput(que, option) {
    const k = answer.findIndex((ele) => ele.question === que);

    answer[k].answer = option;
    setAnswer(answer);
    console.log(answer);
  }

  function selectCheck(e, que, option) {
    var d = [];
    const k = answer.findIndex((ele) => ele.question === que);
    if (answer[k].answer) {
      d = answer[k].answer.split(",");
    }
    if (e === true) {
      d.push(option);
    } else {
      const n = d.findIndex((el) => el.option === option);
      d.splice(n, 1);
    }
    answer[k].answer = d.join(",");
    setAnswer(answer);
  }
  async function deleteForm() {
    try {
      await axios.delete(`deleteForm/${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  async function submit() {
    answer?.map((ele) => {
      postAnswerData[ele.question] = ele.answer;
      return null;
    });
    try {
      await axios.post(`http://localhost:5000/userAnswer/${id}`, {
        answerData: [postAnswerData],
      });

      navigate(`/submitted`);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-[#F4F4F9]">
      <div className="bg-[#F4F4F9] h-[100%] p-5">
        <div className="m-[auto] w-[44%] flex flex-col">
          <div className="bg-white border-t-8 border-purple-700 rounded-lg py-[15px] px-[25px] mb-[8px] capitalize">
            <Typography style={{ fontSize: "26px" }}>{documentName}</Typography>
            <Typography style={{ fontSize: "15px" }}>
              {documentDescription}
            </Typography>
          </div>

          {questions?.map((question, qindex) => (
            <div className="float-left">
              <Typography
                style={{
                  fontWeight: "400",
                  letterSpacing: ".1px",
                  lineHeight: "24px",
                  paddingBottom: "8px",
                  fontSize: "14px",
                }}
              >
                {qindex + 1}. {question.questionText}
              </Typography>
              {question.options?.map((ques, index) => (
                <div key={index} style={{ marginBottom: "5px" }}>
                  <div style={{ display: "flex" }}>
                    <div className="form-check">
                      {question.questionType !== "radio" ? (
                        question.questionType !== "text" ? (
                          <label>
                            <input
                              type={question.questionType}
                              name={qindex}
                              value={ques.optionText}
                              className="form-check-input"
                              style={{ margnLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                selectCheck(
                                  e.target.checked,
                                  question.questionText,
                                  ques.optionText
                                );
                              }}
                            />
                            {ques.optionText}
                          </label>
                        ) : (
                          <label>
                            <input
                              type={question.questionType}
                              name={qindex}
                              value={ques.optionText}
                              className="form-check-input"
                              style={{ margnLeft: "5px", marginRight: "5px" }}
                              onChange={(e) => {
                                selectInput(
                                  question.questionText,
                                  e.target.value
                                );
                              }}
                            />
                            {ques.optionText}
                          </label>
                        )
                      ) : (
                        <label>
                          <input
                            type={question.questionType}
                            name={qindex}
                            value={ques.optionText}
                            className="form-check-input"
                            style={{ margnLeft: "5px", marginRight: "5px" }}
                            onChange={() => {
                              select(question.questionText, ques.optionText);
                            }}
                          />
                          {ques.optionText}
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          <div className="float-left">
            <Button
              constiant="contained"
              color="primary"
              onClick={submit}
              style={{ fontSize: "14px" }}
            >
              Submit
            </Button>
            <Button
              constiant="contained"
              color="primary"
              onClick={navigate(`/${id}`)}
              style={{ fontSize: "14px" }}
            >
              Modify the form
            </Button>
            <Button
              constiant="contained"
              color="primary"
              onClick={() => deleteForm}
              style={{ fontSize: "14px" }}
            >
              Delete the form
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;
