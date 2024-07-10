import AppRouter from "./navigation/AppRouter";
import { AuthContext } from "./api/Auth";
import { useContext } from "react";
export default function App() {
  const { loader } = useContext(AuthContext);
  console.log(loader);
  return <AppRouter />;
}
