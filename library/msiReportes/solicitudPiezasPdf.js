
const pdf = require('pdfkit');
const pdfTools = require('../pdfkit/gxPdf');
const path = require('path');
const fs = require('fs');

const moment = require('moment');
require('moment/locale/es');  // without this line it didn't work
moment.locale('es');


const solicitudPiezasPdf = (solicitudPiezasBD) => {


  {
    /*
     {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('MMMM'))",
      "row": 4.8,
      "col": 15,
      "align": "left",
      "fontSize": 10,
      "color": "black"
    },
    {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('YYYY'))",
      "row": 4.8,
      "col": 18.3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },

    {
      "name": "sp.nombreAutoriza",
      "row": 5.95,
      "col": 6.3,
      "fontSize": 9
    },
    {
      "name": "sp.parentescoAutoriza",
      "row": 6.5,
      "col": 5,
      "fontSize": 9
    },
    {
      "name": "paciente.nombre",
      "row": 8.7,
      "col": 3.7,
      "fontSize": 9
    },
    {
      "name": "(paciente.fechaNacimiento===undefined?vacio:moment(paciente.fechaNacimiento).format('YYYY-MMM-DD'))",
      "row": 8.7,
      "col": 17.3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('HH:mm'))",
      "row": 9.85,
      "col": 3.2,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('DD'))",
      "row": 9.85,
      "col": 7.3,
      "align": "left",
      "fontSize": 10,
      "color": "black"
    },
    {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('MMMM'))",
      "row": 9.85,
      "col": 9.2,
      "align": "left",
      "fontSize": 10,
      "color": "black"
    },
    {
      "name": "(sp.fechaFirma===undefined?vacio:moment(sp.fechaFirma).format('YYYY'))",
      "row": 9.85,
      "col": 12.3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.nombreAutoriza||'')",
      "row": 12.15,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.edadAutoriza||'')",
      "row": 12.7,
      "col": 2.5,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.parentescoAutoriza||'')",
      "row": 12.7,
      "col": 8,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.domicilioAutoriza||'')",
      "row": 13.25,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },

    {
      "name": "sp.firmaBase64Autoriza",
      "row": 15,
      "col": 7,
      "type": "img",
      "width": 200
    },

    {
      "name": "(sp.nombreTestigo1||'')",
      "row": 17.8,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.edadTestigo1||'')",
      "row": 18.4,
      "col": 2.5,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.parentescoTestigo1||'')",
      "row": 18.4,
      "col": 8,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.domicilioTestigo1||'')",
      "row": 18.95,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "sp.firmaBase64Testigo1",
      "row": 20.7,
      "col": 7,
      "type": "img",
      "width": 200
    },


    {
      "name": "(sp.nombreTestigo1||'')",
      "row": 22.35,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.edadTestigo1||'')",
      "row": 22.9,
      "col": 2.5,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.parentescoTestigo1||'')",
      "row": 22.9,
      "col": 8,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "(sp.domicilioTestigo1||'')",
      "row": 23.45,
      "col": 3,
      "align": "left",
      "fontSize": 9,
      "color": "black"
    },
    {
      "name": "sp.firmaBase64Testigo2",
      "row": 25,
      "col": 7,
      "type": "img",
      "width": 200
    }
     */ 
  }
  console.log('1.- EN solicitudPiezasPdf->', solicitudPiezasBD);

  let sp = solicitudPiezasBD;
  //console.log('EN solicitudPiezasPdf->', sp);
  let paciente = sp.paciente;

  const hojaCartaPort = [612, 792];
  const hojaCartaLan = [792, 612];

  var doc = new pdf({
    size: 'letter',
    layout: 'portrait',
    //size: hojaCartaPort,
    margin: 0,
    info: {
      Title: 'SOLCITUD DE ESTUDIO Y DISPOSICIÓN DE PIEZAS ANOTOMOPATOLÓGICAS: msi-04 v1.0',
      Author: 'Clínica Médica San Isidro',
    }
  });
  //doc.lineWidth(3);
  //doc.lineJoin('round')
  //  .rect(5, 5, 600, 750)
  //  .stroke();


  const anchoHoja = pdfTools.mmToPt(210.02); // ptos: 612;
  const altoHoja = pdfTools.mmToPt(297.01);  // Ptos: 792;
  const margenIzq = 10;
  const margenDer = 10;
  const maxAncho = anchoHoja - margenDer - margenIzq;
  const margenSup = 10;
  const margenInf = 10;
  const maxAlto = altoHoja - margenInf - margenSup;
  const sizePaperLetter = '210.02x297.01';
  const centroMedico = 'Médica San Isidro';


  let imgFormato = path.resolve(__dirname, '../../msiformatos/msi22.jpg');

  doc.image(imgFormato, {
    fit: [anchoHoja, altoHoja]
  });
  const vacio = '';

  let pathCfg = path.join(__dirname, './solicitudPiezasFields.cfg');

  let pages = JSON.parse(fs.readFileSync(pathCfg, 'utf-8').toString().replace(/\n|\r/g, "").trim());

  doc.registerFont('arialnarrow', 'fonts/arial-narrow.ttf');

  //pages.forEach(function (field) {
  //  console.log('\r\n sfield->', field.name);
  //  writeLine(doc, eval(field.name), field.row, field.col, field.align, field.fontSize, field.color);
  //});


  pages[0].forEach(function (field) {
    let paciente = sp.paciente;
    let medicos = paciente.medicos;
    let medicoTratante = medicos[0];
    let domicilio = (paciente.calle || '') + ' ' +
      (paciente.numExterior || '') + ' ' + (paciente.numInterior || '') + (paciente.calle ? ', ' : '') +
      (paciente.colonia ? paciente.colonia + ',' : '') + (paciente.municipio ? paciente.municipio + ' ' : '') +
      (paciente.entidad ? paciente.entidad + ' ' : '') + (paciente.CP ? ' CP' + paciente.CP : '');

    console.log('field-->', field, 'type->', field.type, eval(field.name));
    

    writeLine(doc, eval(field.name), field.row, field.col, field.align, field.indent, field.fontSize, field.color, field.width, field.type);
  });

  /// Agrega otra hoja

  //doc.addPage({
  //  size: 'letter',
  //  layout: 'portrait',
  //  margin: 0
  //});

  //imgFormato = path.resolve(__dirname, '../../msiformatos/msi02-2.jpg');

  //doc.image(imgFormato, {
  //  fit: [anchoHoja, altoHoja]
  //});
  //pages[1].forEach(function (field) {
  //  console.log(' hoja 2 field-->', field, 'type->', field.type);
  //  writeLine(doc, eval(field.name), field.row, field.col, field.align, field.fontSize, field.color, field.width, field.type);
  //});





  // Stream contents to a file
  const fileName = 'MSI22-' + Date.now() + '.pdf';
  const filePath = path.join(__dirname, '../../public/pdfs/' + fileName);


  doc.pipe(fs.createWriteStream(filePath)).on('finish', function () {
    console.log('Archivo creado satisfactoriamente ....');
    //return filePath;
  });



  doc.end();
  return filePath;
  //var buffer = encoding.convert(data, "Latin_1") 
}




