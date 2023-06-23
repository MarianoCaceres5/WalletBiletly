import sql from "mssql";
import config from "../../dbconfig.mjs";

export default class TicketxUsuarioService {

  createEntradaxUsuario = async (address, idEntrada) => {
    let resultado = null;
    console.log('createEntradaxUsuario')
    try {
      let pool = await sql.connect(config);
      let usuario = await this.getUsuarioxAddress(address);
      let userId;

      if(usuario == null || usuario == undefined){
        usuario = await pool
        .request()
        .input("pAddress", sql.VarChar, address)
        .query(`INSERT INTO Usuario(address) OUTPUT inserted.idUsuario VALUES (@pAddress)`);
        userId = usuario.recordset[0].idUsuario;
      }else{
        userId = usuario.idUsuario;
      }

      let result = await pool
        .request()
        .input("pUserId", sql.Int, userId ?? "")
        .input("pIdEntrada", sql.Int, idEntrada ?? "")
        .query(`INSERT INTO EntradaxUsuario(idEntrada, idUsuario) VALUES (@pIdEntrada, @pUserId)           
        `);
      resultado = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

  getUsuarioxAddress = async (address) => {

    let resultado = null;
    console.log('getUsuarioxAddress')

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pAddress", sql.VarChar, address)
        .query(`SELECT * FROM Usuario WHERE Usuario.address = @pAddress`);
      resultado = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };

  getEntradasxUsuario = async (address) => {
    let resultado = null;
    console.log('getEntradasxUsuario')

    try {
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("pAddress", sql.VarChar, address)        
        .query(`SELECT Entrada.numAsiento as numAsiento, Entrada.imagen as imagen, Entrada.tieneNFT as tieneNFT, Entrada.descripcion as descripcion, Entrada.idEvento as idEvento from EntradaxUsuario 
                inner join Usuario on Usuario.idUsuario = EntradaxUsuario.idUsuario
                inner join Entrada on Entrada.idEntrada = EntradaxUsuario.idEntrada
                WHERE Usuario.address = @pAddress`);
                resultado = result.recordsets[0];

    } catch (error) {
      console.log(error);
    }
    return resultado;
  };


}
