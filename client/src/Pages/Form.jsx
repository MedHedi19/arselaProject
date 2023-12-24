import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { BsTrash } from "react-icons/bs";

import { useNavigate, useParams } from "react-router-dom";

import TextFieldsIcon from "@mui/icons-material/TextFields";

import CloseIcon from "@mui/icons-material/Close";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import FilterNoneIcon from "@mui/icons-material/FilterNone";

import ShortTextIcon from "@mui/icons-material/ShortText";
import SubjectIcon from "@mui/icons-material/Subject";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  FormControlLabel,
  IconButton,
  MenuItem,
  Radio,
  Select,
  Typography,
} from "@mui/material";

import axios from "axios";
import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function Form() {
  const navigate = useNavigate();

  const { id } = useParams();
  const [questions, setQuestions] = useState([
    {
      questionText: "Add a question",
      questionType: "radio",
      Option: [
        { optionText: "Option 1" },
        { optionText: "Option 2" },
        { optionText: "Option 3" },
        { optionText: "Option 4" },
      ],
      open: true,
      answer: false,
    },
  ]);

  const [documentName, setDocumentName] = useState("untitled Document");
  const [documentDescription, setDocumentDescription] =
    useState("untitled Document");

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    var itemgg = [...questions];
    const itemF = reorder(
      itemgg,
      result.source.index,
      result.destination.index
    );
    setQuestions(itemF);
  }
  const reorder = (list, StartIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(StartIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };
  const navigateToCreatedForm = () => {
    navigate(`/yourForm/${id}`);
  };
  function addMoreQuestionField(i) {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        questionText: "Question",
        questionType: "radio",
        Option: [{ optionText: "option1" }],
        open: true,
      },
    ]);
  }
  function copyQuestion(i) {
    let qs = [...questions];
    var newQuestion = { ...qs[i] };
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(i) {
    let qs = [...questions];
    if (questions.length > 1) {
      qs.splice(i, 1);
    }
    setQuestions(qs);
  }
  // function requiredQuestoin(i) {
  //   var reqQuestion = [...questions];
  //   reqQuestion[i].required = !reqQuestion.required;
  //   console.log(reqQuestion[i].required + "" + i);
  //   setQuestions(reqQuestion);
  // }
  function removeOption(i, j) {
    var RemoveOptionQuestion = [...questions];
    if (RemoveOptionQuestion[i].Option.length > 1) {
      RemoveOptionQuestion[i].Option.splice(j, 1);
      setQuestions(RemoveOptionQuestion);
    }
  }
  // function expandedCloseAll() {
  //   let qs = [...questions];
  //   for (let j = 0; j < qs.length; j++) {
  //     qs[j].open = false;
  //   }
  //   setQuestions(qs);
  // }
  function handleExpand(i) {
    let qs = [...questions];
    for (let j = 0; j < qs.length; j++) {
      if (i === j) {
        qs[j].open = true;
      } else {
        qs[j].open = false;
      }
    }
    setQuestions(qs);
  }
  async function commitToDB() {
    try {
      await axios.post(`http://localhost:5000/addQuestion/${id}`, {
        documentName: documentName,
        docDesc: documentDescription,
        questions: questions,
      });
      console.log("Data added to DB successfully");
      navigateToCreatedForm();
    } catch (err) {
      console.log(err.message);
    }
  }

  function changeQuestion(text, i) {
    var newQuestion = [...questions];
    newQuestion[i].questionText = text;
    setQuestions(newQuestion);
    console.log(newQuestion);
  }

  function changeOptionValue(text, i, j) {
    var optionsQuestion = [...questions];
    optionsQuestion[i].Option[j].optionText = text;
    setQuestions(optionsQuestion);
  }

  function addQuestionType(i, type) {
    var qs = [...questions];
    console.log(type);
    qs[i].questionType = type;
    setQuestions(qs);
  }

  function addOption(i) {
    var optionsOfQuestion = [...questions];
    if (optionsOfQuestion[i].Option.length < 5) {
      optionsOfQuestion[i].Option.push({
        optionText: "Option" + (optionsOfQuestion[i].Option.length + 1),
      });
    } else {
      console.log("Max 5 options");
    }

    setQuestions(optionsOfQuestion);
  }

  function questionUI() {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={ques.id} index={i}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div>
              <div style={{ marginBottom: "0px" }}>
                <div style={{ width: "100%", marginBottom: "0px" }}>
                  <DragIndicatorIcon
                    style={{
                      transform: "rotate(-90deg)",
                      color: "#DAE0E2",
                      position: "relative",
                      left: "300px",
                      fontSize: "small",
                    }}
                  />
                </div>
                <div key={i}>
                  <Accordion
                    expanded={questions[i].open}
                    onChange={() => {
                      handleExpand(i);
                    }}
                    className={
                      questions[i].open
                        ? "border-l-6-[px] border-solid border-blue-500"
                        : ""
                    }
                  >
                    <AccordionSummary
                      aria-controls={`panel${i}-content`}
                      id={`panel${i}-header`}
                      elevation={1}
                      style={{ width: "100%" }}
                    >
                      {!ques.open ? (
                        <div className="saved_questions">
                          <Typography
                            style={{
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: ".1px",
                              lineHeight: "24px",
                              paddingBottom: "8px",
                            }}
                          >
                            {i + 1}. {questions[i].questionText}
                          </Typography>
                          {ques.Option?.map((op, j) => (
                            <div key={j}>
                              <div style={{ display: "flex" }}>
                                <FormControlLabel
                                  style={{
                                    marginLeft: "5px",
                                    marginBottom: "5px",
                                  }}
                                  disabled
                                  control={
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      style={{ marginRight: "3px" }}
                                      // required={ques.type}
                                    />
                                  }
                                  label={
                                    <Typography
                                      style={{
                                        fontFamily: "Roboto, Arial, sans-serif",
                                        fontSize: "13px",
                                        fontWeight: "400",
                                        letterSpacing: ".2px",
                                        lineHeight: "20px",
                                        color: "#202124",
                                      }}
                                    >
                                      {ques.Option[j].optionText}
                                    </Typography>
                                  }
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </AccordionSummary>
                    {questions[i].open ? (
                      <div className="flex flex-row justify-center">
                        <AccordionDetails className="bg-white rounded-lg py-[22px] pb-[25px] pt-0 capitalize flex flex-col w-[93%] ml-2.5">
                          <div className="flex flex-row items-center justify-between">
                            <input
                              type="text"
                              style={{
                                fontFamily:
                                  "'Google Sans', Roboto, Arial, sans-serif",
                              }}
                              className="box-border mt-2.5 text-sm font-normal flex-1	leading-[40px] w-[40px]border-none outline-none text-black mr-2.5 p-2.5 focus:border-b-[1px] focus:border-purple-700 focus:bg-gray-100"
                              placeholder="Question"
                              value={ques.questionText}
                              onChange={(e) => {
                                changeQuestion(e.target.value, i);
                              }}
                            />
                            <CropOriginalIcon style={{ color: "#5f6368" }} />
                            <Select
                              className="h-[40px] w-[230px] p-5 px-15 mx-2.5 rounded-[3px] border-[1.5px] border-solid border-gray-300 text-black bg-transparent"
                              style={{ color: "#5f6368", fontSize: "13px" }}
                            >
                              <MenuItem
                                className="text-gray-300"
                                id="text"
                                value="Text"
                                onClick={(e) => {
                                  addQuestionType(i, "text");
                                }}
                              >
                                <SubjectIcon style={{ marginRight: "10px" }} />
                                Paragraph
                              </MenuItem>
                              <MenuItem
                                className="text-gray-300"
                                id="checkbox"
                                value="checkbox"
                                onClick={(e) => {
                                  addQuestionType(i, "checkbox");
                                }}
                              >
                                <CheckBoxIcon
                                  style={{
                                    marginRight: "10px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />
                                Checkboxes
                              </MenuItem>
                              <MenuItem
                                className="text-gray-300"
                                id="radio"
                                value="Radio"
                                onClick={(e) => {
                                  addQuestionType(i, "radio");
                                }}
                              >
                                <Radio
                                  style={{
                                    marginRight: "18px",
                                    color: "#70757a",
                                  }}
                                  checked
                                />
                                Multiple Choice
                              </MenuItem>
                            </Select>
                          </div>
                          {ques.Option.map((op, j) => (
                            <div className="flex items-center" key={j}>
                              {ques.questionType !== "text" ? (
                                <input
                                  type={ques.questionType}
                                  style={{ marginRight: "10px" }}
                                />
                              ) : (
                                <ShortTextIcon
                                  style={{ marginRight: "10px" }}
                                />
                              )}
                              <div>
                                <input
                                  type="text"
                                  className="outline-none border-none h-[40px] w-[490px] text-sm font-normal font-sans text-gray-800 focus:border-b-[1.5px] focus:border-purple-700"
                                  placeholder="option"
                                  value={ques.Option[j].optionText}
                                  onChange={(e) => {
                                    changeOptionValue(e.target.value, i, j);
                                  }}
                                />
                              </div>
                              <CropOriginalIcon style={{ color: "#5f6368" }} />
                              <IconButton aria-label="delete">
                                <CloseIcon
                                  onClick={() => {
                                    removeOption(i, j);
                                  }}
                                />
                              </IconButton>
                            </div>
                          ))}

                          {ques.Option.length < 5 ? (
                            <div className="flex items-center">
                              <FormControlLabel
                                disabled
                                control={
                                  ques.questionType !== "text" ? (
                                    <input
                                      type={ques.questionType}
                                      color="primary"
                                      inputProps={{
                                        "aria-label": "secondary chekbox",
                                      }}
                                      style={{
                                        marginLeft: "10px",
                                        marginRight: "10px",
                                      }}
                                      disabled
                                    />
                                  ) : (
                                    <ShortTextIcon
                                      style={{ marginRight: "10px" }}
                                    />
                                  )
                                }
                                label={
                                  <div>
                                    <input
                                      type="text"
                                      className="outline-none border-none h-[40px] w-[490px] text-sm font-normal font-sans text-gray-800 focus:border-b-[1.5px] focus:border-purple-700"
                                      style={{
                                        fontSize: " 13px",
                                        width: "60px",
                                      }}
                                      placeholder="Add other"
                                    ></input>
                                    <Button
                                      size="small"
                                      onClick={() => {
                                        addOption(i);
                                      }}
                                      style={{
                                        textTransform: " none",
                                        color: "#4285f4",
                                        fontSize: "13px",
                                        fontweight: "600",
                                      }}
                                    >
                                      Add Option
                                    </Button>
                                  </div>
                                }
                              />
                            </div>
                          ) : (
                            ""
                          )}
                          <div className="justify-between flex">
                            <div className="mt-[12px] flex justify-end items-center border-t-[1px] border-solid border-gray-300 ">
                              <div className="justify-between flex"></div>
                              <div className="mt-[12px] flex justify-end items-center border-t-[1px] border-solid border-gray-300 ">
                                <IconButton
                                  aria-label="Copy"
                                  onClick={() => {
                                    copyQuestion(i);
                                  }}
                                >
                                  <FilterNoneIcon />
                                </IconButton>
                                <IconButton
                                  aria-label="delete"
                                  onClick={() => {
                                    deleteQuestion(i);
                                  }}
                                >
                                  <BsTrash />
                                </IconButton>

                                <IconButton>
                                  <MoreVertIcon />
                                </IconButton>
                              </div>
                            </div>
                          </div>
                        </AccordionDetails>
                        <div className="bg-[#F4F4F9] flex justify-center items-center flex-col mr-[12px] mt-2.5 mb-0 p-[1px] rounded-[3px] h-[180px] w-[35px]">
                          <AddCircleOutlineIcon
                            onClick={addMoreQuestionField}
                            className="flex p-auto justify-center text-[#516368]"
                          />
                          <OndemandVideoIcon className="flex p-auto justify-center text-[#516368] " />
                          <CropOriginalIcon className="flex p-auto justify-center text-[#516368]" />
                          <TextFieldsIcon className="flex p-auto justify-center text-[#516368]" />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    ));
  }

  return (
    <div className="flex  justify-center  bg-slate-200 h-[100vh] w-[100w]">
      <div className=" justify-center items-center">
        <br />
        <div className="section">
          <div className="qestionformtop">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fromName"
              type="text"
              placeholder="Form name"
              onChange={(e) => {
                setDocumentName(e.target.value);
              }}
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="formDesc"
              type="text"
              placeholder="description du form"
              onChange={(e) => {
                setDocumentDescription(e.target.value);
              }}
            />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {questionUI()}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div className="save_form">
          <Button
            variant="contained"
            color="primary"
            onClick={commitToDB}
            style={{ fontSize: "14px" }}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Form;
