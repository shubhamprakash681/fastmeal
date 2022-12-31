import WestOutlined from '@mui/icons-material/WestOutlined'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { resetPasswordHandler } from '../../firebase/loginHandler'

const PasswordRecovery = () => {
    const [userEmail, setUserEmail] = useState('')
    return (
        <>
            <div className="login-page-container">
                <div className="login-box">
                    <h2 id='p-reco-header'>
                        <Link id='p-bck' to={'/login'} >
                            <WestOutlined fontSize='large' />
                        </Link>
                        Password Reset</h2>

                    <form className='login-form' onSubmit={(e) => {
                        e.preventDefault()

                        resetPasswordHandler(userEmail)

                        setUserEmail('')
                    }}>
                        <div className='form-el' >
                            <label htmlFor="email">Email:</label>
                            <br />
                            <input value={userEmail} onChange={(e) => {
                                setUserEmail(e.target.value)
                            }} name='email' id='email' type="text" />
                        </div>

                        <button className='btn' id='login-btn' type="submit">CONFIRM</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PasswordRecovery