import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import {db} from '../../services/request-db.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {GlobalVariables} from '../../global-variables';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrl: './new-request.component.scss'
})
export class NewRequestComponent implements AfterViewInit {
  private map: L.Map | undefined;
  private startMarker: L.Marker | null = null;
  private endMarker: L.Marker | null = null;
  // @ts-ignore
  private routingControl: L.Routing.Control | null = null;
  Description: string | null = null;
  Name: string | null = null;
  Weight: string | null = null;
  Dimensions: string | null = null;
  RequiresRefrigeration: string | null = null;
  PaymentMethod: string | null = null;
  private customIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/8211/8211268.png',
    iconSize: [40, 40],
    iconAnchor: [15, 40]
  });

  constructor(private order: OrderService, private router: Router, private user: UserService, private spinner: NgxSpinnerService, private glovar: GlobalVariables) {
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [36.8065, 10.1815],
      zoom: 13
    });

    L.tileLayer('https://api.maptiler.com/maps/dataviz/256/{z}/{x}/{y}.png?key=o537OHI8dKS8vdf22tq3', {
      attribution: '&copy; MapTiler, OpenStreetMap contributors',
      detectRetina: true,
      maxZoom: 18
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => this.handleMapClick(e));
  }

  private handleMapClick(e: L.LeafletMouseEvent): void {
    if (!this.startMarker) {
      this.startMarker = L.marker(e.latlng, {icon: this.customIcon}).addTo(this.map!);
    } else if (!this.endMarker) {
      this.endMarker = L.marker(e.latlng, {icon: this.customIcon}).addTo(this.map!);
      this.drawRoute(this.startMarker.getLatLng(), this.endMarker.getLatLng());
    } else {
      // Reset everything on third click
      this.map?.removeLayer(this.startMarker);
      this.map?.removeLayer(this.endMarker);
      this.routingControl?.remove();

      this.startMarker = L.marker(e.latlng, {icon: this.customIcon}).addTo(this.map!);
      this.endMarker = null;
      this.routingControl = null;
    }
  }

  private drawRoute(start: L.LatLng, end: L.LatLng): void {
    // @ts-ignore
    this.routingControl = L.Routing.control({
      waypoints: [start, end],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      show: false,
      createMarker: (i: any, waypoint: any, n: any) => {
        return L.marker(waypoint.latLng, {
          icon: this.customIcon
        });
      }
    }).addTo(this.map!);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  async saveRequest(): Promise<void> {
    if (this.startMarker && this.endMarker) {
      const start = this.startMarker.getLatLng();
      const end = this.endMarker.getLatLng();

      this.spinner.show();

      try {
        const userProfile = await this.user.getUserProfile();
        const payload = {
          merchantId: userProfile.id,
          startingDestination: start.lat,
          endingDestination: end.lat,
          name: this.Name ?? '',
          description: this.Description ?? '',
          weight: this.Weight,
          dimensions: this.Dimensions,
          requiresRefrigeration: this.RequiresRefrigeration,
          paymentMethod: this.PaymentMethod
        };

        await this.order.create_order(payload);
        this.router.navigate(['/Request']);
      } catch (err) {
        console.error(err);
      } finally {
        this.spinner.hide();
      }
    } else {
      alert('Please place both start and end markers on the map.');
    }
  }

}
