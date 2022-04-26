var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var LabelsSchema = new Schema({
	"user": {"type":mongoose.Schema.Types.ObjectId, "ref":"Users"},
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
	"ingredientes":[{"valor":String, "porcentaje":String}],
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
	"direccion":String,
	"instrucciones":String,
	"posicion":{
		"pesos":{
			"x":Number,
			"y":Number
		},
		"nombre":{
			"x":Number,
			"y":Number
		},
		"ingredientes":{
			"x":Number,
			"y":Number
		},
		"alergenos":{
			"x":Number,
			"y":Number
		},
		"infNut":{
			"x":Number,
			"y":Number
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
			"total":Number,
			"saturada":Number,
			"trans":Number,
		},
		"acidosPoli":Number,
		"colesterol":Number,
		"sodio":Number,
		"carbohidratos":Number,
		"azucares":Number,
		"proteinas":Number,
		"fibra":Number,
		"energiaTotal":{
			"julios":Number,
			"calorias":Number
		}
	}

});

module.exports = mongoose.model('Labels', LabelsSchema, "Labels");
