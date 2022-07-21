var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LabelsSchema = new Schema({
	"user": {"type":mongoose.Schema.Types.ObjectId, "ref":"Users"},
	"country":String,
	'nombreProyecto' : String,
	'tipo' : String,
	"nombreEtiqueta": String,
	"marca": String,
	"dimensiones":{
		"ancho":String,
		"altura":String,
		"unidad":{"value":String, "label":String},
		"sizeIndicatorVisibility":String
	},
	"pesoNeto":{
		"valor":String, 
		"label":{"value":String, "label":String},
		"unidad":{"value":String, "label":String}
	},
	"pesoDrenado":{
		"valor":String, 
		"label":{"value":String, "label":String},
		"unidad":{"value":String, "label":String},
		"isDisabled":Boolean
	},
	"alcohol":{
		"valor":String,
		"unidad":{"value":String, "label":String}
	},
	"ingredientes":[{"ing":String, "percentage":String}],
	"alergenos":[{"value":String, "label":String}],
	"conservacion":{
		"metodo":{"value":String, "label":String},
		"unidad":{"value":String, "label":String}
	},
	"vidaUtil":{
		"valor":String,
		"unidad":{"value":String, "label":String}
	},
	"fabricacion":{
		"valor":String,
		"unidad":{"value":String, "label":String}
	},
	"caducacion":{
		"valor":String,
		"unidad":{"value":String, "label":String}
	},
	"lote":String,
	"addInfo":[{"title":String, "cont":String}],
	"direccion":[{"value":String, "label":String}],
	"instrucciones":[String],
	"pvp":String,
	"posicion":{
		"pesos":{
			"x":String,
			"y":String
		},
		"nombre":{
			"x":String,
			"y":String
		},
		"marca":{
			"x":String,
			"y":String
		},
		"ingredientes":{
			"x":String,
			"y":String
		},
		"alergenos":{
			"x":String,
			"y":String
		},
		"infNut":{
			"x":String,
			"y":String
		},
		"alcohol":{
			"x":String,
			"y":String
		}
	},
	"TablaNutri":{
		"tipo":{"value":String, "label":String},
		"tamanioPorcion":{
			"valor":Number,
			"unidad":{"value":String, "label":String}
		},
		"porcionPorEnvase":{
			"isDisabled":Boolean,
			"valor":Number,
			"unidad":{"value":String, "label":String}
		},
		"grasas":{
			"total":{"report":String, "vdr":String},
			"saturada":{"report":String, "vdr":String},
			"trans":{"report":String, "vdr":String},
		},
		"acidosMono":{"report":String, "vdr":String},
		"acidosPoli":{"report":String, "vdr":String},
		"colesterol":{"report":String, "vdr":String},
		"sodio":{"report":String, "vdr":String},
		"carbohidratos":{"report":String, "vdr":String},
		"azucares":{"report":String, "vdr":String},
		"proteina":{"report":String, "vdr":String},
		"fibra":{"report":String, "vdr":String},
		"energiaTotal":{
			"julios":Number,
			"calorias":Number
		}
	}

});

module.exports = mongoose.model('Labels', LabelsSchema, "Labels");
