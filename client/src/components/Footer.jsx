import React from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import "./Footer.css";

export default class Footers extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      FAQShow: false,
      ZahlungShow: false
    };
  }
  render() {
    let FAQClose = () => this.setState({ FAQShow: false });
    let ZahlungClose = () => this.setState({ ZahlungShow: false });
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

                      <FAQ show={this.state.FAQShow} onHide={FAQClose} />
                      <Zahlung
                        show={this.state.ZahlungShow}
                        onHide={ZahlungClose}
                      />
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-4">
                <h2>Letzte Nachrichten</h2>
                <hr />
                <p className="footer-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud
                </p>
              </div>
              <div className="col-sm-4">
                <h2>Kommunikation</h2>
                <hr />
                <p className="footer-text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud.
                </p>
              </div>
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
