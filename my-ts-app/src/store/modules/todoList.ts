import { createAction } from "typesafe-actions";
import { produce } from "immer";
import { Action } from "redux";

export const CREATE = 'todoList/CREATE';
export type CREATE = {
  text: string;
};
export class create implements Action {
  readonly type = CREATE;
  constructor(
    public payload: CREATE
  ) {}
};

export const REMOVE = 'todoList/REMOVE';
export type REMOVE = {
  id: number;
};
export class remove implements Action {
  readonly type = REMOVE;
  constructor(
    public payload: REMOVE
  ) {}
}

export const TOGGLE = 'todoList/TOGGLE';
export type TOGGLE = {
  id: number;
};
export class toggle implements Action {
  readonly type = TOGGLE;
  constructor(
    public payload: TOGGLE
  ) {}
};

export const CHANGE_INPUT = 'todoList/CHANGE_INPUT';
export type CHANGE_INPUT = {
  text: string;
};
export class changeInput implements Action {
  readonly type = CHANGE_INPUT;
  constructor(
    public payload: CHANGE_INPUT
  ) {}
};

export const actionCreators = {
  create: createAction(CREATE, action => {
    return (text: string) => action(text);
  }),
  remove: createAction(REMOVE, action => {
    return (id: number) => action(id);
  }),
  toggle: createAction(TOGGLE, action => {
    return (id: number) => action(id);
  }),
  changeInput: createAction(CHANGE_INPUT, action => {
    return (text: string) => action(text);
  }),
};

export type TodoListActions =
  create |
  remove |
  toggle |
  changeInput
;

export interface TodoItem {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoListState {
  input: string;
  todos: TodoItem[];
}

const initialState: TodoListState = {
  input: '',
  todos: [
    {
      id: 0,
      text: 'First',
      done: false,
    },
    {
      id: 1,
      text: 'Second',
      done: true,
    },
  ],
};

let id: number = 1;

const todoListReducer = (state: TodoListState = initialState, action: TodoListActions) =>
  produce(state, draft => {
    switch (action.type) {
      case CREATE:
        draft.todos.push({
          id: id++,
          text: action.payload.text,
          done: false,
        });
        break;
      case REMOVE:
        draft.todos.filter((item, idx) => item.id !== action.payload.id);
        break;
      case TOGGLE:
        draft.todos.map((item, idx) => {
          if (item.id === action.payload.id) {
            item.done = !item.done
          }
        });
        break;
      case CHANGE_INPUT:
        draft.input = action.payload.text;
        break;
      default:
        state;
        break;
    };
  });

export default todoListReducer;
