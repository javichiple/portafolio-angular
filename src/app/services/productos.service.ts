import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando= true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    
    this.cargarProductos();
  }


  private cargarProductos() {


    return new Promise ((resolve, reject) => {

      this.http.get('https://angular-html-25cf9.firebaseio.com/productos_idx.json')
        .subscribe( (resp: any) => {

          //console.log(resp);
          this.productos = resp;
          this.cargando = false;
          resolve(true);
        });


    });
    

    
  }

  getProducto(id: string){

    //Buscamos el producto en Firebase por el id
    return this.http.get(`https://angular-html-436a4-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto (termino: string){


    if(this.productos.length === 0) {
      //cargar productos

      this.cargarProductos().then(() =>{
        //Ejecutar despues de tener los productos
        //Aplicar el filtro
        this.filtrarProductos(termino);
      });

    } else {
      //aplicar el filtro
      this.filtrarProductos(termino);
    }

  
  }

  private filtrarProductos(termino: string) {

    //console.log(this.productos);
    this.productosFiltrado = []; //Purgamos el arreglo para que no se vayan sumando las diferentes busquedas.

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase(); //pasamos el titulo a minuscula

      if (prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf(termino) >=0) { //Si el valor de "termino" es igual o tiene parte de la categoria o del titulo
        this.productosFiltrado.push(prod); //agregamos ese producto al arreglo de productosFiltrado 
      }

    });
  }

}
