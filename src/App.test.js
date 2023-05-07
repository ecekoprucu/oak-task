import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  render(<App />);
});

test("renders header title", () => {
  const linkElement = screen.getByText("Check List");
  expect(linkElement).toBeInTheDocument();
});

test("renders add task area", () => {
  expect(screen.getByTestId("addTask-button-wrapper")).toBeInTheDocument();
  const addButton = screen.getByTestId("add-task");
  fireEvent.click(addButton);
  expect(screen.getByTestId("addTask-area")).toBeInTheDocument();
});

test("adds task correctly", () => {
  const addButton = screen.getByTestId("add-task");
  fireEvent.click(addButton);
  const taskInput = screen.getByTestId("addTask-input");
  fireEvent.change(taskInput, { target: { value: "test123" } });
  fireEvent.change(screen.getByTestId("addTask-select"), {
    target: { value: "foundation" },
  });
  let options = screen.getAllByTestId("addTask-option");
  expect(options[0].selected).toBeTruthy();
  expect(options[1].selected).toBeFalsy();
  expect(options[2].selected).toBeFalsy();
  const saveButton = screen.getByTestId("addTask-saveTaskButton");
  fireEvent.click(saveButton);

  expect(screen.getByText("test123")).toBeInTheDocument();
});

test("edits and deletes task correctly", () => {
  const editButton = screen.getByTestId("editTask-button");
  fireEvent.click(editButton);
  const editInput = screen.getByTestId("editTask-input");
  expect(editInput).toBeInTheDocument();
  fireEvent.change(editInput, { target: { value: "test234" } });

  fireEvent.click(editButton);
  expect(screen.getByText("test234")).toBeInTheDocument();

  const deleteButton = screen.getByTestId("deleteTask-button");
  fireEvent.click(deleteButton);

  expect(screen.queryByText("test234")).not.toBeInTheDocument();
});

test("completes task correctly", async () => {
  const addButton = screen.getByTestId("add-task");
  fireEvent.click(addButton);
  const taskInput = screen.getByTestId("addTask-input");
  fireEvent.change(taskInput, { target: { value: "test123" } });
  fireEvent.change(screen.getByTestId("addTask-select"), {
    target: { value: "foundation" },
  });
  const saveButton = screen.getByTestId("addTask-saveTaskButton");
  fireEvent.click(saveButton);

  await waitFor(() => {
    expect(screen.getByTestId("completeTask-checkbox")).toBeInTheDocument();
    expect(screen.getByTestId("completeTask-checkbox")).not.toBeChecked();
  });

  fireEvent.click(screen.getByTestId("completeTask-checkbox"));

  await waitFor(() => {
    expect(screen.getByTestId("completeTask-checkbox")).toBeChecked();
  });
});
