import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { setupStore } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const store = setupStore();
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <App />
    </Provider>
  </QueryClientProvider>,
);
