import React, { useState } from "react";
import Button from "./components/Button";
import MostVotes from "./components/MostVotes";
import VoteDisplay from "./components/VoteDisplay";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteCount, setVoteCount] = useState(mapVoteCountToIndex(anecdotes));
  const [mostVotes, setMostVotes] = useState({
    text: anecdotes[0],
    voteCount: 0,
  });

  const handleNextAnecdote = () => {
    const nextIndex = Math.floor(Math.random() * (anecdotes.length - 1));
    setSelected(nextIndex);
  };

  const handleVoteClick = () => {
    const voteCountCopy = { ...voteCount };
    voteCountCopy[selected]++;
    setVoteCount(voteCountCopy);
    setMostVotes(getMostVotedState(anecdotes, voteCountCopy));
  };

  return (
    <div>
      {anecdotes[selected]}
      <VoteDisplay voteCount={voteCount[selected]} />
      <div>
        <Button onClickHandler={handleVoteClick} label="vote" />
        <Button onClickHandler={handleNextAnecdote} label="next anecdote" />
      </div>
      <MostVotes {...mostVotes} />
    </div>
  );
};

const mapVoteCountToIndex = (anecdoteArray) => {
  return anecdoteArray.reduce(
    (previousValue, currentValue, index) => ({ ...previousValue, [index]: 0 }),
    {}
  );
};

const getMostVotedState = (anecdotes, voteState) => {
  const returnObj = { text: anecdotes[0], voteCount: voteState[0] };
  for (const key in voteState) {
    if (voteState[key] > returnObj.voteCount) {
      returnObj.text = anecdotes[key];
      returnObj.voteCount = voteState[key];
    }
  }
  return returnObj;
};

export default App;
