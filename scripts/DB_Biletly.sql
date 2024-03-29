USE [DB_Biletly]
GO
/****** Object:  User [alumno]    Script Date: 27/10/2023 08:45:55 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  User [Biletly]    Script Date: 27/10/2023 08:45:55 ******/
CREATE USER [Biletly] FOR LOGIN [Biletly] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [Biletly]
GO
/****** Object:  Table [dbo].[Administrador]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Administrador](
	[idAdmin] [int] IDENTITY(1,1) NOT NULL,
	[usuario] [varchar](max) NULL,
	[contrasena] [varchar](max) NULL,
	[token] [varchar](max) NULL,
 CONSTRAINT [PK_Administrador] PRIMARY KEY CLUSTERED 
(
	[idAdmin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Entrada]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Entrada](
	[idEntrada] [int] IDENTITY(1,1) NOT NULL,
	[numAsiento] [int] NULL,
	[precio] [float] NULL,
	[imagen] [varchar](max) NOT NULL,
	[tieneNFT] [bit] NULL,
	[descripcion] [varchar](max) NULL,
	[idEvento] [int] NULL,
 CONSTRAINT [PK_Entrada] PRIMARY KEY CLUSTERED 
(
	[idEntrada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntradaxNFT]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradaxNFT](
	[idEntradaxNFT] [int] IDENTITY(1,1) NOT NULL,
	[idEntrada] [int] NOT NULL,
	[tokenCount] [int] NOT NULL,
 CONSTRAINT [PK_EntradaxNFT] PRIMARY KEY CLUSTERED 
(
	[idEntradaxNFT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EntradaxUsuario]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradaxUsuario](
	[idEntradaxUsuario] [int] IDENTITY(1,1) NOT NULL,
	[idEntrada] [int] NULL,
	[idUsuario] [int] NULL,
 CONSTRAINT [PK_EntradaxUsuario] PRIMARY KEY CLUSTERED 
(
	[idEntradaxUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Evento]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Evento](
	[idEvento] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[fecha] [date] NULL,
	[descripcion] [varchar](max) NULL,
 CONSTRAINT [PK_Evento] PRIMARY KEY CLUSTERED 
(
	[idEvento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventoxTicketera]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventoxTicketera](
	[idEventoxTicketera] [int] IDENTITY(1,1) NOT NULL,
	[idEvento] [int] NULL,
	[idTicketera] [int] NULL,
 CONSTRAINT [PK_EventoxTicketera] PRIMARY KEY CLUSTERED 
(
	[idEventoxTicketera] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Ticketera]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Ticketera](
	[idTicketera] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NULL,
	[url] [varchar](max) NULL,
 CONSTRAINT [PK_Ticketera] PRIMARY KEY CLUSTERED 
(
	[idTicketera] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 27/10/2023 08:45:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [int] IDENTITY(1,1) NOT NULL,
	[address] [varchar](max) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Administrador] ON 

INSERT [dbo].[Administrador] ([idAdmin], [usuario], [contrasena], [token]) VALUES (1, N'Alberto', N'Milis', NULL)
SET IDENTITY_INSERT [dbo].[Administrador] OFF
GO
SET IDENTITY_INSERT [dbo].[Entrada] ON 

INSERT [dbo].[Entrada] ([idEntrada], [numAsiento], [precio], [imagen], [tieneNFT], [descripcion], [idEvento]) VALUES (1, 2, 232, N'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJum0nQQZCttWsRA1zrcux4oJ7vGWo6ZBwLOs4NWN8CdV-q5P1OTDHm9Ge6RNjTwhJ4ik&usqp=CAU', 0, N'Descripcion de evento de Rihanna', 1)
INSERT [dbo].[Entrada] ([idEntrada], [numAsiento], [precio], [imagen], [tieneNFT], [descripcion], [idEvento]) VALUES (2, 5, 2323, N'https://cdn.getcrowder.com/images/8dfede87-cdef-40f8-b151-d68f24b7a443-whatsapp-image-2023-06-30-at-14.12.28.jpeg', 1, N'Descripcion de evento de Duki', 3)
INSERT [dbo].[Entrada] ([idEntrada], [numAsiento], [precio], [imagen], [tieneNFT], [descripcion], [idEvento]) VALUES (3, 23, 988, N'https://m.media-amazon.com/images/M/MV5BMjM5NjU3NjczNl5BMl5BanBnXkFtZTgwMjQ2NzEzNzE@._V1_FMjpg_UX1000_.jpg', 0, N'Descripcion de evento de Snoop Dogg', 2)
INSERT [dbo].[Entrada] ([idEntrada], [numAsiento], [precio], [imagen], [tieneNFT], [descripcion], [idEvento]) VALUES (4, 2121, 322, N'https://cdn.arema.dev/live/eventos/7034.jpg', 1, N'Descripcion de evento de Cacha', 4)
SET IDENTITY_INSERT [dbo].[Entrada] OFF
GO
SET IDENTITY_INSERT [dbo].[EntradaxUsuario] ON 

INSERT [dbo].[EntradaxUsuario] ([idEntradaxUsuario], [idEntrada], [idUsuario]) VALUES (3, 4, 2)
INSERT [dbo].[EntradaxUsuario] ([idEntradaxUsuario], [idEntrada], [idUsuario]) VALUES (4, 2, 2)
SET IDENTITY_INSERT [dbo].[EntradaxUsuario] OFF
GO
SET IDENTITY_INSERT [dbo].[Evento] ON 

INSERT [dbo].[Evento] ([idEvento], [nombre], [fecha], [descripcion]) VALUES (1, N'Rihana', CAST(N'2012-02-12' AS Date), N'Evento de Rihana')
INSERT [dbo].[Evento] ([idEvento], [nombre], [fecha], [descripcion]) VALUES (2, N'Snoop Dogg', CAST(N'2015-03-23' AS Date), N'Evento de Snoop Dogg')
INSERT [dbo].[Evento] ([idEvento], [nombre], [fecha], [descripcion]) VALUES (3, N'Duki', CAST(N'2023-02-23' AS Date), N'Evento de Duki')
INSERT [dbo].[Evento] ([idEvento], [nombre], [fecha], [descripcion]) VALUES (4, N'Niño G', CAST(N'1998-03-03' AS Date), N'Evento de Cacha')
SET IDENTITY_INSERT [dbo].[Evento] OFF
GO
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([idUsuario], [address]) VALUES (2, N'0xAFC27463B1C7b2c08D3587F958456F53f82df68D')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
GO
ALTER TABLE [dbo].[Entrada]  WITH CHECK ADD  CONSTRAINT [FK_Entrada_Evento] FOREIGN KEY([idEvento])
REFERENCES [dbo].[Evento] ([idEvento])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Entrada] CHECK CONSTRAINT [FK_Entrada_Evento]
GO
ALTER TABLE [dbo].[EntradaxNFT]  WITH CHECK ADD  CONSTRAINT [FK_EntradaxNFT_Entrada] FOREIGN KEY([idEntrada])
REFERENCES [dbo].[Entrada] ([idEntrada])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EntradaxNFT] CHECK CONSTRAINT [FK_EntradaxNFT_Entrada]
GO
ALTER TABLE [dbo].[EntradaxUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EntradaxUsuario_Entrada] FOREIGN KEY([idEntrada])
REFERENCES [dbo].[Entrada] ([idEntrada])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EntradaxUsuario] CHECK CONSTRAINT [FK_EntradaxUsuario_Entrada]
GO
ALTER TABLE [dbo].[EntradaxUsuario]  WITH CHECK ADD  CONSTRAINT [FK_EntradaxUsuario_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EntradaxUsuario] CHECK CONSTRAINT [FK_EntradaxUsuario_Usuario]
GO
ALTER TABLE [dbo].[EventoxTicketera]  WITH CHECK ADD  CONSTRAINT [FK_EventoxTicketera_Evento] FOREIGN KEY([idEvento])
REFERENCES [dbo].[Evento] ([idEvento])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EventoxTicketera] CHECK CONSTRAINT [FK_EventoxTicketera_Evento]
GO
ALTER TABLE [dbo].[EventoxTicketera]  WITH CHECK ADD  CONSTRAINT [FK_EventoxTicketera_Ticketera] FOREIGN KEY([idTicketera])
REFERENCES [dbo].[Ticketera] ([idTicketera])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[EventoxTicketera] CHECK CONSTRAINT [FK_EventoxTicketera_Ticketera]
GO
/****** Object:  StoredProcedure [dbo].[EventoxIdEntrada]    Script Date: 27/10/2023 08:45:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE procedure [dbo].[EventoxIdEntrada] 
@id int
as

begin

select Evento.idEvento, Evento.nombre, Evento.descripcion, Evento.fecha from Evento 
inner join Entrada on Evento.idEvento = Entrada.idEvento
where Entrada.idEntrada = @id

end
GO
/****** Object:  StoredProcedure [dbo].[getEentradaxId]    Script Date: 27/10/2023 08:45:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[getEentradaxId]
@id int
as begin
SELECT * FROM Entrada WHERE idEntrada = @id
end
GO
/****** Object:  StoredProcedure [dbo].[UpdateEntrada]    Script Date: 27/10/2023 08:45:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE procedure [dbo].[UpdateEntrada]
@id int 
as
begin 


UPDATE Entrada set tieneNFT = 1 WHERE idEntrada = @id

end
GO
