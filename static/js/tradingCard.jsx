const tradingCardData = [
  {
    name: 'Balloonicorn',
    skill: 'video games',
    imgUrl: '/static/img/balloonicorn.jpg',
    cardId: 1,
  },
  {
    name: 'Float',
    skill: 'baking pretzels',
    imgUrl: '/static/img/float.jpg',
    cardId: 2,
  },
  {
    name: 'Llambda',
    skill: 'knitting scarves',
    imgUrl: '/static/img/llambda.jpg',
    cardId: 3,
  },
  {
    name: 'Off-By-One',
    skill: 'climbing mountains',
    imgUrl: '/static/img/off-by-one.jpeg',
    cardId: 4,
  },
  {
    name: 'Seed.py',
    skill: 'making curry dishes',
    imgUrl: '/static/img/seedpy.jpeg',
    cardId: 5,
  },
  {
    name: 'Polymorphism',
    skill: 'costumes',
    imgUrl: '/static/img/polymorphism.jpeg',
    cardId: 6,
  },
  {
    name: 'Short Stack Overflow',
    skill: 'ocean animal trivia',
    imgUrl: '/static/img/shortstack-overflow.jpeg',
    cardId: 7,
  },
  {
    name: 'Merge',
    skill: 'bullet journaling',
    imgUrl: '/static/img/merge.png',
    cardId: 8,
  },
];

// This is like the component "factory" that will work to make all of 
// our components
function TradingCard(props) {
  return (
    <div className="card">
      <p>Name: {props.name}</p>
      <img src={props.imgUrl} alt="profile" />
      <p>Skill: {props.skill} </p>
    </div>
  );
}

function TradingCardContainer() {
  // useState --> it's a way to keep track of a certain value and update it 
  // and when that value gets updated, tell React to re-render the component.
  // reminder-- states can change. Props stay the same. In this case, cards is 
  // the state

  //the empty array on line 73 is just saying we want cards to start off empty
  // cards = state variable, initializes it to empty array, and then it also defines 
  // the setCards function that we use to change cards
  const [cards, setCards] = React.useState([])
  
  // Fetching card data from server.py, data is being passed into setCards 
  // on line 81
  // If we don't add [], it will be an infinite loop
  // [] says only run .useEffect if whatever is in the array changes 
  // "Run only on the first render, but don't do it again"
  React.useEffect(() => {
    // any time you're using fetch in React, you want to use it with useEffect
    // so it doesn't keep going for every
    fetch('/cards.json')
    .then((response) => response.json())
    .then((data) => setCards(data.cards))
  }, [])

  // const floatCard = {
  //   name: 'Float',
  //   skill: 'baking pretzels',
  //   imgUrl: '/static/img/float.jpg'
  // };
  
  const tradingCards = [];

  // the for loop is creating all of TradingCard component instances for each 
  // card in CARD_DATA in server.py
  for (const currentCard of cards) {
    tradingCards.push(
      // TradingCard is the component "factory," and then key, name, skill, and 
      // imgUrl are 
      // The code below is a component instance --> it's creating one training 
      // card
      <TradingCard
        key={currentCard.cardId}
        name={currentCard.name}
        skill={currentCard.skill}
        imgUrl={currentCard.imgUrl}
      />,
    );
  }

  return (
    <React.Fragment>
      <AddTradingCard />
      <h2>Trading Cards</h2>
      <div className="grid">{tradingCards}</div>
    </React.Fragment>
  );
}


// Where we are building our TradingCards into => 'container'
ReactDOM.render(<TradingCardContainer />, document.getElementById('container'));



function AddTradingCard(props) {
  const [name, setName] = React.useState("");
  const [skill, setSkill] = React.useState("");
  
  function addNewCard() {
    fetch("/add-card", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ "name": name, "skill": skill })
    })
    .then((response) => response.json())
    .then((jsonResponse) => {
      alert(`Card added! Response: ${jsonResponse.cardAdded.name}`)
    });
  }
  return (
    <React.Fragment>
      <h2>Add New Trading Card</h2>
      <label htmlFor="nameInput">Name</label>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        id="nameInput"
        style={{ marginLeft: "5px" }}
      ></input>
      <label
        htmlFor="skillInput"
        style={{ marginLeft: "10px", marginRight: "5px" }}
      >
        Skill
      </label>
      <input
        value={skill}
        onChange={(event) => setSkill(event.target.value)}
        id="skillInput"
      ></input>
      <button style={{ marginLeft: "10px" }} onClick={addNewCard}>
        Add
      </button>
    </React.Fragment>
  );
}

