import { Navigate } from "react-router-dom";
import { useAtom } from "jotai";
import { userAtom } from "../../jotai/atoms";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user] = useAtom(userAtom);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
