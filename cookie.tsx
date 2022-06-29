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


  return (
    <div>
      <h1>{count()} <br/>
        <span onClick={increment} onMouseOver={() => setHoverActive(true)} onMouseLeave={() => setHoverActive(false)}>
          🍪
        </span>
      </h1>
      <StoreItem emoji="👵" name="Granny" bonusAmount={6} cost={80} bonusType="free"/>
      <StoreItem emoji="👦" name="Little Boy" bonusAmount={20} cost={300} bonusType="hover"/>
    </div>
  );
}

function StoreItem(props:{emoji:string, name:string, cost:number, bonusType:string, bonusAmount:number}) {
  return <div>
    <h2>{props.emoji} {props.name}</h2>
    <p>{props.bonusAmount}, Costs: {props.cost}</p>
  </div>
}

render(() => <Counter />, document.getElementById("app")!);
