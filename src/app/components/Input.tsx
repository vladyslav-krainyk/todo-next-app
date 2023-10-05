const Input = ({ addTodo, input, onChangeInput }) => {
  return (
    <form
      className="my-4 flex justify-center border-slate-400 border-2 rounded-xl bg-white"
      onSubmit={addTodo}
    >
      <input
        value={input}
        className="outline-none p-4 w-full text-slate-600 rounded-xl placeholder-slate-300 text-2xl"
        type="text"
        placeholder="Whats need to be done?"
        onChange={onChangeInput}
      />
      <button className="text-slate-400 text-4xl text-center pb-2 pr-4">
        +
      </button>
    </form>
  )
}

export default Input