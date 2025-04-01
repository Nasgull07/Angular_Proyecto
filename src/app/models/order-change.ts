export interface OrderChange {
    _id: string; // ID único del cambio de orden
    order_id: string; // ID de la orden asociada
    user_id: string; // ID del usuario que realizó el cambio
    changeDate: Date; // Fecha del cambio
    changes: string; // Descripción de los cambios realizados
  }