function writeLine(doc, text, row, col, align, indent, fontSize, color, width, type) {
  const vacio = '';
  //console.log('---- ');
  //console.log('in writeLine-> text: [', text, '] typeOf', typeof (text));
  //console.log('in writeLine-> align: [', align, '] typeOf', typeof (align));
  //console.log('in writeLine-> fontSize: [', fontSize, '] typeOf', typeof (fontSize));
  //console.log('in writeLine-> color: [', color, '] typeOf', typeof (color));
  //console.log('in writeLine-> row: [', row, '] typeOf', typeof (row));
  //console.log('in writeLine-> col: [', col, '] typeOf', typeof (col));


  // Es una imagen base64
  console.log('ES IMAGEN-->?', type);
  if (type == 'img') {
    if (text) {
      var dataImgDecodeFromBase64 = new Buffer.from(text, 'base64');
      doc.image(dataImgDecodeFromBase64, pdfTools.cmToPt(col), pdfTools.cmToPt(row), { width: width });
    };
    return;
  };

  // Es un texto normal
  if (!col || !row) {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, {
        align: align || 'left',
        width: pdfTools.cmToPt(width),
        indent: (pdfTools.cmToPt(indent) || 0),
        ellipsis: true
      });
  }
  else {
    doc.moveDown()
      .fillColor(color || 'black')
      .fontSize(fontSize || 10)
      .text(text || vacio, pdfTools.cmToPt(col || 1), pdfTools.cmToPt(row || 1), {
        align: align || 'left',
        width: pdfTools.cmToPt(width),
        indent: (pdfTools.cmToPt(indent) || 0),
        ellipsis: true
      });
  };
}

////function writeLine(doc, text, row, col, align, fontSize, color) {
////  const vacio = '';
////  //console.log('---- ');
////  //console.log('in writeLine-> text: [', text, '] typeOf', typeof (text));
////  //console.log('in writeLine-> align: [', align, '] typeOf', typeof (align));
////  //console.log('in writeLine-> fontSize: [', fontSize, '] typeOf', typeof (fontSize));
////  //console.log('in writeLine-> color: [', color, '] typeOf', typeof (color));
////  //console.log('in writeLine-> row: [', row, '] typeOf', typeof (row));
////  //console.log('in writeLine-> col: [', col, '] typeOf', typeof (col));
////doc.moveDown()
////  .fillColor(color||'black')
////  .fontSize(fontSize||10)
////  .text(text||vacio, pdfTools.cmToPt(col||1), pdfTools.cmToPt(row||1), {
////    align: align||'left',
////    //indent: 2,
////    ellipsis: true
////  });
////}

module.exports = solicitudPiezasPdf;