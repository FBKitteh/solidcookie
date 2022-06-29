import { render } from "solid-js/web";
import { createSignal } from "solid-js";
const Bonus = {free:1, hover:3, click:10}
const [count, setCount] = createSignal(0);
function Counter() {
  const [hoverActive, setHoverActive] = createSignal(false)
  const increment = () => setCount(count() + Bonus.click);
  const free = () => setCount(count() + Bonus.free)
  const hover = () => {
    if (hoverActive()) {
      setCount(count() + Bonus.hover)
    } 
    
  }

  setInterval(free,1000)
  setInterval(hover,1000)

  const bonusType = "click"
  console.log(Bonus[bonusType])

  return (
    <div>
      <h1>{count()} <br/>
        <span onClick={increment} onMouseOver={() => setHoverActive(true)} onMouseLeave={() => setHoverActive(false)}>
          🍪
        </span>
      </h1>
      <StoreItem emoji="👵" name="Granny" bonusAmount={6} cost={80} bonusType="free"/>
      <StoreItem emoji="👦" name="Little Boy" bonusAmount={20} cost={300} bonusType="hover"/>
      <StoreItem emoji="🧑‍💻" name="Cookie Developer" bonusAmount={35} cost={1_000} bonusType="click"/>
      <StoreItem emoji="🥠" name="Fortunate Cookies" bonusAmount={25} cost={3_000} bonusType="free"/>
      <StoreItem emoji="🌑" name="Cookie Moon" bonusAmount={75} cost={10_000} bonusType="hover"/>
      <StoreItem emoji="🪐" name="Cookie Planet" bonusAmount={200} cost={100_000} bonusType="click"/>
    </div>
  );
}

function StoreItem(props:{emoji:string, name:string, cost:number, bonusType: keyof typeof Bonus, bonusAmount:number}) {
  const canBuy = () => count() > props.cost
  const textColor = () => {
    if (!canBuy()) return "gray"
    else return "white"
  }
  const buyItem = () => {
    if (!canBuy()) return
    setCount(count() - props.cost)
    Bonus[props.bonusType] += props.bonusAmount
  }
  return <div style={`color: ${textColor()}`} onClick={buyItem}>
    <h2>{props.emoji} {props.name}</h2>
    <p>{props.bonusAmount}, Costs: {props.cost}</p>
  </div>
}

render(() => <Counter />, document.getElementById("app")!);
