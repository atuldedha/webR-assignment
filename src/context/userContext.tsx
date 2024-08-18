import { ReactElement, createContext, useMemo, useReducer } from "react";
import { UserInfoType } from "../types/types";

export type UserType = {
  isAuthenticated: boolean | undefined;
  userInfo: UserInfoType | undefined;
};

type UserInfoStateType = { user: UserType };

const initUserInfoState: UserInfoStateType = {
  user: {
    isAuthenticated: false,
    userInfo: undefined,
  },
};

const REDUCER_ACTION_TYPE = {
  LOGIN: "LOGIN",
  LOGOUT_USER: "LOGOUT_USER",
};

export type UserInfoReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: UserType;
};

const reducer = (
  state: UserInfoStateType,
  action: ReducerAction
): UserInfoStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.LOGIN: {
      if (!action.payload) {
        throw new Error("payload missing (user info)");
      }
      sessionStorage.setItem(
        "user",
        JSON.stringify(action.payload?.userInfo?.email)
      );
      return {
        ...state,
        user: {
          isAuthenticated: true,
          userInfo: action.payload?.userInfo,
        },
      };
    }

    case REDUCER_ACTION_TYPE.LOGOUT_USER: {
      sessionStorage.removeItem("user");
      return {
        ...state,
        user: {
          isAuthenticated: false,
          userInfo: undefined,
        },
      };
    }

    default:
      throw new Error("unidentified method");
  }
};

const useUserDataContext = (initUserInfo: UserInfoStateType) => {
  const [state, dispatch] = useReducer(reducer, initUserInfo);

  const REDUCER_ACTION = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const user: UserType = state.user;

  return { dispatch, REDUCER_ACTION, user };
};

export type UseUserDataContextType = ReturnType<typeof useUserDataContext>;

const initUserInfoContextState: UseUserDataContextType = {
  dispatch: () => null,
  REDUCER_ACTION: REDUCER_ACTION_TYPE,
  user: {
    isAuthenticated: false,
    userInfo: undefined,
  },
};

export const UserInfoContext = createContext<UseUserDataContextType>(
  initUserInfoContextState
);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

export const UserInfoProvider = ({ children }: ChildrenType): ReactElement => {
  return (
    <UserInfoContext.Provider value={useUserDataContext(initUserInfoState)}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoContext;
