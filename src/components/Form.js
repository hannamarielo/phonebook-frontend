import App from "../App";
import ReactDOM from "react-dom/client";
import '../index.css';

const Form = ({submit, change}) => (
<form className="form" onSubmit={submit}>
<div className="personsName">
  Name: <input
    className="inputName"
    name="name"
    onChange={change} />
</div>
<p></p>
<div className="personsNumber">
  Number: <input
    className="inputNumber"
    name="number"
    onChange={change} />
</div>
<p></p>
<div>
  <button className="submitButton" type="submit">Add</button>
</div>
<p></p>
</form>)

export default Form