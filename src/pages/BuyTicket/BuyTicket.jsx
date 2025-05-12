import React, { useState, useEffect } from 'react';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import './BuyTicket.css';

const BuyTicket = () => {
  const [seatType, setSeatType] = useState('standard');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(160);
  const seatCount = 35;

  useEffect(() => {
    setPrice(seatType === 'vip' ? 240 : 160);
  }, [seatType]);

  const toggleSeat = (id) => {
    setSelectedSeats(prev =>
      prev.includes(id) ? prev.filter(seat => seat !== id) : [...prev, id]
    );
  };

  return (
    <div>
        <Header />

        <div className="container">
        <div className="left-panel">
            <p className="left-panel-name">Купівля квитка</p>

            <div className="form-row">
            <div className="form-column">
                <p className="form-label">Місце</p>
                <label className="input-radio">
                <input
                    type="radio"
                    name="seatType"
                    value="standard"
                    checked={seatType === 'standard'}
                    onChange={() => setSeatType('standard')}
                />
                Стандарт
                </label>
                <label className="input-radio">
                <input
                    type="radio"
                    name="seatType"
                    value="vip"
                    checked={seatType === 'vip'}
                    onChange={() => setSeatType('vip')}
                />
                VIP
                </label>
            </div>

            <div className="form-column">
                <p className="form-label">Ціна</p>
                <div className="price-box">{price}.00 грн</div>
            </div>

            <div className="form-column">
                <p className="form-label">Назва фільму</p>
                <p className="placeholder">дата і час</p>
            </div>
            </div>

            <div className="form-card">
            <div className="form-card-column">
                <label>Номер карти</label>
                <input type="text" placeholder="Введіть номер" />
            </div>
            <div className="form-card-column">
                <label>CVV</label>
                <input type="text" placeholder="123" />
            </div>
            <div className="form-card-column">
                <label>Термін дії карти</label>
                <input type="text" placeholder="00/00" />
            </div>
            </div>

            <p className="payment-methods">Або інші способи оплати</p>
            <div className="buttons">
            <button className="pay-btn">
                <img src="../Icons/Google.svg" alt="Google Pay" />
                Pay
            </button>
            <button className="pay-btn">
                <img src="../Icons/Apple.svg" alt="Apple Pay" />
                Pay
            </button>
            </div>

            <button className="main-btn">Сплатити</button>
        </div>

        <div className="right-panel">
            {[...Array(seatCount)].map((_, i) => (
            <div
                key={i}
                className={`seat ${selectedSeats.includes(i) ? 'selected' : ''}`}
                onClick={() => toggleSeat(i)}
            />
            ))}
        </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default BuyTicket;
