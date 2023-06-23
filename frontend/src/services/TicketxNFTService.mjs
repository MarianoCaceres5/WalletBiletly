import sql from "mssql";
import config from "../../dbconfig.mjs";

export default class TicketxNFTService {
  
  createEntradaxNFT = async (tokenCount, idEntrada) => {
    let resultado = null;
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
  };
}
