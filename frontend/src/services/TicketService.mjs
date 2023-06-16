import sql from "mssql";
import config from "../../dbconfig.mjs";

export default class TicketService {
  getEntradas = async () => {
    let resultado = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool.request().query("SELECT * FROM Entrada");

      resultado = result.recordsets[0];
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

  getEventoxIdEntrada = async (id) => {
    let resultado = null;

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, id)
        .query("exec EventoxIdEntrada @pId");

      resultado = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

  getEntradaxId = async (id) => {
    let resultado = null;

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, id)
        .query("exec getEentradaxId @pId");

      resultado = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

  updateEntrada = async (id) => {
    let resultado = null;
    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pId", sql.Int, id)
        .query("exec UpdateEntrada @pId");
      resultado = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };
}
