import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './BuyTicket.css';

const BuyTicket = () => {
  const { id } = useParams(); // session id from URL
  const [session, setSession] = useState(null);
  const [movie, setMovie] = useState(null);
  const [seatType, setSeatType] = useState('standard');
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(160);
  const [showModal, setShowModal] = useState(false);
  const seatCount = 35;
  const seatsPerRow = 7;

  useEffect(() => {
    const fetchSessionAndMovie = async () => {
      try {
        const sessionRes = await axios.get(`https://localhost:9999/api/Sessions/${id}`);
        const sessionData = sessionRes.data;
        setSession(sessionData);

        const movieRes = await axios.get(`https://localhost:9999/api/Movies/${sessionData.movie_id}`);
        setMovie(movieRes.data);
      } catch (err) {
        console.error("Помилка при завантаженні даних:", err);
      }
    };

    fetchSessionAndMovie();
  }, [id]);

  useEffect(() => {
    let total = 0;
    selectedSeats.forEach((seatIndex) => {
      total += isFirstRow(seatIndex) ? 240 : 160;
    });
    setPrice(total);
  }, [selectedSeats]);

  const isFirstRow = (seatIndex) => seatIndex < seatsPerRow;

  const toggleSeat = (seatIndex) => {
    setSelectedSeats((prev) =>
      prev.includes(seatIndex)
        ? prev.filter((seat) => seat !== seatIndex)
        : [...prev, seatIndex]
    );
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('uk-UA', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (timeStr) =>
    timeStr?.length >= 5 ? timeStr.slice(0, 5) : '--:--';

  const handleDownloadTicket = () => {
    const ticketText = `🎫 Квиток на фільм: ${movie.title}
Дата: ${formatDate(session.date)}
Час: ${formatTime(session.session_time)}
Зал: ${session.hall_id}
Обрані місця: ${selectedSeats.map(i => i + 1).join(', ')}
Ціна: ${price} грн
Дякуємо, що обрали наш кінотеатр!`;

    const blob = new Blob([ticketText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ticket.txt';
    link.click();
  };

  if (!session || !movie) return <div>Завантаження...</div>;

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
              <h2 className="form-label">{movie.title}</h2>
              <p className="placeholder">
                {formatDate(session.date)} о {formatTime(session.session_time)}
              </p>
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
            <button className="pay-btn">GooglePay</button>
            <button className="pay-btn">ApplePay</button>
          </div>

          <button className="main-btn" onClick={() => setShowModal(true)}>Сплатити</button>

        </div>

        <div className="right-panel">
          {[...Array(seatCount)].map((_, i) => {
            const isDisabled =
              (seatType === 'standard' && isFirstRow(i)) ||
              (seatType === 'vip' && !isFirstRow(i));

            return (
              <div
                key={i}
                className={`seat ${selectedSeats.includes(i) ? 'selected' : ''} ${isFirstRow(i) ? 'vip' : ''}`}
                onClick={() => !isDisabled && toggleSeat(i)}
              />
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Оплата пройшла успішно!</h2>
            <p>Дякуємо за покупку квитка 🎉</p>
            <button className="download-btn" onClick={handleDownloadTicket}>
              Завантажити квиток
            </button>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Закрити
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BuyTicket;