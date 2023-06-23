USE [master]
GO
--
-- Primero hay que creal la base de datos 'DAI-Pizzas'
--

IF NOT EXISTS (SELECT * FROM sys.server_principals WHERE [name] = N'Biletly')
BEGIN
	PRINT 'Creando Login'
	CREATE LOGIN [Biletly] WITH 
		PASSWORD=N'JuliMedina912', 
		DEFAULT_DATABASE=[DB_Biletly], 
		CHECK_EXPIRATION=OFF, 
		CHECK_POLICY=OFF
END
GO

USE [DB_Biletly]
IF NOT EXISTS (SELECT * FROM sys.database_principals WHERE [name] = N'Biletly')
BEGIN
	PRINT 'Creando User'
	CREATE USER [Biletly] FOR LOGIN [Biletly]
	ALTER ROLE [db_owner] ADD MEMBER [Biletly]
END 
GO