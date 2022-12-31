import React from 'react'
import emptyCartImg from '../../assets/images/emptycart.svg'
function CartEmpty() {
    return (
        <>
            <div className="empty-cart-container">
                <div>
                    <img src={emptyCartImg} alt='EMPTY'></img>
                    <div>Your Cart is Empty</div>
                </div>
            </div>
        </>
    )
}

export default CartEmpty