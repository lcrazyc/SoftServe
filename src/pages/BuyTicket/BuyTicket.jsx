import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import GoogleIcon from '../../Icons/Google.svg';
import AppleIcon from '../../Icons/Apple.svg';
import './BuyTicket.css';

const getDetails = async (data) => {
        try {
            const response = await axios.get('https://localhost:9999/api/Sessions', {
                 params:{
                "id": data.id,  
                "movie_id": data.movie_id,
                "date": data.date,
                "session_time": data.session_time,
                "price": data.price
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
        const response2 = await axios.get('https://localhost:9999/api/Movies/${title}', {
            headers:{
                'Content-Type': 'application/json'
            }
        });

          localStorage.setItem("data", JSON.stringify(response.data));
          reloadPage();
          handleChangeState();
        } catch (error) {
        }
    };

const BuyTicket = () => {
  const [seatType, setSeatType] = useState('standard');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(160);
  const seatCount = 35;
  const seatsPerRow = 7;

   useEffect(() => {
    let total = 0;
    selectedSeats.forEach(id => {
        total += id < seatsPerRow ? 240 : 160;
    });
    setPrice(total);
  }, [selectedSeats]);

  const isFirstRow = (seatIndex) => seatIndex < seatsPerRow;

  const toggleSeat = (id) => {
    const isSelected = selectedSeats.includes(id);
    if (isSelected) {
        setSelectedSeats(prev => prev.filter(seat => seat !== id));
    } else {
        setSelectedSeats(prev => [...prev, id]);
    }
  };

  return (
    <div className="ticket-page">
        <Header />

        <div className="container">
        <div className="left-panel">
            <h1 className="left-panel-name">Купівля квитка</h1>

            <div className="form-row">
            <div className="form-column">
                <h2 className="form-label">Місце</h2>
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
                <h2 className="form-label">Ціна</h2>
                <div className="price-box">{price}.00 грн</div>
            </div>

            <div className="form-column">
                <h2 className="form-label">{data.title}</h2>
                <p className="placeholder">{data.date} {data.session_time}</p>
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
                <img src={GoogleIcon} alt="Google Pay" />
                Pay
            </button>
            <button className="pay-btn">
                <img src={AppleIcon} alt="Apple Pay" />
                Pay
            </button>
            </div>

            <button className="main-btn">Сплатити</button>
        </div>

        <div className="right-panel">
          {[...Array(seatCount)].map((_, i) => {
            const isDisabled =
              (seatType === 'standard' && isFirstRow(i)) ||
              (seatType === 'vip' && !isFirstRow(i));

            return (
              <div
              key={i}
              className={`seat ${selectedSeats.includes(i) ? 'selected' : ''} ${i < seatsPerRow ? 'vip' : ''}`}
              onClick={() => toggleSeat(i)}
            />
            );
          })}
        </div>
        </div>
        <Footer></Footer>
    </div>
  );
};

export default BuyTicket;