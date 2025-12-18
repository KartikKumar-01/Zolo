import '@/styles.css'
import NavButton from './NavButton';


interface CardNavProps{
    view: "signup" | "signin";
    toggleView: () => void;
}
const navButtons = [
  { name: "signin", label: "Sign In", icon: "check" },
  { name: "signup", label: "Sign Up", icon: "add" },
] as const;

const CardNav = ({view, toggleView}: CardNavProps) => {
  return (
    <ul className="card-nav">
    <li>
      {/* <img src='/> */}
      <span
        className="active-bar"
        style={{ top: view === "signin" ? "33.33%" : "66.66%" }}
      ></span>
    </li>
    {navButtons.map((btn) => (
      <li>
        <NavButton
          icon={btn.icon}
          label={btn.label}
          isActive={view === btn.name}
          onClick={toggleView}
        />
      </li>
    ))}
  </ul>
  )
}

export default CardNav
