import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
const PaymentPage = () => {
    const navigate = useNavigate();
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    const pay_id = uuid();
    const [user, setUser] = useState({
        amount: "",
        name: "",
    });
    let name, value;
    const getUserData = (event) => {
        name = event.target.name;
        value = event.target.value;

        setUser({ ...user, [name]: value});
    };

    const postData = async (e)=>{
        e.preventDefault();

        const {amount, name} = user;
        if(amount!=="500")
                {
                    alert("Enter fee-500/-");
                }

        else if(amount && name) {
            const res = await fetch("https://yogaclasses-admissionform-default-rtdb.firebaseio.com/paymentdetails.json", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                amount,
                date,
                name,
                pay_id,
            })
            });

            if(res) {
                
                setUser({
                    amount: "",
                    name: "",
                });
                alert("Payment Successful! \nClick Ok to Proceed")
                navigate('/')
            }
        } 
        else {
            alert("Fill all the data!")
        }

        

    };
    return(
        <form className="form" method="POST">
        <div className="form-body">
     
            <div className="main-content">
                <p className="text">Yoga Classes Payment Gateway</p>
            </div>
            <h4> Fee :500/-</h4>
            <div className="amount">
            <label className="form__label">Registration Fee: </label>
                <input
                    type="number"
                    name="amount"
                    value={user.amount} 
                    onChange={getUserData}
                    autoComplete="off"
                    required
                    className="amount-field"
                    placeholder="Amount"/>
            </div>
            <br/>

            <div className="card-details">
                
                <label className="form__label">Card Number: </label>
                <input
                    type="text"
                    name="amount"
                    autoComplete="off"
                    required
                    className="card-number-field"
                    placeholder="###-###-###"/>
                </div>
                <br />
                <div className="date-number">
                <label className="form__label">Expiry Date :</label>
                <input 
                    type="text" 
                    className="date-number-field" 
                    placeholder="DD-MM-YY"
                    name="date"
                    autoComplete="off"
                    required
                 />
                </div>
                <br/>
                <div className="cvv-number">
                <label className="form__label">CVV Number: </label>
                <input 
                    type="text" 
                    className="cvv-number-field" 
                    placeholder="xxx" 
                    name="cvvnum"
                    autoComplete="off"
                    required
                />
                
                </div>
                <br/>
                <div className="nameholder-number">
                <label className="form__label">Card Holder Name: </label>
                <input
                    type="text"
                    className="card-name-field"
                    placeholder="Enter your Name"
                    name="name"
                    value={user.name} 
                    onChange={getUserData}
                    autoComplete="off"
                    required
                />
            </div>
            <br/>
            <button 
                type="submit" 
                onClick={postData}
                className="submit-now-btn">
            Make Payment
            </button>
      </div>
    
  
        </form>
        
    )
}
export default PaymentPage;