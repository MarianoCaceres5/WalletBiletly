import sql from "mssql";
import config from "../../dbconfig.mjs";
// import { ethers } from "ethers";
// import NFTAbi from "../contracts/NFT.json" assert {type: 'json'}
// import NFTAddress from "../contracts/NFT-address.json" assert {type: 'json'}

export default class TicketxNFTService {
  
  insertarDatos = async (address, tokenCount, idEntrada) => {

    // const nft = NFTAbi;
    // await (await nft.mint(uri, description, listingPrice, 1)).wait();

    let resultado = null;
    try {
      let pool = await sql.connect(config);
      const usuario = await pool
        .request()
        .input("pAddress", sql.VarChar, address)
        .query(`INSERT INTO Usuario(address) OUTPUT inserted.idUsuario VALUES (@pAddress)`);

      const userId = usuario.recordset[0].idUsuario;
      let result = await pool
        .request()
        .input("pUserId", sql.Int, userId ?? "")
        .input("ptokenCount", sql.Int, tokenCount ?? "")
        .input("pIdEntrada", sql.Int, idEntrada ?? "")
        .query(`INSERT INTO EntradaxUsuario(idEntrada, idUsuario) VALUES (@pIdEntrada, @pUserId)
                INSERT INTO EntradaxNFT(idEntrada,tokenCount) VALUES (@pIdEntrada,@ptokenCount);                
        `);
      resultado = result.rowsAffected;
    } catch (error) {
      console.log(error);
    }
    return resultado;
  };
}
