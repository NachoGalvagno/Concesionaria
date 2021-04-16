const autos = require('./autos')
let concesionaria = {
   autos: autos,
   buscarAuto : function(patente) {
      for ( let i = 0 ; i < autos.length ; i++){
         if ( patente == autos[i].patente ) {
            return autos[i]
         }
      }
      return null
   },
   venderAuto : function(patente) {
      this.buscarAuto(patente).vendido = true
      }, 
   autosParaLaVenta : function() {
     return autos.filter(function(auto,vendido) {
        return auto.vendido == false
     })
   },
   autosNuevos : function() {
     return this.autosParaLaVenta()
        .filter(function(auto, km) {
            return auto.km <= 100
         })
      },
   listaDeVentas: function() {
    let autosVendidos =  autos.filter(function(auto,vendido){
         return auto.vendido == true
      }) 
      return autosVendidos.map(function(auto,precio){
         return auto.precio
      })
 },
   totalDeVentas: function() {
      if (this.listaDeVentas().length == 0) {
         return 0
      }
      return this.listaDeVentas().reduce(function(acumulador, precio) {
            return acumulador + precio
         })
   },   
   puedeComprar: function(auto, persona) {
   return ((persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas)) && (persona.capacidadDePagoTotal >= auto.precio)) ? true : false
      },
   autosQuePuedeComprar: function(persona) {
      let autosVenta = this.autosParaLaVenta()
      let autosPuedeComprar = [ ]
         for (i = 0 ; i < autosVenta.length ; i++) {
            if ( this.puedeComprar(autosVenta[i], persona)) {
               autosPuedeComprar.push(autosVenta[i])
            }
         }  
         return autosPuedeComprar
         }
}
let persona = {
   nombre: 'Juan',
   capacidadDePagoEnCuotas: 72000000,
   capacidadDePagoTotal: 10000000
   }
   
// console.log(concesionaria.autosQuePuedeComprar(persona))
// console.log(concesionaria.buscarAuto('JJK116'))
// console.log(concesionaria.venderAuto('APL123'))
// concesionaria.venderAuto('JJK116')
// console.log(concesionaria.autosParaLaVenta())
// concesionaria.autosParaLaVenta()
// console.log(autos)
// console.log(concesionaria.autosNuevos()) 
// console.log(concesionaria.listaDeVentas())
// console.log(concesionaria.totalDeVentas())
//console.log(concesionaria.puedeComprar(persona, autos[0]))