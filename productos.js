let autos = require("./autos");
//console.log(autos);
let concesionaria = {
    autos: autos,

    buscarAuto: function (pat) {
        //console.log(this.autos.length);
        for (let i = 0; i < this.autos.length; i++) {
            if (this.autos[i].patente == pat) {
                //console.log(this.autos[i].patente);
                return this.autos[i];
            }
        }
        return null;
    },

    venderAuto: function (pat) {
        let auto = this.buscarAuto(pat);
        auto.vendido = true;
        //console.log(auto);
    },

    autosParaLaVenta: function () {
        let autosVenta = this.autos.filter(function (e) {
            return e.vendido == false;
        });
        return autosVenta;
    },

    autosNuevos: function () {
        let autosVenta = this.autosParaLaVenta();
        let autosNuevos = autosVenta.filter(function (e) {
            return e.km < 100;
        });
        return autosNuevos;
    },

    listaDeVentas: function () {
        let autosVendidos = this.autos.filter(function (e) {
            return e.vendido == true;
        });
        let precioV = [];
        autosVendidos.forEach(function (e) {
            precioV.push(e.precio);
        });
        return precioV;
    },

    totalDeVentas: function () {
        let listaV = this.listaDeVentas();
        console.log("lv", listaV);
        if (listaV.length == 0) {
            return 0;
        } else {
            let total = listaV.reduce(function (i, e) {
                return i + e;
            });
            return total;
        }
    },

    puedeComprar: function (a, p) {
        if ((a.precio < p.capacidadDePagoTotal) && (p.capacidadDePagoEnCuotas > (a.precio / a.cuotas))) {
            return true;
        }
        return false;
    },

    autosQuePuedeComprar: function (p) {
        let autos = this.autosParaLaVenta();
        //console.log(autos);
        let autosPuede = [];
        for (let i = 0; i < autos.length; i++) {
            if (this.puedeComprar(autos[i], p) == true) {
                autosPuede.push(autos[i]);
            }
        }
        return autosPuede;
    }


}

console.log(concesionaria.autosQuePuedeComprar({ nombre: "Diego", capacidadDePagoEnCuotas: 7200, capacidadDePagoTotal: 100000000 }));
/*console.log(concesionaria.puedeComprar({
    marca: "Toyota",
    modelo: "Corolla",
    precio: 150000,
    km: 0,
    color: "Blanco",
    cuotas: 12,
    anio: 2019,
    patente: "JJK116",
    vendido: false
}, { nombre: "Diego", capacidadDePagoEnCuotas: 30000, capacidadDePagoTotal: 100000000 }));*/
/*console.log(concesionaria.puedeComprar2(
    { nombre: "Diego", cantidadDePagoEnCuotas: 30000, cantidadDePagoTotal: 100000000 },
    {
        marca: "Toyota",
        modelo: "Corolla",
        precio: 150000,
        km: 0,
        color: "Blanco",
        cuotas: 12,
        anio: 2019,
        patente: "JJK116",
        vendido: false
    }));*/