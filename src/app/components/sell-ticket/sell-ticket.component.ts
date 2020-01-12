import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/events.service';
import { MethodService } from 'src/app/services/method.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

declare var $;
@Component({
  selector: 'app-sell-ticket',
  templateUrl: './sell-ticket.component.html',
  styleUrls: ['./sell-ticket.component.css'],
  providers: [EventService, MethodService, AuthService]
})
export class SellTicketComponent implements OnInit {

  public events;
  public identity;
  public debit_cards;
  public credit_cards;
  public optionT;
  public count: number;
  public methodP = [];
  public methodPIn = [];
  public total = 0;
  p: number = 1;

  constructor(private _eventsService: EventService, private _methodService: MethodService,
    private _authService: AuthService, private _service: NotificationsService) { }

  ngOnInit() {
    this._eventsService.getAllEvents().subscribe(
      response => {
        this.events = response.events;
        console.log(this.events);


      },
      error => {
        console.log(<any>error);

      }
    );
    this.identity = this._authService.getIdentity();
  }

  sellTicket(form, event) {
    let qty = +($('#qty' + event.id).val());
    if (qty > event.cantidad_entrada_actual) {
      alert('Limite de entradas disponibles superado');
      $("#selectList3" + event.id).val($("#selectList3 option:first" + event.id).val());
      this.total = 0;
    }
    else {
      this.methodPIn = this.methodP;

      let data_sell_ticket=new Object;

      data_sell_ticket={cliente_id: this.identity.id, rol: this.identity.rol, evento_id:event.id, cantidad_entradas: qty, monto: this.total, pago: this.methodPIn};

      console.log(data_sell_ticket);
      console.log(JSON.stringify(data_sell_ticket));


      this._eventsService.sellTicket(data_sell_ticket).subscribe(

        response => {
          console.log(response);

          if (response.status == 'success') {
            this.notificationSucessBuy();
          }
          if (response.status == 'error') {
            this.notificationError();
          }
          this.total = 0;
          $('#qty' + event.id).val('');
        },
        error => {
          console.log(<any>error);
          this.total = 0;
          $('#qty' + event.id).val('');
        }
      );

      $("#ticket" + event.id).modal('hide');

    }



  }

  openModal(event) {
    this.count = 0;
    this.methodP = [];
    this.optionT = 0;

    $("#ticket" + event.id).modal('show');

    this._methodService.getCards(this.identity.id, this.identity.rol, 'credito').subscribe(
      response => {
        this.credit_cards = response;
      },

      error => {
        console.log(<any>error);

      }

    );

    this._methodService.getCards(this.identity.id, this.identity.rol, 'debito').subscribe(
      response => {
        this.debit_cards = response;
      },

      error => {
        console.log(<any>error);

      }

    );
  }

  optionSelectedType(option) {
    //console.log(option);
    if (option == 'Tarjeta de credito') {
      this.optionT = 1;
    } else if (option == 'Tarjeta de debito') {
      this.optionT = 2;
    }

    //console.log(this.debit_cards);
    //console.log(this.credit_cards);
  }

  optionSelectedM(methodPayment, event) {
    let prueba = JSON.parse(methodPayment);
    let qty = +($('#qty' + event.id).val());

    console.log(qty);
    console.log(event);

    let price = qty * event.precio_entrada;
    this.total = price;

    if (this.count == 0) {
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: price });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: price });
      }
      this.count = 1;
    }
    else {
      this.count = 0;
      this.methodP = [];
      if (this.optionT == 1) {
        this.methodP.push({ id: prueba.id, tipo: 'credito', monto: price });
      } else if (this.optionT == 2) {
        this.methodP.push({ id: prueba.id, tipo: 'debito', monto: price });
      }
      this.count = 1;
    }

    console.log(this.methodP);
  }

  notificationSucessBuy() {
    this._service.success('Compra realizada', 'Gracias por su compra', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationActionError() {
    this._service.error('Error', 'No fue posible realizar esta operación. Intente mas tarde.', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }

  notificationError() {
    this._service.error('Error', 'Datos enviados incorrectamente', {
      timeOut: 5000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      position: ["top", "right"]
    });
  }
}


