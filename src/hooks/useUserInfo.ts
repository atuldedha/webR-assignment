import { useContext } from "react";
import UserInfoContext, {
  UseUserDataContextType,
} from "../context/userContext";

// custom hook to use cart context
// rather creating and importing cart context in each component
// we create this custom hook and now we only need this to import
const useUserInfo = (): UseUserDataContextType => {
  return useContext(UserInfoContext);
};

export default useUserInfo;
