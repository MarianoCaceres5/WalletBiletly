import sql from "mssql";
import config from "../../dbconfig.mjs";

export default class EventoxIdEntrada {  
    getEventoxIdEntrada = async (id) => {
        let resultado = null;    
        console.log('getEventoxIdEntrada')

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
}
