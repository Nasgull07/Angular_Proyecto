import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { OrderChange } from '../../models/order-change'; // Importa el modelo de OrderChange
import { CommonModule } from '@angular/common';
import { OrderComponent } from '../order/order.component'; 
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-change',
  templateUrl: './order-change.component.html',
  imports: [CommonModule, OrderComponent, FormsModule], // Importa CommonModule aquí
  styleUrl: './order-change.component.css'
})
export class OrderChangeComponent implements OnInit {
  orderChanges: OrderChange[] = []; // Propiedad para almacenar las order_changes
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
  userId: string = '';
  modificacionId: string = '';
  ngOnInit(): void {
    this.fetchOrderChanges(); // Llamar al método al iniciar el componente
  }

  fetchOrderChanges(): void {
    this.apiService.getAllOrder_changes(1, 10).subscribe({
      next: (data) => {
        this.orderChanges = data;
        console.log('Order Changess:', this.orderChanges); // Asignar los datos obtenidos
      },
      error: (err) => {
        console.error('Error al obtener las order_changes:', err);
      }
    });
     
  }

  fetchOrderChangesByUserId(): void {
    if (!this.userId) {
      console.warn('Debe ingresar un ID de usuario.');
      return;
    }

    this.apiService.getOrderChangesByUserId(this.userId).subscribe({
      next: (data) => {
        this.orderChanges = data;
        console.log(`Order Changes del usuario ${this.userId}:`, this.orderChanges);
      },
      error: (err) => {
        console.error(`Error al obtener las order_changes del usuario ${this.userId}:`, err);
      }
    });
  }

  createOrderChange(): void {

    this.apiService.createOrderChange(this.orderChanges[0]).subscribe({
      next: (data) => {
        console.log('Order Change creado:', data);
        this.fetchOrderChanges(); // Refrescar la lista después de crear un nuevo order_change
      },
      error: (err) => {
        console.error('Error al crear el order_change:', err);
      }
    });
  }
  

  fetchOrderChangesById(): void {
    if (!this.modificacionId) {
      console.warn('Debe ingresar un ID de usuario.');
      return;
    }

    this.apiService.getOrderChangeById(this.modificacionId).subscribe({
      next: (data) => {
        this.orderChanges = Array.isArray(data) ? data : [data];;
        console.log(`Order Changes id ${this.modificacionId}:`, this.orderChanges);
      },
      error: (err) => {
        console.error(`Error al obtener las order_changes del usuario ${this.modificacionId}:`, err);
      }
    });
  }
}