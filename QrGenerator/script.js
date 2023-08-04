const URL_BASE = "http://localhost:3000/Tickets/";

var body_loadHander = function () {
  let idEvento = 2;
  let variable = 'h'
  let url = URL_BASE + "getEntradasYUsuariosxEvento/" + idEvento;
  console.log(url);
  axios
    .get(url)
    .then((result) => {
      variable = result.data;
      console.log(result.data);
      update_qrcode(JSON.stringify(variable));
    })
    .catch((error) => {
      console.log(error);
    });

  var crtOpt = function (value, label) {
    var opt = document.createElement("option");
    opt.appendChild(document.createTextNode(label));
    opt.value = value;
    return opt;
  };

  var t = document.forms["qrForm"].elements["t"];
  t.appendChild(crtOpt("" + 0, "Auto Detect"));
  for (var i = 1; i <= 40; i += 1) {
    t.appendChild(crtOpt("" + i, "" + i));
  }
  t.value = "0";

  
};

var draw_qrcode = function (text, typeNumber, errorCorrectionLevel) {
  document.write(create_qrcode(text, typeNumber, errorCorrectionLevel));
};

var create_qrcode = function (
  text,
  typeNumber,
  errorCorrectionLevel,
  mode,
  mb
) {
  qrcode.stringToBytes = qrcode.stringToBytesFuncs[mb];

  var qr = qrcode(typeNumber || 4, errorCorrectionLevel || "M");
  qr.addData(text, mode);
  qr.make();

  //  return qr.createTableTag();
  //  return qr.createSvgTag();
  return qr.createImgTag();
};

var update_qrcode = function (variable) {
  var form = document.forms["qrForm"];
  var text = form.elements["msg"].value.replace(
    /^[\s\u3000]+|[\s\u3000]+$/g,
    ""
  );
  var t = form.elements["t"].value;
  var e = form.elements["e"].value;
  var m = form.elements["m"].value;
  var mb = form.elements["mb"].value;
  document.getElementById("qr").innerHTML = create_qrcode(variable, t, e, m, mb);
};
