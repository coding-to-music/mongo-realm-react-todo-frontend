import React from "react";
import styled from "@emotion/styled";
import useTasks from "../graphql/useTasks";
import TaskContent from "./TaskContent";
import TaskDetailModal from "./TaskDetailModal";
import useStreets from "../graphql/useStreets";
import StreetContent from "./StreetContent";
import StreetDetailModal from "./StreetDetailModal";
import EditPermissionsModal from "./EditPermissionsModal";
import Card from "./Card";
import Button from "@leafygreen-ui/button";
import ButtonGroup from "./ButtonGroup";
import TextInput from "@leafygreen-ui/text-input";
import { uiColors } from "@leafygreen-ui/palette";

import Loading from "./Loading";

export default function ProjectScreen({
  currentProject,
  isEditingPermissions,
  setIsEditingPermissions,
}) {
  return (
    <Container>
      {currentProject && <TaskList currentProject={currentProject} />}
      <EditPermissionsModal
        isEditingPermissions={isEditingPermissions}
        setIsEditingPermissions={setIsEditingPermissions}
      />
      {currentProject && <StreetList currentProject={currentProject} />}
      <EditPermissionsModal
        isEditingPermissions={isEditingPermissions}
        setIsEditingPermissions={setIsEditingPermissions}
      />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  grid-area: main;
  background: ${uiColors.gray.light2};
`;

function useDraftTask({ addTask }) {
  const [draftTask, setDraftTask] = React.useState(null);
  const createDraftTask = () => {
    setDraftTask({ name: "" });
  };
  const deleteDraftTask = () => {
    setDraftTask(null);
  };
  const setDraftTaskName = (name) => {
    setDraftTask({ name });
  };
  const submitDraftTask = async () => {
    await addTask(draftTask);
    setDraftTask(null);
  };
  return {
    draftTask,
    createDraftTask,
    deleteDraftTask,
    setDraftTaskName,
    submitDraftTask,
  };
}

function useDraftStreet({ addStreet }) {
  const [draftStreet, setDraftStreet] = React.useState(null);
  const createDraftStreet = () => {
    setDraftStreet({ name: "" });
  };
  const deleteDraftStreet = () => {
    setDraftStreet(null);
  };
  const setDraftStreetName = (name) => {
    setDraftStreet({ name });
  };
  const submitDraftStreet = async () => {
    await addStreet(draftStreet);
    setDraftStreet(null);
  };
  return {
    draftStreet,
    createDraftStreet,
    deleteDraftStreet,
    setDraftStreetName,
    submitDraftStreet,
  };
}

function TaskList({ currentProject }) {
  const { tasks, addTask, loading } = useTasks(currentProject);
  const getTaskById = (id) => tasks.find((task) => task._id === id);
  const [selectedTaskId, setSelectedTaskId] = React.useState(null);
  const selectedTask = getTaskById(selectedTaskId);

  const {
    draftTask,
    createDraftTask,
    deleteDraftTask,
    setDraftTaskName,
    submitDraftTask,
  } = useDraftTask({ addTask });

  return loading ? (
    <Loading />
  ) : (
    <>
      <TaskListHeader>
        <h1>Tasks</h1>
      </TaskListHeader>
      <List>
        {tasks.length === 0 ? (
          <TaskListHeader>
            <h1>No Tasks</h1>
            <p>Click the button below to add a task to this project</p>
          </TaskListHeader>
        ) : (
          ((
            <TaskListHeader>
              <h1>Tasks</h1>
            </TaskListHeader>
          ),
          tasks.map((task) => (
            <ListItem key={task._id}>
              <Card onClick={() => setSelectedTaskId(task._id)}>
                <TaskContent task={task} />
              </Card>
            </ListItem>
          )))
        )}
        {draftTask ? (
          <ListItem>
            <Card>
              <TextInput
                type="text"
                aria-labelledby="task description"
                placeholder="Do the dishes"
                onChange={(e) => {
                  setDraftTaskName(e.target.value);
                }}
                value={draftTask.name}
              />
              <ButtonGroup>
                <Button
                  variant="primary"
                  disabled={!draftTask.name}
                  onClick={() => {
                    submitDraftTask();
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteDraftTask();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Card>
          </ListItem>
        ) : (
          <ListItem>
            <Card>
              <Button onClick={() => createDraftTask()}>Add Task</Button>
            </Card>
          </ListItem>
        )}
      </List>
      <TaskDetailModal
        project={currentProject}
        task={selectedTask}
        unselectTask={setSelectedTaskId}
      />
    </>
  );
}

function StreetList({ currentProject }) {
  const { streets, addStreet, loading } = useStreets(currentProject);
  const getStreetById = (id) => streets.find((street) => street._id === id);
  const [selectedStreetId, setSelectedStreetId] = React.useState(null);
  const selectedStreet = getStreetById(selectedStreetId);

  const {
    draftStreet,
    createDraftStreet,
    deleteDraftStreet,
    setDraftStreetName,
    submitDraftStreet,
  } = useDraftStreet({ addStreet });

  return loading ? (
    <Loading />
  ) : (
    <>
      <List>
        {streets.length === 0 ? (
          <StreetListHeader>
            <h1>No Streets</h1>
            <p>Click the button below to add a street to this project</p>
          </StreetListHeader>
        ) : (
          ((
            <StreetListHeader>
              <h1>Streets</h1>
            </StreetListHeader>
          ),
          streets.map((street) => (
            <ListItem key={street._id}>
              <Card onClick={() => setSelectedStreetId(street._id)}>
                <StreetContent street={street} />
              </Card>
            </ListItem>
          )))
        )}
        {draftStreet ? (
          <ListItem>
            <Card>
              <TextInput
                type="text"
                aria-labelledby="street description"
                placeholder="Washington (Name of Street)"
                onChange={(e) => {
                  setDraftStreetName(e.target.value);
                }}
                value={draftStreet.name}
              />
              <TextInput
                type="text"
                aria-labelledby="from description"
                placeholder="From Cross Street Name"
                onChange={(e) => {
                  setDraftStreetFrom(e.target.value);
                }}
                value={draftStreet.from}
              />
              <ButtonGroup>
                <Button
                  variant="primary"
                  disabled={!draftStreet.name}
                  onClick={() => {
                    submitDraftStreet();
                  }}
                >
                  Add
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteDraftStreet();
                  }}
                >
                  Cancel
                </Button>
              </ButtonGroup>
            </Card>
          </ListItem>
        ) : (
          <ListItem>
            <Card>
              <Button onClick={() => createDraftStreet()}>Add Street</Button>
            </Card>
          </ListItem>
        )}
      </List>
      <StreetDetailModal
        project={currentProject}
        street={selectedStreet}
        unselectStreet={setSelectedStreetId}
      />
    </>
  );
}

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  width: 400px;
`;
const ListItem = styled.li`
  :not(:first-of-type) {
    margin-top: 8px;
  }
`;

const TaskListHeader = styled.div`
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  font-size: 16px;
`;

const StreetListHeader = styled.div`
  line-height: 24px;
  letter-spacing: 0px;
  text-align: center;
  font-size: 16px;
`;
