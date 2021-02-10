import { useState, useEffect } from 'react';
import db from '../../firebase';
import './Plans.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';

const Plans = () => {
    const [products, setProducts] = useState([])

const user = useSelector(selectUser)

const [subscription, setSubscription] = useState(null)

useEffect(() => {
  db.collection('customers')
  .doc(user.uid)
  .collection('subscriptions')
  .get()
  .then((querySnapShot)=>{
    querySnapShot.forEach(async subscription =>{
        setSubscription({
          role: subscription.data().role, 
          current_period_end : subscription.data().current_period_end.seconds,
          current_period_start : subscription.data().current_period_start.seconds,
        })
    })
  })

}, [user.uid])

useEffect(() => {
  db.collection('products')
  .where('active', '==', true)
  .get()
  .then( (querySnapShot) => {
    const products = {}
    querySnapShot.forEach( async (productDoc) =>{
      products[productDoc.id] = productDoc.data()
      const pricesSnap = await productDoc.ref.collection('prices').get()
      pricesSnap.docs.forEach(price =>{
        products[productDoc.id].prices ={
          priceId: price.id,
          priceData: price.data()
        }
      })
    })
    setProducts(products)
  })
  
}, [])

console.log(products)
console.log(subscription)

const loadCheckout = async (priceId) =>{
  
  const docRef = await db.collection('customers')
  .doc(user.uid).collection('checkout_sessions')
  .add({
    price: priceId,
    success_url : window.location.origin,
    cancel_url: window.location.origin
  })

  docRef.onSnapshot(async(snap)=>{
      const {error, sessionId} = snap.data()
      if (error){
        alert(`An error ocurred:${error.message}`)
      }
      if(sessionId){
        //We hava a session, let's redirect to checkout
        //Init Stripe

        const stripe = await loadStripe("pk_test_6gvCA1bQWj6TLoKw3FLLcO8j005lE49Ck4")
        stripe.redirectToCheckout({sessionId})
        
        
      }
  })

}

return (
    <div className="plans">
      {subscription && <p>Renewal date: {new Date(subscription?.current_period_end * 1000).toDateString()} </p> }

      { Object.entries(products).map(([productId, productData])=>{
        //ass some logic to check if user is subscription is active 
        const isCurrentPackage = productData.name?.toLowerCase()
        .includes(subscription?.role)

        return (
          <div  
            key={productId} 
            className={ `${isCurrentPackage && 'plan--disabled' } plan` }>
            <div className="plan__info">
             <h5> {productData.name}</h5>
             <h6>{productData.description} </h6>
            </div>
            <button onClick={() =>
              !isCurrentPackage &&
              loadCheckout(productData.prices.priceId)}>   
              { isCurrentPackage ? 
               'Current Package' : 
               'Suscribe'
               } </button>
          </div>
        )
      })}
    </div>
  );
}

export default Plans;