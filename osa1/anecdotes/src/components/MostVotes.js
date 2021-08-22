import VoteDisplay from "./VoteDisplay";

const MostVotes = ({ text, voteCount }) => {
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {text}
      <VoteDisplay voteCount={voteCount} />
    </div>
  );
};

export default MostVotes;
