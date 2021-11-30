import "./ResetPassword.css"; 

function ResetPassword() {

    return (
     <div className="Reset-form-container">
         <div className="Reset-form">
             <div className="form-title">Reset Password </div>
             <div>
                 <form method="POST" className="Reset-input">
                 <input className="reset-email-input" type="email" placeholder="Email" aria-autocomplete="both" required  />
                 <hr className="row-break" />
                <p> Enter your account Email to Receive an Email to reset your password </p>
                 <hr className="row-break" />

                 <input className="Reset-btn" type="submit" value="Send" />
                 </form>

                 </div>
         </div>


     </div>
    )
}
export default ResetPassword;