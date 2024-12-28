import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

export default function Bank() {
  function reducer(state, action) {
    if (!state.isActive && action.type !== "openAccount") return state;

    switch (action.type) {
      case "openAccount":
        return { ...state, loan: 0, balance: 500, isActive: true };
      case "add":
        return { ...state, balance: state.balance + action.payload };
      case "decrease":
        return { ...state, balance: state.balance - action.payload };
      case "loan":
        return {
          ...state,
          loan: state.loan + action.payload,
          balance: state.balance + action.payload,
        };
      case "payloan":
        return {
          ...state,
          loan: 0,
          balance: Number(state.balance - state.loan),
        };
      case "closeAccount":
        return { ...initialState, isActive: false };
      default:
        state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  let { balance, loan, isActive } = state;

  return (
    <div className="Bank pt-8 flex flex-col justify-center items-center space-y-4 content-center text-base font-bold ">
      <h1 className="pb-4 text-xl">useReducer Bank Account</h1>
      <p className="font-semibold text-lg leading-3">Balance: {balance} </p>
      <p className="font-semibold text-lg leading-3">Loan: {loan}</p>

      <p>
        <button
          className={`w-52  p-2 rounded transition-all duration-300 text-slate-50 ${!isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          className={`w-52 p-2 rounded transition-all duration-300 text-slate-50 ${isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "add", payload: 150 })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          className={`w-52 p-2 rounded transition-all duration-300 text-slate-50 ${isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "decrease", payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          className={`w-52  p-2 rounded transition-all duration-300 text-slate-50 ${isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "loan", payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          className={`w-52  p-2 rounded transition-all duration-300 text-slate-50 ${isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "payloan", payload: state.loan })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          className={`w-52  p-2 rounded transition-all duration-300 text-slate-50 ${isActive ? "bg-cyan-950 hover:bg-rose-500 transition-all duration-300":"bg-gray-400"}`}
          onClick={() => dispatch({ type: "closeAccount" })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
