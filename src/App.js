import "./App.css";
import { FaHandRock, FaHandPaper, FaHandScissors, FaHandLizard, FaHandSpock } from "react-icons/fa";
import { useState } from "react";

const actions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["scissors", "rock"],
};


/** Pour le choix du computer qui est générée aléatoirement **/
function randomAction() {
  const keys = Object.keys(actions);
  const index = Math.floor(Math.random() * keys.length);
  return keys[index];
}

/** Pour calculer le gangnant  **/
function calculateWinner(action1, action2) {
  if (action1 === action2) {
    return 0;
  } else if (actions[action1].includes(action2)) {
    return -1;
  } else if (actions[action2].includes(action1)) {
    return 1;
  }

  // This should never really happen
  return null;
}


/** Les icones qui sont en dessous  **/
function ActionIcon({ action, ...props }) {
  const icons = {
    rock: FaHandRock,
    paper: FaHandPaper,
    scissors: FaHandScissors,
    lizard: FaHandLizard,
    spock: FaHandSpock,
  };
  const Icon = icons[action];
  return <Icon {...props} />;
}


/**  **/
function Player({ name = "Player", score = 0, action = "rock" }) {
  return (
    <div className="player">
      <div className="score">{`${score}`}</div>
      <div className="action">
        {action && <ActionIcon action={action} size={60} />}
      </div>
      <div className="name">{`${name}`}</div>
    </div>
  );
}

function ActionButton({ action = "rock", onActionSelected }) {
  return (
    <button className="round-btn" onClick={() => onActionSelected(action)}>
      <ActionIcon action={action} size={20} />
    </button>
  );
}

function ShowWinner({winner = 0}) {
  const text = {
    "-1": "You Win!",
    0: "It's a Tie",
    1: "You Lose!",
  };

  return (
   <>
     {winner == 1 ? <h2 style={{marginTop:"6%", color: "#dc143c"}}>{text[winner]}</h2> :  <h2 style={{marginTop:"6%", color:"#00bfff"}}>{text[winner]}</h2> }
   </>
  )
}

function App() {
  const [playerAction, setPlayerAction] = useState("");
  const [computerAction, setComputerAction] = useState("");
  const [test, setTest] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [winner, setWinner] = useState(0);
  const [countGame, setCountGame] = useState(0);

  const onActionSelected = (selectedAction) => {
    setTest(true);
    setCountGame(countGame+1);
    const newComputerAction = randomAction();
    setPlayerAction(selectedAction);
    setComputerAction(newComputerAction);

    const newWinner = calculateWinner(selectedAction, newComputerAction);
    setWinner(newWinner);

    if (newWinner === -1) {
      setPlayerScore(playerScore + 1);
    } else if (newWinner === 1) {
      setComputerScore(computerScore + 1);
    }
  };

  return (
    <div className="center">
      <h1>Rock Paper Scissors <p className="p">You have 5 issues .. Good Luck </p></h1> 
      
      {countGame < 5 ? 
      <div>
      <h3>Score</h3>
      <div className="container">
        <Player name="Human &nbsp;(You)" 
          score={playerScore} 
          action={playerAction} />
          <hr />
        <Player
          name="AI &nbsp;(Computer)"
          score={computerScore}
          action={computerAction}
        />
      </div>
      <div>
        {test === true ? <ShowWinner winner={winner}/> : <h2 style={{marginTop:"6%"}}>Start Game</h2>  }
        <ActionButton action="rock" onActionSelected={onActionSelected} />
        <ActionButton action="paper" onActionSelected={onActionSelected} />
        <ActionButton action="scissors" onActionSelected={onActionSelected} />
        <ActionButton action="lizard" onActionSelected={onActionSelected} />
        <ActionButton action="spock" onActionSelected={onActionSelected} />
      </div>
      <button className="reset" onClick={()=> {setPlayerScore(playerScore-playerScore); setComputerScore(computerScore-computerScore); setTest(false); setCountGame(countGame-countGame)}}>Reset</button>
      
    </div>: 
    <div>
    <p className="para">Game is Over :) </p>
    <h2>Score</h2>
    <div className="container">
      <Player name="Human (You)" 
        score={playerScore} 
        action="" />
        <hr />
      <Player
        name="AI &nbsp;(Computer)"
        score={computerScore}
        action=""
      />
    </div>
    
  </div>
    }
    </div>
  );
}

export default App;