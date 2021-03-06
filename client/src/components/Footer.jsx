import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  FaEnvelope,
  FaFacebookMessenger,
  FaCopyright,
  FaCcPaypal,
  FaFacebookSquare,
  FaGlobe
} from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import "./Footer.css";
import { Translate } from "react-localize-redux";

export default class Footers extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      FAQShow: false,
      ZahlungShow: false,
      VersandShow: false
    };
  }
  render() {
    let FAQClose = () => this.setState({ FAQShow: false });
    let ZahlungClose = () => this.setState({ ZahlungShow: false });
    let VersandClose = () => this.setState({ VersandShow: false });
    return (
      <div>
        <div className="footer-section">
          <div className="footer-container">
            <div className="row">
              <div className="col-sm-4">
                <div>
                  <h2>Informationen</h2>
                  <hr />
                  <ul>
                    <li>
                      <Button
                        bsStyle="link"
                        bsSize="sm"
                        onClick={() => this.setState({ FAQShow: true })}
                      >
                        FAQ
                      </Button>
                    </li>
                    <li>
                      <Button
                        bsStyle="link"
                        bsSize="sm"
                        onClick={() => this.setState({ ZahlungShow: true })}
                      >
                        Zahlung
                      </Button>
                    </li>
                    <FAQ show={this.state.FAQShow} onHide={FAQClose} />
                    <Zahlung
                      show={this.state.ZahlungShow}
                      onHide={ZahlungClose}
                    />

                    <li>
                      <Button
                        bsStyle="link"
                        bsSize="sm"
                        onClick={() => this.setState({ VersandShow: true })}
                      >
                        Versand
                      </Button>
                    </li>
                    <Versand
                      show={this.state.VersandShow}
                      onHide={VersandClose}
                    />
                    <li>
                      <Button bsStyle="link" bsSize="sm" href="/statistics">
                        <Translate id="menu.statistics" />
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4">
                <h2>Letzte Nachrichten</h2>
                <hr />
                <p className="footer-text">
                  Uns kann man folgen auch: <br />
                  <a
                    className="footerlink"
                    href="https://www.facebook.com/KertupertuHeartmade/"
                    target="_blank"
                  >
                    <FaFacebookSquare /> Facebook
                  </a>{" "}
                  <br />
                  <a
                    className="footerlink"
                    href="https://kertupertumaailm.blogspot.com/"
                    target="_blank"
                  >
                    <FaGlobe /> Blogspot
                  </a>{" "}
                </p>
              </div>
              <div className="col-sm-4">
                <h2>Kommunikation</h2>
                <hr />
                <h6>Unsere Adresse:</h6>
                <p className="footer-text">
                  kertupertu heARTmade OÜ <br />
                  Paruni tn 79 <br />
                  61714 Kambja vald <br />
                  Ülenurme alevik <br />
                  Estonia <br />
                  <a
                    className="footerlink"
                    href="mailto:kertupertu.heartmade@gmail.com?Subject=Feedback von Webseite"
                    target="_top"
                  >
                    <FaEnvelope /> &nbsp; kertupertu.heartmade@gmail.com{" "}
                  </a>
                  <br />
                  <a
                    className="footerlink"
                    href="https://m.me/KertupertuHeartmade"
                    target="_top"
                  >
                    <FaFacebookMessenger /> &nbsp; m.me/KertupertuHeartmade{" "}
                  </a>
                  <br />
                </p>
              </div>
            </div>
            <div>
              <p className="cright">
                <FaCopyright /> &nbsp; 2018 Copyright: &nbsp;
                <a
                  className="footerlink"
                  href="https://www.kertupertu.de"
                  target="_blank"
                >
                  kertupertu heARTmade OÜ
                </a>{" "}
                <br />
                <a
                  className="footerlink"
                  href="https://www.paypal.com/de/webapps/mpp/home"
                  target="_blank"
                >
                  <FaCcPaypal className="paypal" />
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
//render(<Footers />);

class FAQ extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">FAQ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="modalh6"> Fragen zum Online-Shop</h6>
          <p className="modalbody">
            Sie können verschiedene Produkte aus wählen und dann in den
            Einkaufswagen hinzufügen. In unserem Online-Shop kann man mit PayPal
            bezahlen.
          </p>
          <h6 className="modalh6">Fragen zu Produkten</h6>
          <p className="modalbody">
            Wir bieten zwei verschiedene Arten von Produkten an: wertig
            gehäkelte Tiere und Häkelmuster.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Zahlung extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Zahlung</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6 className="modalh6"> Zahlung per PayPal</h6>
          <p className="modalbody">
            Wenn Sie Zahlung per PayPal auswählen, werden Sie am Ende des
            Bestellvorgangs direkt zu PayPal weitergeleitet. <br /> <br /> Wenn
            du schon PayPal Kunde bist, kannst du dich dort mit deinen
            Benutzerdaten anmelden und die Zahlung durchführen. Du bist neu bei
            PayPal? Dann kannst du dich als Gast anmelden oder ein PayPal Konto
            eröffnen und dann die Zahlung bestätigen. <br />
            <br />
            Der Zahlungseingang wird in der Regel innerhalb von wenigen Minuten
            bei uns verbucht und deine Bestellung wird umgehend bearbeitet.
          </p>
          <h6 className="modalh6">Nach einer Rücksendung:</h6>
          <p className="modalbody">
            Wenn du Artikel wieder zurückschickst, erfolgt die Gutschrift auf
            das von dir genutzte PayPal-Konto. Ob der Betrag auf deinem
            PayPal-Konto hinterlegt wird oder wieder auf dein Bankkonto
            zurückgebucht wird, kannst du selbst bei PayPal festlegen.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

class Versand extends React.Component {
  render() {
    return (
      <Modal
        {...this.props}
        bsSize="large"
        aria-labelledby="contained-modal-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Versand</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Wir versenden deine Bestellung mit DHL oder Hermes. </p>
          <h6 className="modalh6"> Wann kommt meine Bestellung an?</h6>
          <p className="modalbody">
            Sobald ein Paket versendet wird, erhältst eine Versandbestätigung
            per E-Mail. Mit der Sendungsnummer darin kannst du jederzeit den
            Sendungsverlauf verfolgen. <br />
            <br />
            Standard Versanddauer: 4-6 Werktage (montags-samstags)
            <br />
            Express Versanddauer: 1-2 Werktage (montags-samstags) <br />
            <br />
            Wann du voraussichtlich mit deinem Paket rechnen kannst, siehst du
            auch beim Abschluss deiner Bestellung unter „Versandoption”.
          </p>
          <h6 className="modalh6">Muss ich etwas bezahlen?</h6>
          <p className="modalbody">
            Standardversand und Rückversand sind immer kostenfrei.
            <br />
            Express-Lieferung kannst du für 5,90 € auswählen.
          </p>
          <h6 className="modalh6">
            Lieferung an eine DHL Packstation oder einen Hermes PaketShop
          </h6>
          <p className="modalbody">
            Gerne kannst du auch Packstationen oder PaketShops als Zustellorte
            auswählen. Weitere Informationen dazu findest du auf unseren
            Hilfeseiten zur Packstation und zum Hermes PaketShop.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
