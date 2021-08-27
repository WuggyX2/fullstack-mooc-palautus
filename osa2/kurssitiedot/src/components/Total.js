const Total = ({ parts }) => {
  const total = parts.reduce((previous, current) => {
    return previous + current.exercises;
  }, 0);

  return <b>total of {total} exercises</b>;
};

export default Total;
