-- Mon Oct  5 20:26:49 2020

-- -----------------------------------------------------
-- Table TipoUsuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS TipoUsuario (
  idTipoUsuario INT NOT NULL,
  rol VARCHAR(45) NOT NULL,
  fecha_inicio DATE NULL,
  fecha_fin DATE NULL,
  estado VARCHAR(45) NULL,
  PRIMARY KEY (idTipoUsuario))
;


-- -----------------------------------------------------
-- Table Usuario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario (
  idUsuario INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  correo VARCHAR(45) NOT NULL,
  telefono VARCHAR(45) NULL,
  direccion VARCHAR(200) NULL,
  Tipo_usuario_idTipo_usuario INT NOT NULL,
  fechaRegistro DATE NULL,
  PRIMARY KEY (idUsuario),
  UNIQUE (correo),
  CONSTRAINT fk_Usuarios_Tipo_usuario
    FOREIGN KEY (Tipo_usuario_idTipo_usuario)
    REFERENCES TipoUsuario (idTipoUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table MetodoPago
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS MetodoPago (
  idMetodoPago INT NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  apellido VARCHAR(45) NOT NULL,
  numeroTarjeta VARCHAR(45) NOT NULL,
  fechaVencimiento VARCHAR(45) NOT NULL,
  ccv VARCHAR(45) NOT NULL,
  PRIMARY KEY (idMetodoPago))
;


-- -----------------------------------------------------
-- Table Usuario_has_MetodoPago
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Usuario_has_MetodoPago (
  Usuario_idUsuarios INT NOT NULL,
  MetodoPago_idMetodoPago INT NOT NULL,
  PRIMARY KEY (Usuario_idUsuarios, MetodoPago_idMetodoPago),
  CONSTRAINT fk_Usuarios_has_MetodoPago_Usuarios1
    FOREIGN KEY (Usuario_idUsuarios)
    REFERENCES Usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Usuarios_has_MetodoPago_MetodoPago1
    FOREIGN KEY (MetodoPago_idMetodoPago)
    REFERENCES MetodoPago (idMetodoPago)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table agenciaEnvio
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS agenciaEnvio (
  idagenciaEnvio INT NOT NULL,
  nombre VARCHAR(100) NULL,
  precio INT NULL,
  urlPerfil VARCHAR(500) NULL,
  PRIMARY KEY (idagenciaEnvio))
;


-- -----------------------------------------------------
-- Table Departamento
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Departamento (
  idDepartamento INT NOT NULL,
  descripcion VARCHAR(45) NULL,
  PRIMARY KEY (idDepartamento))
;


-- -----------------------------------------------------
-- Table Municipio
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Municipio (
  idMunicipio INT NOT NULL,
  descripcion VARCHAR(45) NULL,
  Departamento_idDepartamento INT NOT NULL,
  PRIMARY KEY (idMunicipio),
  CONSTRAINT fk_Municipio_Departamento1
    FOREIGN KEY (Departamento_idDepartamento)
    REFERENCES Departamento (idDepartamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table InformacionEnvio
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS InformacionEnvio (
  idInformacionEnvio INT NOT NULL,
  nombreCompletoRemitente VARCHAR(200) NULL,
  direccionCompleta VARCHAR(500) NULL,
  domicilio VARCHAR(300) NULL,
  agenciaEnvio_idagenciaEnvio INT NOT NULL,
  Municipio_idMunicipio INT NOT NULL,
  PRIMARY KEY (idInformacionEnvio),
  CONSTRAINT fk_InformacionEnvio_agenciaEnvio1
    FOREIGN KEY (agenciaEnvio_idagenciaEnvio)
    REFERENCES agenciaEnvio (idagenciaEnvio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_InformacionEnvio_Municipio1
    FOREIGN KEY (Municipio_idMunicipio)
    REFERENCES Municipio (idMunicipio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Categoria
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Categoria (
  idCategoria INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  PRIMARY KEY (idCategoria))
;


-- -----------------------------------------------------
-- Table TipoBase
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS TipoBase (
  idTipoBase INT NOT NULL,
  descripcion VARCHAR(100) NULL,
  PRIMARY KEY (idTipoBase))
;


-- -----------------------------------------------------
-- Table Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Producto (
  idProducto INT NOT NULL,
  nombre VARCHAR(45) NULL,
  informacionAdicional VARCHAR(500) NULL,
  urlPortada VARCHAR(45) NULL,
  Categoria_idCategoria INT NOT NULL,
  precio DECIMAL NULL,
  cantidad INT NULL,
  TipoBase_idTipoBase INT NOT NULL,
  tiempoSol VARCHAR(45) NULL,
  frecuenciaRiego VARCHAR(45) NULL,
  tamanio VARCHAR(45) NULL,
  PRIMARY KEY (idProducto),
  CONSTRAINT fk_Producto_Categoria1
    FOREIGN KEY (Categoria_idCategoria)
    REFERENCES Categoria (idCategoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Producto_TipoBase1
    FOREIGN KEY (TipoBase_idTipoBase)
    REFERENCES TipoBase (idTipoBase)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table ImagenProducto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ImagenProducto (
  idImagenProducto INT NOT NULL,
  url VARCHAR(45) NULL,
  PRIMARY KEY (idImagenProducto))
;


-- -----------------------------------------------------
-- Table Producto_has_ImagenProducto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Producto_has_ImagenProducto (
  Producto_idProducto INT NOT NULL,
  ImagenProducto_idImagenProducto INT NOT NULL,
  PRIMARY KEY (Producto_idProducto, ImagenProducto_idImagenProducto),
  CONSTRAINT fk_Producto_has_ImagenProducto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Producto_has_ImagenProducto_ImagenProducto1
    FOREIGN KEY (ImagenProducto_idImagenProducto)
    REFERENCES ImagenProducto (idImagenProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Pedido
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pedido (
  idPedido INT NOT NULL,
  fechaPedido DATE NULL,
  total DECIMAL NULL,
  Usuario_idUsuario INT NOT NULL,
  FormaPago_idFormaPago INT NOT NULL,
  InformacionEnvio_idInformacionEnvio INT NOT NULL,
  PRIMARY KEY (idPedido),
  CONSTRAINT fk_Pedido_Usuario1
    FOREIGN KEY (Usuario_idUsuario)
    REFERENCES Usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Pedido_InformacionEnvio1
    FOREIGN KEY (InformacionEnvio_idInformacionEnvio)
    REFERENCES InformacionEnvio (idInformacionEnvio)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Promocion
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Promocion (
  idPromocion INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  fechaInicio DATE NULL,
  fechaFin DATE NULL,
  porcentajeDescuento DECIMAL NULL,
  PRIMARY KEY (idPromocion))
;


-- -----------------------------------------------------
-- Table Especie
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Especie (
  idEspecie INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  Categoria_idCategoria INT NOT NULL,
  PRIMARY KEY (idEspecie),
  CONSTRAINT fk_Especie_Categoria1
    FOREIGN KEY (Categoria_idCategoria)
    REFERENCES Categoria (idCategoria)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Genero
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Genero (
  idGenero INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  Especie_idEspecie INT NOT NULL,
  PRIMARY KEY (idGenero),
  CONSTRAINT fk_Genero_Especie1
    FOREIGN KEY (Especie_idEspecie)
    REFERENCES Especie (idEspecie)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Familia
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Familia (
  idFamilia INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  Genero_idGenero INT NOT NULL,
  PRIMARY KEY (idFamilia),
  CONSTRAINT fk_Familia_Genero1
    FOREIGN KEY (Genero_idGenero)
    REFERENCES Genero (idGenero)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Pedido_has_Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Pedido_has_Producto (
  Pedido_idPedido INT NOT NULL,
  Producto_idProducto INT NOT NULL,
  precioProducto DECIMAL NULL,
  cantidad INT NULL,
  PRIMARY KEY (Pedido_idPedido, Producto_idProducto),
  CONSTRAINT fk_Pedido_has_Producto_Pedido1
    FOREIGN KEY (Pedido_idPedido)
    REFERENCES Pedido (idPedido)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Pedido_has_Producto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Promocion_has_Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Promocion_has_Producto (
  Promocion_idPromocion INT NOT NULL,
  Producto_idProducto INT NOT NULL,
  PRIMARY KEY (Promocion_idPromocion, Producto_idProducto),
  CONSTRAINT fk_Promocion_has_Producto_Promocion1
    FOREIGN KEY (Promocion_idPromocion)
    REFERENCES Promocion (idPromocion)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Promocion_has_Producto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Carrito
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Carrito (
  idCarrito INT NOT NULL,
  Usuario_idUsuario INT NOT NULL,
  PRIMARY KEY (idCarrito),
  CONSTRAINT fk_Carrito_Usuario1
    FOREIGN KEY (Usuario_idUsuario)
    REFERENCES Usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Carrito_has_Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Carrito_has_Producto (
  Carrito_idCarrito INT NOT NULL,
  Producto_idProducto INT NOT NULL,
  cantidad INT NULL,
  PRIMARY KEY (Carrito_idCarrito, Producto_idProducto),
  CONSTRAINT fk_Carrito_has_Producto_Carrito1
    FOREIGN KEY (Carrito_idCarrito)
    REFERENCES Carrito (idCarrito)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Carrito_has_Producto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table PromocionAplicada
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PromocionAplicada (
  idPromocionAplicada INT NOT NULL,
  descripcion VARCHAR(200) NULL,
  porcentajeDescuento DECIMAL NULL,
  PRIMARY KEY (idPromocionAplicada))
;


-- -----------------------------------------------------
-- Table PromocionAplicada_has_Pedido_has_Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS PromocionAplicada_has_Pedido_has_Producto (
  PromocionAplicada_idPromocionAplicada INT NOT NULL,
  Pedido_has_Producto_Pedido_idPedido INT NOT NULL,
  Pedido_has_Producto_Producto_idProducto INT NOT NULL,
  PRIMARY KEY (PromocionAplicada_idPromocionAplicada, Pedido_has_Producto_Pedido_idPedido, Pedido_has_Producto_Producto_idProducto),
  CONSTRAINT fk_PromocionAplicada_has_Pedido_has_Producto_PromocionAplicada1
    FOREIGN KEY (PromocionAplicada_idPromocionAplicada)
    REFERENCES PromocionAplicada (idPromocionAplicada)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_PromocionAplicada_has_Pedido_has_Producto_Pedido_has_Produ1
    FOREIGN KEY (Pedido_has_Producto_Pedido_idPedido , Pedido_has_Producto_Producto_idProducto)
    REFERENCES Pedido_has_Producto (Pedido_idPedido , Producto_idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Valoracion
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Valoracion (
  idValoracion INT NOT NULL,
  valoracion DECIMAL NULL,
  Producto_idProducto INT NOT NULL,
  Usuario_idUsuario INT NOT NULL,
  PRIMARY KEY (idValoracion),
  CONSTRAINT fk_Valoracion_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Valoracion_Usuario1
    FOREIGN KEY (Usuario_idUsuario)
    REFERENCES Usuario (idUsuario)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Comentario
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Comentario (
  idComentario INT NOT NULL,
  titulo VARCHAR(45) NULL,
  descripcion VARCHAR(1000) NULL,
  fecha DATE NULL,
  Valoracion_idValoracion INT NOT NULL,
  PRIMARY KEY (idComentario),
  CONSTRAINT fk_Comentario_Valoracion1
    FOREIGN KEY (Valoracion_idValoracion)
    REFERENCES Valoracion (idValoracion)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;


-- -----------------------------------------------------
-- Table Departamento_has_Producto
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Departamento_has_Producto (
  Departamento_idDepartamento INT NOT NULL,
  Producto_idProducto INT NOT NULL,
  PRIMARY KEY (Departamento_idDepartamento, Producto_idProducto),
  CONSTRAINT fk_Departamento_has_Producto_Departamento1
    FOREIGN KEY (Departamento_idDepartamento)
    REFERENCES Departamento (idDepartamento)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Departamento_has_Producto_Producto1
    FOREIGN KEY (Producto_idProducto)
    REFERENCES Producto (idProducto)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
;
