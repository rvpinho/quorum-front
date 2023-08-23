import { EventPeople } from "app/auth/models/eventPeople";
import { Component, OnInit } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { EventPeopleService } from "app/services/eventPeople.service";
import { EventService } from "app/services/event.service";
import { UntypedFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-event-People.",
  templateUrl: "./event-people.component.html",
  styleUrls: ["./event-people.component.scss"],
})
export class EventPeopleComponent implements OnInit {
  file: any = undefined;
  constructor(
    private eventPeopleService: EventPeopleService,
    private cdr: ChangeDetectorRef,
    private _router: Router,
    private eventService: EventService
  ) {}

  public contentHeader: object;

  popupVisivel = false;
  modalOn = false;
  modalDetailOn = false;
  detailEventPeople: any = {};
  detailEventPeopleKeys: any = [];
  events: Event[] = [];

  eventPeople: EventPeople[];
  event: any[] = [];
  eventSelected: string = '';
  qrCodeDataUrl: string;

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {

    this.getEvents();
    this.contentHeader = {
      headerTitle: "EventPeople",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [],
      },
    };

    this.eventPeople = [];

    this.getEventPeople();
  }

  getEventPeople(){
    this.eventPeople = [];
    if(this.eventSelected != ""){
      this.eventPeopleService.getByEventName(this.eventSelected).subscribe((data) => {
        data.forEach((element) => {
          let eventPeople = element;
          this.eventPeople.push(eventPeople);
          this.cdr.detectChanges();
        });
      });
    }

  }

  deleteEventPeople(eventPeopleId: string) {
    this.eventPeopleService.deleteEventPeople(eventPeopleId).subscribe(() => {
      this.getEventPeople();
    });
  }

  getEventName(id: any){
    const eventosFiltrados = this.event.find(evento => evento.id === id);
    if(eventosFiltrados != undefined){
      return eventosFiltrados.name;
    }else{
      return '';
    }
  }

  qrCode(id: any){
    this.eventPeopleService.generateQRCode(id).subscribe((blob: Blob) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.qrCodeDataUrl = reader.result as string;
      };
      reader.readAsDataURL(blob);
    });
  }

  generateTemplate(){
    this.eventPeopleService.downloadTemplate().subscribe((data: any) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'template.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

  importXLS(){
    this.modalOn = true;
  }

  closeModal(): void {
    this.qrCodeDataUrl = null;
  }

  closeQR(): void {
    this.modalOn = false;
    this.modalDetailOn = false;
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    this.file = file;
  }

  upload(){
    if(this.file != undefined){
      this.eventPeopleService.uploadEventPeopleList(this.file, this.eventSelected).subscribe(() => {
        window.location.reload();
      });
    }
  }

  getEvents(){
    this.eventService.getAll().subscribe((data: any) => {
      this.events = data;
    })
  }

  onSelecaoChange(event: any) {
    this.eventSelected = event.target.value;
    this.getEventPeople();
  }

  abrirModal(item: any){
    this.detailEventPeople = item;
    if(this.detailEventPeople != undefined){
      this.detailEventPeopleKeys = Object.keys(this.detailEventPeople);
      this.modalDetailOn = true;
    }
  }

  confirmarPresenca(item: any){
    item.checked = true;
    item.id = item._id
    delete item._id;
    
    this.eventPeopleService.update(item).subscribe(() => {
      this.getEventPeople();
    });

  }
}
