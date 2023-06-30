import sql from "mssql";
import config from "../../dbconfig.mjs";
import e from "cors";

export default class TicketxNFTService {

  getEntradaxTokenCount = async (tokenCount) => {
    let entrada = null;
    console.log('GetEntradaxTokenCount')
    try {      
      let pool = await sql.connect(config);
      let result = await pool
        .request()
        .input("ptokenCount", sql.Int, tokenCount ?? "")
        .query(`SELECT * FROM Entrada
        Inner join EntradaxNFT on Entrada.idEntrada = EntradaxNFT.idEntrada
        where EntradaxNFT.tokenCount = @ptokenCount`);
        entrada = result.recordsets[0][0];
    } catch (error) {
      console.log(error);
    }
    return entrada;
  };
  
  createEntradaxNFT = async (tokenCount, idEntrada) => {
    
    let resultado = null;

    if (await this.getEntradaxTokenCount(tokenCount) == null){
      console.log('createEntradaxNFT')
      try {      
        let pool = await sql.connect(config);
        let result = await pool
          .request()
          .input("ptokenCount", sql.Int, tokenCount ?? "")
          .input("pIdEntrada", sql.Int, idEntrada ?? "")
          .query(`INSERT INTO EntradaxNFT(idEntrada,tokenCount) VALUES (@pIdEntrada,@ptokenCount);`);
        resultado = result.rowsAffected;
      } catch (error) {
        console.log(error);
      }
      return resultado;
    }    
  };
}
