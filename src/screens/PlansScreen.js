import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import db from '../firebase';
import './PlansScreen.css';

function PlansScreen() {
    const [products, setProducts] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('products')
        .where('active', "==", true)
        .get()
        .then((querySnapshot) => {
            const products = {};
            querySnapshot.forEach(async productDoc => {
                products[productDoc.id] = productDoc.data();
                const  priceSnap = await productDoc.ref.collection('prices').get();
                priceSnap.docs.forEach(price => {
                    products[productDoc.id].prices = {
                        priceId: price.id,
                        priceData: price.data()
                    }
                })
            });
            setProducts(products);
        });
    }, []);

    console.log(products);

    const loadCheckout = async (priceId) => {
        const docRef = await db
            .collection('customers')
            .doc(user.uid)
            .collection('checkout_sessions')
            .add({
                price: priceId,
                success_url: window.location.origin,
                cancel_url: window.location.origin,
            });

        docRef.onSnapshot(async(snap) => {
            const { error, sessionId } = snap.data();

            if (error) {
                //Show an error to the customer and inspect the cloud function logs in firebase console
                alert(`An error occured: ${error.message}`);
            }
            if (sessionId) {
                //We have a session, lets redirect to checkout
                //init stripe
                const stripe = await loadStripe('pk_test_51J3OmsFNt603UvouAgcwg34PlNqHzfjiv6UuVhHFXx9ZwdJgFeK674ReGa5NcRoCcnbeJaQiEaV0TnA2cIE0mgJP00OT7x9l0g');
                stripe.redirectToCheckout({ sessionId });
            }
        })
    };

    return (
        <div className="plansScreen">
            {Object.entries(products).map(([productId, productData]) => {
                return (
                    <div className="plansScreen__plan">
                        <div className="plansScreen__info">
                            <h5>{productData.name}</h5>
                            <h6>{productData.description}</h6>
                        </div>
                        <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>
                    </div>
                )
            })}
        </div>
    )
}

export default PlansScreen
