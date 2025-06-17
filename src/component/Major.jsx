import { useState } from "react"
import "./MajorStyle.css"

// import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
// import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Major = () => {
const [description, setDescription] = useState("")
const [amount, setAmount] = useState(null)
const [transaction, setTransaction] = useState([])
const [editId, setEditId] = useState(null)
const [income, setIncome] = useState(null)

const addTransaction = (e) => {
    e.preventDefault();
    if(editId) {
        const newTransaction = transaction.map((t) => (
           t.id === editId ? {id: editId, description,amount} : t
        ))
        setTransaction(newTransaction);
        setEditId(null)
    } else {
    setTransaction([...transaction, {id: Date.now(), description, amount}])
}
    setDescription("")
    setAmount(0)
}

const handleEdit = (t) => {
    setEditId(t.id);
    setDescription(t.description);
    setAmount(t.amount);
}

const handleDelete = (id) => {
    setTransaction(transaction.filter(t => t.id !==id))
}

const totalAmount = transaction.reduce((sum, t) => sum + Number(t.amount), 0)

const balance = income - totalAmount;

const resetForm = () => {
  setDescription("");
  setAmount(0);
  setEditId(null);
  setTransaction([]);
  setIncome(0)
};

  return (<div className="overall">
    <div className="income">
        <h2>Kindly input your income for the month</h2>
        <input type="number" value={income}
  onChange={(e) => setIncome(Number(e.target.value))}></input>
    </div>
    <div className='box'>
        <h2 className='head'>Expenses</h2>
        <form>
        <input className="narration py" type='text' placeholder='Description' onChange={(e) => setDescription(e.target.value)} value={description}></input>
        <input className="amt px" type='number' placeholder='Amount' onChange={(e) => setAmount(Number(e.target.value))} value={amount}></input>
        <button className="addition py" onClick={addTransaction}>Add Expense</button>
        </form>
    </div>
    <table className="log">
        <thead>
            <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {transaction.map((t)=> (
            <tr key={t.id}>
                <td>{t.description}</td>
                <td>{t.amount}</td>
                <td>
                    <button className="ed" onClick={e => handleEdit(t)}><FontAwesomeIcon icon={faPen} className="icon-edit" /></button>
                    <button className="ed" onClick={e => handleDelete(t.id)}><FontAwesomeIcon icon={faTrash} className="icon-delete" /></button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>

    <div className="final">
        <div className="total">
            <label>Total</label><input type="number" value={totalAmount}></input>
        </div>
         <div className="bal">
            <label>Balance</label>
            <input type="number" value={balance} readOnly />
        </div>
    </div>

    <div className="summary">
       {balance < 0 ? (
        <p className="minus">
        You have a deficit of ₦{Math.abs(balance).toLocaleString()}
        </p>
        ) : (
        <p className="plus">
        You have a surplus of ₦{balance.toLocaleString()} left
        </p>
        )}
    </div>

    <div className="G-reset">
        <div>
        <button className="reset" onClick={resetForm} >Reset</button>
        </div>
    </div>
    </div>
  )
}

export default Major
